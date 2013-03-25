define (require) ->

	Adapter = require "editor_tools/ace_text_adapter"

	Tex = require "editor_tools/tex_utils"
	Toolbar = require "editor_tools/scriptable_toolbar"
	Interpretter = require "editor_tools/interpretter"

	enrich_editor : (editor, id) ->
		# ui-layout-north
		wrapped = $(id).wrap("<div>").parent();
		$(id).addClass("ui-layout-center");
		header = $("<div>").addClass("ui-layout-north");
		terminal = $("<div>").addClass("ui-layout-south");
		wrapped.prepend(header);
		wrapped.append(terminal);
		layout = null

		jQuery(document).ready(() ->
			$(wrapped).width($(id).width())
			$(wrapped).height($(id).height())

			layout = wrapped.layout({ 
				enableCursorHotkey : false,
				north : {
					closable : false,
					size : 20,
					resizable : false,
				},
				south : {
					resizable : true,
					size: 80,
					initClosed: true,
				}
			});
		)

		doc = new Adapter(editor);
		tex_utils = new Tex(doc);
		interpretter = new Interpretter(tex_utils);
		toolbar = new Toolbar(header, interpretter);

		jQuery.get "macros/tex.json", (data) ->
			toolbar.init(JSON.parse(data));

		termToggle = (evt)->
			# if C+` was pressed
			if evt.keyCode == 192 && evt.ctrlKey
				if layout.state.south.isClosed
					layout.open("south");
					$(terminal).trigger("click");    
					$(terminal).focus();
					editor.blur();
				else
					layout.close("south");
					editor.focus();
				return false

		$(terminal).terminal((command, term) ->
			term.echo(interpretter.exec(command));
		,{
			greetings: "",
			tabcompletion : true,
			keyDown: termToggle,
			completion : (terminal, string, callback) -> interpretter.autocomplete(string, callback);
		});


		$(wrapped).keydown termToggle