function GetSentence(IndexOfParagraph,IndexOfSentence){
	
	//for(i=0 ; i < MaxIndexOfParagraph; ++i)
	//{
		//for(j=0; j < MaxIndexOfSentence; ++j)
		//{
			//var selector = "p:eq(" + IndexOfParagraph + ") > span:eq(" + IndexOfSentence + ")" ;
			//alert("IndexOfParagraph: " + IndexOfParagraph + " IndexOfSentence: " + IndexOfSentence );	
			//$(selector).css("color", "blue");	
			var selectorCurrent, selectorBefore, selectorAfter = "";

			if(IndexOfSentence ==0)
			{
				selectorCurrent = "p:eq(" + IndexOfParagraph + ") > span:eq(" + IndexOfSentence + ")" ;
				selectorBefore = "";
				selectorAfter = "p:eq(" + IndexOfParagraph + ") > span:eq(" + (IndexOfSentence+1) + ")" ;
			}
			else
			{
				selectorCurrent = "p:eq(" + IndexOfParagraph + ") > span:eq(" + IndexOfSentence + ")" ;
				selectorBefore = "p:eq(" + IndexOfParagraph + ") > span:eq(" + (IndexOfSentence-1) + ")" ;
				selectorAfter = "p:eq(" + IndexOfParagraph + ") > span:eq(" + (IndexOfSentence+1) + ")" ;
			};
			//var selector = "p:eq(" + i + ") > span:eq(" + j + ")" ;
			//alert("IndexOfParagraph: " + IndexOfParagraph + " IndexOfSentence: " + IndexOfSentence );	
			//alert("IndexOfParagraph: " + i + " IndexOfSentence: " + j );	
			$(selectorCurrent).css({"color": "#222222", "background-color": "#C7EDCC"});				
			$(selectorBefore).css({"color":"black", "background-color": "#FFFFFF"});	
			$(selectorAfter).css({"color":"black", "background-color": "#FFFFFF"});				
			
		//}	END for j loop
	//} END for i loop
};