define(function(require) { return function(ace) { var core = require("scripts/core-cjucovschi-0.0.1"); core.setAce(ace); 

var $ = jQuery;

var resultWrapper = $("<div>");

var queue = core.getPrivateQueue();
var scriptFrame;

var id = core.registerCallback(function(msg) {
  data = JSON.parse(msg.body);
  core.insert("\\termref{"+data.symbol+"}{}{"+data.symbol+"}");
  $(scriptFrame).dialog("close");
});

scriptFrame = $("<iframe>").attr("src", "http://mathhub.info:8983/defindexer/app/search?forward_destination="+queue+"&forward_correlation="+id);
  $(scriptFrame).dialog({
    width : 530,
    height: 380,
    title: "Term search",
  });

}});