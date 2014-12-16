var _info_kwarc_sally_comm_mathhubdocument_factory = function () {
  var info_kwarc_sally_comm_mathhubdocument = {
    name: 'info_kwarc_sally_comm_mathhubdocument',
    defaultElementNamespaceURI: 'http:\/\/kwarc.info\/sally\/comm\/mathhubdocument',
    typeInfos: [{
        type: 'classInfo',
        localName: 'SelectText',
        propertyInfos: [{
            type: 'element',
            name: 'startrow',
            elementName: 'startrow',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'endrow',
            elementName: 'endrow',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'startcolumn',
            elementName: 'startcolumn',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'endcolumn',
            elementName: 'endcolumn',
            typeInfo: 'Int'
          }]
      }, {
        type: 'classInfo',
        localName: 'GetDocumentMetaResponse',
        propertyInfos: [{
            type: 'element',
            name: 'sessionid',
            elementName: 'sessionid',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'docPath',
            elementName: 'docPath',
            typeInfo: 'String'
          }]
      }, {
        type: 'classInfo',
        localName: 'GetCurrentSelection',
        propertyInfos: []
      }, {
        type: 'classInfo',
        localName: 'GetText',
        propertyInfos: []
      }, {
        type: 'classInfo',
        localName: 'AutocompleteResponse',
        propertyInfos: [{
            type: 'element',
            name: 'suggestion',
            collection: true,
            elementName: 'suggestion',
            typeInfo: 'info_kwarc_sally_comm_mathhubdocument.AutocompleteResponse.Suggestion'
          }]
      }, {
        type: 'classInfo',
        localName: 'AutocompleteResponse.Suggestion',
        propertyInfos: [{
            type: 'element',
            name: 'concept',
            elementName: 'concept',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'text',
            elementName: 'text',
            typeInfo: 'String'
          }]
      }, {
        type: 'classInfo',
        localName: 'GetDocumentMeta',
        propertyInfos: []
      }, {
        type: 'classInfo',
        localName: 'AutocompleteRequest',
        propertyInfos: [{
            type: 'element',
            name: 'path',
            elementName: 'path',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'text',
            elementName: 'text',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'prefix',
            elementName: 'prefix',
            typeInfo: 'String'
          }, {
            type: 'element',
            name: 'col',
            elementName: 'col',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'line',
            elementName: 'line',
            typeInfo: 'Int'
          }]
      }, {
        type: 'classInfo',
        localName: 'GetCurrentSelectionResponse',
        propertyInfos: [{
            type: 'element',
            name: 'startrow',
            elementName: 'startrow',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'endrow',
            elementName: 'endrow',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'startcolumn',
            elementName: 'startcolumn',
            typeInfo: 'Int'
          }, {
            type: 'element',
            name: 'endcolumn',
            elementName: 'endcolumn',
            typeInfo: 'Int'
          }]
      }, {
        type: 'classInfo',
        localName: 'GetTextResponse',
        propertyInfos: [{
            type: 'element',
            name: 'text',
            elementName: 'text',
            typeInfo: 'String'
          }]
      }],
    elementInfos: [{
        elementName: 'SelectText',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.SelectText'
      }, {
        elementName: 'GetDocumentMetaResponse',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.GetDocumentMetaResponse'
      }, {
        elementName: 'GetCurrentSelection',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.GetCurrentSelection'
      }, {
        elementName: 'GetText',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.GetText'
      }, {
        elementName: 'AutocompleteResponse',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.AutocompleteResponse'
      }, {
        elementName: 'GetDocumentMeta',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.GetDocumentMeta'
      }, {
        elementName: 'AutocompleteRequest',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.AutocompleteRequest'
      }, {
        elementName: 'GetCurrentSelectionResponse',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.GetCurrentSelectionResponse'
      }, {
        elementName: 'GetTextResponse',
        typeInfo: 'info_kwarc_sally_comm_mathhubdocument.GetTextResponse'
      }]
  };
  return {
    info_kwarc_sally_comm_mathhubdocument: info_kwarc_sally_comm_mathhubdocument
  };
};
if (typeof define === 'function' && define.amd) {
  define('info_kwarc_sally_comm_mathhubdocument',[], _info_kwarc_sally_comm_mathhubdocument_factory);
}
else {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.info_kwarc_sally_comm_mathhubdocument = _info_kwarc_sally_comm_mathhubdocument_factory().info_kwarc_sally_comm_mathhubdocument;
  }
  else {
    var info_kwarc_sally_comm_mathhubdocument = _info_kwarc_sally_comm_mathhubdocument_factory().info_kwarc_sally_comm_mathhubdocument;
  }
};
// Generated by CoffeeScript 1.7.1
define('mathhubdocument',['require','sally_client','info_kwarc_sally_comm_mathhubdocument','jsonix'],function(require) {
  var Jsonix, MathHubDocument, context, marshaller, mathhubdocument, unmarshaller;
  require("sally_client");
  mathhubdocument = require("info_kwarc_sally_comm_mathhubdocument");
  Jsonix = (require("jsonix")).Jsonix;
  context = new Jsonix.Context([mathhubdocument.info_kwarc_sally_comm_mathhubdocument]);
  marshaller = context.createMarshaller();
  unmarshaller = context.createUnmarshaller();
  return MathHubDocument = (function() {
    function MathHubDocument(ace, docPath, sessionId) {
      this.ace = ace;
      this.docPath = docPath;
      this.sessionId = sessionId != null ? sessionId : null;
    }

    MathHubDocument.prototype.getName = function() {
      return "mathhubdocument";
    };

    MathHubDocument.prototype.marshal = function(obj) {
      return marshaller.marshalString(obj);
    };

    MathHubDocument.prototype.unmarshal = function(str) {
      return unmarshaller.unmarshalString(str);
    };

    MathHubDocument.prototype.handleMessage = function(msg, sendBack) {
      var response, sel, v;
      if (msg.name.localPart === "GetDocumentMeta") {
        response = {
          name: {
            localPart: "GetDocumentMetaResponse",
            namespaceURI: "http://kwarc.info/sally/comm/mathhubdocument"
          },
          value: {
            sessionid: this.sessionId,
            docPath: this.docPath
          }
        };
        sendBack(response);
      }
      if (msg.name.localPart === "GetText") {
        response = {
          name: {
            localPart: "GetTextResponse",
            namespaceURI: "http://kwarc.info/sally/comm/mathhubdocument"
          },
          value: {
            "text": this.ace.getSession().getValue()
          }
        };
        return sendBack(response);
      }
      if (msg.name.localPart === "GetCurrentSelection") {
        sel = this.ace.getSelectionRange();
        response = {
          name: {
            localPart: "GetCurrentSelectionResponse",
            namespaceURI: "http://kwarc.info/sally/comm/mathhubdocument"
          },
          value: {
            "startrow": sel.start.row,
            "startcolumn": sel.start.column,
            "endrow": sel.end.row,
            "endcolumn": sel.end.column
          }
        };
        return sendBack(response);
      }
      if (msg.name.localPart === "SelectText") {
        v = msg.value;
        return this.ace.selection.setRange({
          start: {
            row: v.startrow,
            column: v.startcolumn
          },
          end: {
            row: v.endrow,
            column: v.endcolumn
          }
        });
      }
    };

    return MathHubDocument;

  })();
});

