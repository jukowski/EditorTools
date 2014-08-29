var _info_kwarc_sally_comm_repository_factory = function () {
  var info_kwarc_sally_comm_repository = {
    name: 'info_kwarc_sally_comm_repository',
    defaultElementNamespaceURI: 'http:\/\/kwarc.info\/sally\/comm\/repository',
    typeInfos: [{
        type: 'classInfo',
        localName: 'GetDocumentMetaResponse',
        propertyInfos: [{
            type: 'element',
            name: 'sessionid',
            elementName: 'sessionid',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'repoURL',
            elementName: 'repoURL',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'docPath',
            elementName: 'docPath',
            typeInfo: 'String'
          }]
      }, {
        type: 'classInfo',
        localName: 'GetDocumentMeta',
        propertyInfos: []
      }],
    elementInfos: [{
        elementName: 'GetDocumentMetaResponse',
        typeInfo: 'info_kwarc_sally_comm_repository.GetDocumentMetaResponse'
      }, {
        elementName: 'GetDocumentMeta',
        typeInfo: 'info_kwarc_sally_comm_repository.GetDocumentMeta'
      }]
  };
  return {
    info_kwarc_sally_comm_repository: info_kwarc_sally_comm_repository
  };
};
if (typeof define === 'function' && define.amd) {
  define('info_kwarc_sally_comm_repository',[], _info_kwarc_sally_comm_repository_factory);
}
else {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.info_kwarc_sally_comm_repository = _info_kwarc_sally_comm_repository_factory().info_kwarc_sally_comm_repository;
  }
  else {
    var info_kwarc_sally_comm_repository = _info_kwarc_sally_comm_repository_factory().info_kwarc_sally_comm_repository;
  }
};
// Generated by CoffeeScript 1.7.1
define('repository',['require','sally_client','info_kwarc_sally_comm_repository','jsonix'],function(require) {
  var Frames, Jsonix, context, marshaller, repository, unmarshaller;
  require("sally_client");
  repository = require("info_kwarc_sally_comm_repository");
  console.log(repository);
  Jsonix = (require("jsonix")).Jsonix;
  context = new Jsonix.Context([repository.info_kwarc_sally_comm_repository]);
  marshaller = context.createMarshaller();
  unmarshaller = context.createUnmarshaller();
  return Frames = (function() {
    function Frames(repoURL, docPath, repoInstanceID) {
      this.repoURL = repoURL;
      this.docPath = docPath;
      this.repoInstanceID = repoInstanceID != null ? repoInstanceID : null;
    }

    Frames.prototype.getName = function() {
      return "repository";
    };

    Frames.prototype.marshal = function(obj) {
      return marshaller.marshalString(obj);
    };

    Frames.prototype.unmarshal = function(str) {
      return unmarshaller.unmarshalString(str);
    };

    Frames.prototype.handleMessage = function(msg, sendBack) {
      var response;
      if (msg.name.localPart === "GetDocumentMeta") {
        response = {
          name: {
            localPart: "GetDocumentMetaResponse",
            namespaceURI: "http://kwarc.info/sally/comm/repository"
          },
          value: {
            sessionid: this.repoInstanceID,
            repoURL: this.repoURL,
            docPath: this.docPath
          }
        };
        return sendBack(response);
      }
    };

    return Frames;

  })();
});

