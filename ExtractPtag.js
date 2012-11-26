function ExtractPtag(){
  // this is the dom element clicked
  //var index = $("p").index(this);
  //$("span").text("That was p index #" + index);
  
  var ArrayOfParagraph = $("p").get();
  //var index = $("p").index(this);

  //alert("ArrayOfParagraph Length is" + ArrayOfParagraph.length);
  
  for(i=0; i < ArrayOfParagraph.length; ++i)
  {
  
	//$("span").text("Output1: " + i + "	Output2: " + ArrayOfParagraph[i].innerHTML);
	
	// Method 1
	//var newHTML = "<span style = 'color:#008000' >" + ArrayOfParagraph[index].innerHTML + "</span>";
	//ArrayOfParagraph[index].innerHTML = newHTML;
	
	var ArrayOfSentence = ArrayOfParagraph[i].innerHTML.split('. ');
	var tempHTML = "";

	// Cases including:
	// Case1: Mr., Mrs. and Dr. 
	// Case2: i.e.,
	// Case3: et al.
	// Case4: etc.
	// Case4: a.k.a.
	// Case5: ...

		for(j=0; j < ArrayOfSentence.length-1; ++j)
		{
			tempHTML += ('<span>' + ArrayOfSentence[j] + '. ' + '</span>'); 
		} // END of for j
			/*
	   	for (j=0; j < ArrayOfSentence.length; ++j)
	   	{
	      switch(tempHTML[j])
	      {
	      	case "Mr":
	      	case "Mrs":
	      	case "Dr"
				tempHTML += ('<span>' + ArrayOfSentence[j] + '.' + ' ' + ArrayOfSentence[++j] + '</span>');
				break;






      }


   };
	*/

	
		//alert("END OF SPLIT");
		ArrayOfParagraph[i].innerHTML = tempHTML;
		//alert(ArrayOfParagraph[i].innerHTML);
		var IndexOfParagraph = 0;
		var IndexOfSentence = 0;
		
		$.getScript("KeyboardEvent.js", function(){
			KeyboardEvent(IndexOfParagraph,IndexOfSentence,ArrayOfParagraph,ArrayOfSentence);
		});
	}; // END of for i
};