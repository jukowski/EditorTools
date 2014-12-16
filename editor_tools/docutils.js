// Generated by CoffeeScript 1.7.1
var AttributePool, Changeset, PositionIterator, PositionManager;

Changeset = require('../types/Changeset');

AttributePool = require('../types/AttributePool');

PositionIterator = (function() {
  function PositionIterator(pm) {
    this.pm = pm;
    this.pOffset = 0;
    this.mline = 0;
    this.mcol = 0;
    this.newOffsets = [0, 0];
    this.nLine = 0;
  }

  PositionIterator.prototype.skip = function(chars) {
    var avail, _results;
    this.pOffset += chars;
    _results = [];
    while (chars > 0) {
      avail = this.pm.offsets[this.mline + 1] - this.pm.offsets[this.mline] - this.mcol;
      if (chars < avail) {
        this.newOffsets[this.nLine + 1] += chars;
        this.mcol += chars;
        break;
      }
      this.newOffsets[this.nLine + 1] += avail;
      chars -= avail;
      this.nLine++;
      this.mline++;
      this.mcol = 0;
      _results.push(this.newOffsets.push(this.newOffsets[this.nLine]));
    }
    return _results;
  };

  PositionIterator.prototype.insert = function(text) {
    var i, line, _i, _len, _ref, _results;
    if (!(text.length > 0)) {
      return;
    }
    _ref = text.split("\n");
    _results = [];
    for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
      line = _ref[i];
      if (i > 0) {
        this.newOffsets.push(++this.newOffsets[this.nLine + 1]);
        this.nLine++;
      }
      _results.push(this.newOffsets[this.nLine + 1] += line.length);
    }
    return _results;
  };

  PositionIterator.prototype["delete"] = function(chars) {
    var avail, _results;
    this.pOffset += chars;
    if (!(chars > 0)) {
      return;
    }
    _results = [];
    while (chars > 0) {
      avail = this.pm.offsets[this.mline + 1] - this.pm.offsets[this.mline] - this.mcol;
      if (chars < avail) {
        this.mcol += chars;
        break;
      }
      chars -= avail;
      this.mline++;
      _results.push(this.mcol = 0);
    }
    return _results;
  };

  PositionIterator.prototype.end = function() {
    return this.skip();
  };

  return PositionIterator;

})();

PositionManager = (function() {
  function PositionManager(text) {
    var i, line, lines, _i, _len;
    lines = text.split("\n");
    this.offsets = [0];
    this.count = lines.length;
    for (i = _i = 0, _len = lines.length; _i < _len; i = ++_i) {
      line = lines[i];
      this.offsets[i + 1] = this.offsets[i] + line.length + 1;
    }
    this.offsets[this.count]--;
  }

  PositionManager.prototype.getOffset = function(line, col) {
    if (line >= this.count) {
      return -1;
    }
    if (this.offsets[line + 1] - this.offsets[line] <= col) {
      return -1;
    }
    return this.offsets[line] + col;
  };

  PositionManager.prototype.getCoords = function(offset) {
    var l, m, om, r;
    if (!(offset < this.offsets[this.count])) {
      return -1;
    }
    l = 0;
    r = this.count - 1;
    while (l < r) {
      m = Math.ceil((l + r) / 2);
      om = this.offsets[m];
      if (om > offset) {
        r = m - 1;
      }
      if (om === offset) {
        return {
          line: m,
          col: 0
        };
      }
      if (om < offset) {
        l = m;
      }
    }
    return {
      line: l,
      col: offset - this.offsets[l]
    };
  };

  PositionManager.prototype.length = function() {
    return this.offsets[this.offsets.length - 1];
  };

  return PositionManager;

})();

exports.PositionIterator = PositionIterator;

exports.PositionManager = PositionManager;
