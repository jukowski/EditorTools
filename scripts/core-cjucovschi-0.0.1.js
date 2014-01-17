define(function(require) { 
var ace, clipboard, core,
  __slice = [].slice, stomp, stompQueue;

core = {};

clipboard = null;

ace = null;

core.setAce = function(_ace) {
  return ace = _ace;
};

core.getText = function() {
  return ace.getValue();
};

core.getPrivateQueue = function() {
  return ace.stompQueue;
}

core.registerCallback = function(callback) {
  var corrid = Math.random()*1000000;
  ace.stompCorrelation[corrid] = callback;
  return corrid;
}


core.stompRequest = function(destination, msg, callback) {
  var header = {};
  if (typeof(callback) == "function") {
    var corrid = Math.random()*1000000;
    ace.stompCorrelation[corrid] = callback;

    header = {"reply-to": ace.stompQueue, "correlation-id" : corrid};
  }
  if (typeof(msg) == "object") {
    msg = JSON.stringify(msg);
  }

  ace.stomp.send(destination, header, msg)
}

core.insert = function(pos, text) {
  if (typeof pos === "string" && typeof text === "undefined") {
    text = pos;
    pos = core.getCursorPosition();
  }
  return ace.getSession().insert(pos, text);
};

core.getSelectedRange = function() {
  return ace.getSelectionRange();
};

core.getCursorPosition = function() {
  return ace.getCursorPosition();
};

core.setCursorPosition = function(pos) {
  ace.moveCursorToPosition(pos);
  return ace.clearSelection();
};

core.getSelectionText = function() {
  return ace.getSession().getTextRange(core.getSelectionRange());
};

core.clearSelection = function() {
  return ace.clearSelection();
};

core.cut = function() {
  clipboard = core.getSelectionText();
  ace.execCommand("cut");
};

core.copy = function() {
  clipboard = core.getSelectionText();
};

core.paste = function() {
  core.insertAtCursor(clipboard);
  ace.clearSelection();
};

core.focus = function() {
  return ace.focus();
};

core.getLine = function(l) {
  if (!(l != null)) {
    l = core.getCursorPosition().line;
  }
  return ace.getSession().getLine(l);
};

core.indentToNextLine = function(pos) {
  var line, t;
  if (!(pos != null)) {
    pos = core.getCursorPosition();
  }
  line = core.getLine(pos.line);
  t = line.match(/^[\s]*/);
  if (t != null) {
    t = t[0];
  } else {
    t = "";
  }
  if (t.length === line.length) {
    return;
  }
  return core.insert(pos, "\n" + t);
};

core.getEol = function(pos) {
  if (!(pos != null)) {
    pos = core.getCursorPosition();
  }
  pos.col = core.getLine(pos.line).length;
  return pos;
};

core.searchReverse = function(pos, matchStr, callback) {
  var l, line, matchCallback, stop, _i, _ref, _results;
  if (typeof pos === "string") {
    callback = matchStr;
    matchStr = pos;
    pos = core.getCursorPosition();
  }
  stop = false;
  matchCallback = function() {
    var foundOffset, m, posFound;
    m = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (stop) {
      return;
    }
    foundOffset = m[m.length - 2];
    posFound = editor.addPositionOffset(iter.getPos(), foundOffset);
    if (editor.isPositionBefore(pos, posFound)) {
      return;
    }
    if (callback(posFound, m) === false) {
      return stop = true;
    }
  };
  _results = [];
  for (l = _i = _ref = pos.line; _ref <= 0 ? _i <= 0 : _i >= 0; l = _ref <= 0 ? ++_i : --_i) {
    line = core.getLine(l);
    line.replace(matchStr, matchCallback);
    if (stop) {
      break;
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

core.embbedText = function(range, prefix, suffix) {
  core.insert(range.end, suffix);
  return core.insert(range.start, prefix);
};

core.shareDoc = function() {
  var req;
  req = window.require.config({
    context: "redsys",
    baseUrl: "http://localhost:8002"
  });
  req(["redsys"], function(redsys) {
    return redsys.setProject("sample_project", function() {});
  });
  return null;
};

return core;
});