define (require) ->

	$ = jQuery if not $?;
	Toolbar = require "editor_tools/scriptable_toolbar"
	Interpretter = require "editor_tools/interpretter"
	require "stomp"

	stompMsgHandler : (msg)->
		corrid = msg.headers["correlation-id"];
		if typeof(corrid) != "string"
			return;
		if not corrid in @editor.stompCorrelation
			return;
		@editor.stompCorrelation[corrid](msg);
		delete @editor.stompCorrelation[corrid]

	enrich_editor : (@editor, id, config={}) ->
		$.extend(config, {
			root_path : "",
			stompUrl : "ws://localhost:61623", 
			stompUser : "admin", 
			stompPassword : "password",
		});

		# ui-layout-north
		@stompClient = Stomp.client(config.stompUrl)
		@stompClient.connect(config.stompUser, config.stompPassword, ((frame) ->
			privateQueue = "/queue/editor_tools_"+Math.floor(Math.random()*100000);
			@editor.stomp = @stompClient;
			@editor.stompQueue = privateQueue;
			@editor.stompCorrelation = {};
			@stompClient.subscribe(privateQueue, @stompMsgHandler.bind(@))
		).bind(this))

		wrapped = $(id).wrap("<div>").parent();
		$(id).addClass("ui-layout-center");
		header = $("<div>").addClass("ui-layout-north");
		terminal = $("<div>").addClass("ui-layout-south");
		wrapped.prepend(header);
		wrapped.append(terminal);
		layout = null

#		jQuery(document).ready(() ->
#			$(wrapped).width($(id).width())
#			$(wrapped).height($(id).height())
#
#			layout = wrapped.layout({ 
#				enableCursorHotkey : false,
#				north : {
#					closable : false,
#					size : 120,
#					resizable : false,
#				},
#				south : {
#					resizable : true,
#					size: 80,
#					initClosed: true,
#				}
#			});
#		)

		interpretter = new Interpretter(@editor);
		toolbar = new Toolbar(header, interpretter, config.root_path);

#		termToggle = (evt)->
#			# if C+` was pressed
#			if evt.keyCode == 192 && evt.ctrlKey
#				if layout.state.south.isClosed
#					layout.open("south");
#					$(terminal).trigger("click");    
#					$(terminal).focus();
#					editor.blur();
#				else
#					layout.close("south");
#					editor.focus();
#				return false
#
#		$(terminal).terminal((command, term) ->
#			term.echo(interpretter.exec(command));
#		,{
#			greetings: "",
#			tabcompletion : true,
#			keyDown: termToggle,
#			completion : (terminal, string, callback) -> interpretter.autocomplete(string, callback);
#		});


#		$(wrapped).keydown termToggle
#
		{
			toolbar : toolbar,
			interpretter : interpretter,
			editor : @editor,
			header: header,
		}