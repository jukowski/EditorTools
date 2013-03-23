define (require) ->

  class TextUtils
    constructor:(@editor) -> @editor.getText();

    embbedSelectedText:(prefix, suffix) ->
      return @embbedText(@editor.getSelectedRange(), prefix, suffix);

    focus: () ->
      @editor.focus();

    insert: (pos, text) ->
      if typeof pos == "string"
        text = pos
        pos = @editor.getCursorPosition();
      @editor.insert(pos, text);
      return

    getPos : () -> @editor.getCursorPosition();

    setPos : (pos) -> @editor.setCursorPosition(pos);

    indentToNextLine: (pos) ->
      if not pos?
        pos = @editor.getCursorPosition();

      iter = @editor.getLineIterator(pos);
      line = iter.getLine();
      t = line.match /^[\s]*/;
      if t? 
        t = t[0]
      else 
        t = "";
      return if (t.length == line.length);
      @editor.insert(pos, "\n"+t);

    getEol: (pos) ->
      if not pos?
        pos = @editor.getCursorPosition();

      iter = @editor.getLineIterator(pos);
      toSkip = iter.getLine().length - iter.getOffsetInLine();
      pos = @editor.addPositionOffset(pos, toSkip);
      pos

    searchReverse : (pos, matchStr, callback) ->
      editor = @editor;
      iter = editor.getLineIterator(pos);
      stop = false;

      matchCallback = (m...) ->
        return if stop
        foundOffset = m[m.length - 2];
        posFound = editor.addPositionOffset(iter.getPos(), foundOffset);
        return if editor.isPositionBefore(pos, posFound);
        if callback(posFound, m) == false
          stop = true;

      iter.getLine().replace(matchStr, matchCallback);
      
      while (iter.hasPrevious())
        break if stop
        line = iter.getPrevious();
        line.replace(matchStr, matchCallback);


    embbedText :(range, prefix, suffix) ->
      return if range.isEmpty();
      console.log(range);
      @editor.insert(range.end, suffix);
      @editor.insert(range.start, prefix)

  return TextUtils