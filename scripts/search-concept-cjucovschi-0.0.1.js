define(function(require) { return function(ace) { var core = require("scripts/core-cjucovschi-0.0.1"); core.setAce(ace); 

var $ = jQuery;

var resultWrapper = $("<div>");

var scriptFrame = $("<div>");
var searchBox = $("<input type='text'>").val("");

function genResult(res) {
  var resbutton = $("<button>").addClass("term-search-result").text(res["symbol"]);
  $(resbutton).click(function() {
    $(scriptFrame).dialog("close");
    core.insert("\\atrefi["+res.symbol+"]{}{"+res.symbol+"}");
  });
  return resbutton;
}

function genResultPage(results) {
  var docs = results;
  var result = $("<div>").text("Found "+docs.length+" matches");
  $(result).addClass("result-page");
  for (var i=0; i<docs.length; ++i) {
    result.append(genResult(docs[i]));
  }
  return result;
}

scriptFrame.append("Search").append(searchBox).append(resultWrapper);

  function dosearch(search) {
    if (search.length == 0)
      return
    core.stompRequest("/queue/defindexer.getdefinition", {"q" : search}, function(msg) {
      var resp = msg.body;
      if (typeof(resp) == "string") {
        resp = JSON.parse(resp);
      }
      var resPage = genResultPage(resp);
      resultWrapper.empty();
      resultWrapper.append(resPage);
    });    
  }

  $(searchBox).bind('input propertychange', function() {
    dosearch($(searchBox).val());
  });

  //dosearch($(searchBox).val());

  $(scriptFrame).dialog({
    width : "430px",
    heiht: "380px",
    title: "Term search",
    buttons : [
    {
        text: "Insert",
        click : function() {
          var math = $(mathFrame).find(".mathquill-editable").mathquill('latex');
          core.insert(math);
          $(mathFrame).dialog("close");
        }
    }]
  });

}});