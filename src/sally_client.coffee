define (require) ->

  require "stomp"
  xml2json = require "xml2json"

  createRegisterDocument = (docQueue, theoQueue, interfaces) ->
    {
      "registerdocument" : 
        "@xmlns" : "http://kwarc.info/sally/comm/core"
        "documentqueue" : docQueue,
        "environmentid" : "random_edit_"+Math.random(),
        "interfaces" : interfaces
    }


  connections = {};

  class SallyClient
    constructor : (@config, @msgHandler) ->
      if connections[config.stompUrl]?
        @stompClient = connections[config.stompUrl]
      else
        @stompClient = Stomp.client(config.stompUrl)
        connections[config.stompUrl] = @stompClient
        @stompClient.connect(config.stompUser, config.stompPassword, ((frame) ->
          $(@stompClient.connection_div).trigger("onConnected");
          ).bind(@))

    registerDocument : (interfaces, callback) =>
      msg = createRegisterDocument(@privateQueue, @privateQueue+"_theo", interfaces)
      @send("/queue/sally_register", msg, (msg) =>
        @sally_queue = msg["registerdocumentresponse"]["sallyqueue"];
        callback();
        )

    connect : (@interfaces, callback) ->
      client = @stompClient
      if client.connected 
        return callback();
      if not client.connection_div? 
        client.connection_div = $("<div>")

      $(client.connection_div).bind("onConnected", (e) =>
        @privateQueue = "editor_tools_"+Math.floor(Math.random()*100000);
        @stompClient.subscribe("/queue/"+@privateQueue, @stompMsgHandler)
        @registerDocument(@interfaces, callback)
      )

    sendSally : (msg, callback, headers) ->
      @send(@sally_queue, msg, callback, headers)

    send : (destination, msg, callback, headers) ->
      console.log(msg);
      if typeof msg == "object"
        msg = xml2json.json2xml(msg)

      if callback?
        corrid = Math.random();
        queue_post = "/temp-queue/editor_exchange"+corrid;
        sub = @stompClient.subscribe(queue_post, (msg) =>
          body = xml2json.xml2json(msg.body)
          if (not body.html?) and callback(body, msg) == true
            return;
          @stompClient.unsubscribe(corrid);
        , {"id" : corrid})

        headers ?= {};
        headers["reply-to"] = queue_post;
        headers["correlation-id"] = corrid;

      console.log("sending to ", destination,  " msg ", msg)
      @stompClient.send(destination, headers, msg.toString())

    stompMsgHandler : (msg) =>
      body = xml2json.xml2json(msg.body)
      if body["heartbeatrequest"]? and body["heartbeatrequest"]["@xmlns"] == "http://kwarc.info/sally/comm/core"
        @send(msg.headers["reply-to"], {"heartbeatresponse" : {"@xmlns" : "http://kwarc.info/sally/comm/core"}}, null, 
              {"correlation-id" : msg.headers["correlation-id"]})
        return;

      @msgHandler(body, msg, (sendBack) =>
        @send(msg.headers["reply-to"], sendBack, null, 
              {"correlation-id" : msg.headers["correlation-id"]})
        );
