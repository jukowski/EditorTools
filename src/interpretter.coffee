define (require) ->

	class Interpreter
		constructor: (@env) ->

		exec: (script) ->
			try
				eval("with (this.env) { s = eval(script); }");
			catch e
				s = e;
			s.toString() if s? && s.toString?

		autocomplete: (string, callback) ->
			results = [];
			for prop of @env
				console.log("prop", prop);
				results.push(prop) if prop.indexOf(string) == 0
			callback(results);

