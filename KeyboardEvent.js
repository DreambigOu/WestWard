function KeyboardEvent(IndexOfParagraph,IndexOfSentence,ArrayOfParagraph,ArrayOfSentence){

	$(document).bind("keydown", function(event){

		var keyCode = event.keyCode || event.which;
		//event.preventDefault();
		if (keyCode == 32 && IndexOfParagraph == 0 && IndexOfSentence == 0 )
		{
			$.getScript("GetSentence.js", function(){
				GetSentence(IndexOfParagraph,IndexOfSentence);
			});
		}
		if (keyCode == 190)
		{

			IndexOfSentence +=1;						
			/*// check the upper boundries of the sentences
			if (IndexOfSentence > ArrayOfSentence.length)
			{
				// check the upper boundries of the paragraphs
				if (IndexOfParagraph > ArrayOfParagraph.length)
				{
					IndexOfSentence -=1;
				}
				elsefParagraph,IndexOfSentence);

			// for debug
			///$("#msg").html("<h1>"+ IndexOfSentence +"</h1>").css({"background-color": "#000000", "color": "#00ed00", "border": "2px solid #C2E9C8"}).fadeIn();
		}
		else if (keyCode == 188)
		{
			IndexOfSentence -=1;
			GetSentence(IndexOfParagraph,IndexOfSentence);

				{
					IndexOfParagraph +=1;
					IndexOfSentence = 0;
				}; // END if IndexOfParagraph
			}; // END if IndexOfSentence
			*/
			// what we really want to do:
			GetSentence(IndexOfParagraph,IndexOfSentence);
			// for debug
			///$("#msg").html("<h1>"+ IndexOfSentence +"</h1>").css({"background-color": "#C7EDCC", "color": "#2F2F2F", "border": "2px solid #C2E9C8"}).fadeIn();
		}; // END if keyCode

	}); // END bind
}; // END function keyboard_event
