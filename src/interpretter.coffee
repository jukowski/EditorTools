define (req) ->

	class Interpreter
		constructor: (@editor) ->
			@env = {};

		hasImplementation: (item) ->
			@env[item]?;

		exec: (script) ->
			try
				eval("with (this.env) { s = eval(script); }");
			catch e
				s = e;
			s.toString() if s? && s.toString?

		autocomplete: (string, callback) ->
			results = [];
			for prop of @env
				results.push(prop) if prop.indexOf(string) == 0
			callback(results);

		loadAPI: (data) ->
			env = @env;
			editor = @editor;
			for prop of data
				api = "scripts/"+prop+"-"+data[prop]["repo"]+"-"+data[prop]["version"]+".js";
				r = require([api], (t) ->
					env[prop] = () ->
						t(editor);
					);