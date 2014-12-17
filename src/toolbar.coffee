define (require) ->
  $ = jQuery if not $?;

  class Toolbar
    constructor: (@top) ->
      @sections = {};
      @addSection("default");

    addSection: (section) ->
      return @sections[section] if @sections[section]?;
      section_div = $("<div>").addClass("btn-group");
      @sections[section] = section_div;
      @top.append(section_div);
      return section_div;

    removeSection: (section) ->
      return if section not in @sections;

    addItem: (id, icon, callback, text="", section="default") ->
      section = @addSection(section);
      img = $("<img>").attr("src", icon).attr("height", 16).attr("width", 16).attr("alt", text);
      btn = $("<button>").attr("type", "button").addClass("btn").addClass("btn-default").append(img).attr("id", id);
      $(btn).click(callback);

      $(section).append(btn);
      

    removeItem: (id) ->
      console.log("removing "+id);
      $("#"+id).remove();
