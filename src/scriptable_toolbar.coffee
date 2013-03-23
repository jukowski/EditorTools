define (require) ->

	class ScriptableToolbar
		constructor: (@id, @interpretter) ->

		addButton: (btnId, name, script) ->
			me = @
			$(@id).append("<button id='"+btnId+"'>"+name+"</button>");
			$("#"+btnId).click ()-> 
				me.interpretter.exec(script);

		init: (data) ->
			for id, item of data
				@addButton(id, item.name, item.code);