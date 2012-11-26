
$(document).ready(function() {

    var WESTWARD = {    

            // Variables     
            BlueCSS: {
                'color': '#2f2f2f',
                'background-color': '#b3d4ff'
            },
            PinkCSS: {
                'color': '#2f2f2f',
                'background-color': '#fbdbe8'
            },
            GreenCSS: {
                'color': '#2f2f2f',
                'background-color': '#C7EDCC'
            },
            BlackCSS: {
                'color': '#00FF00',
                'background-color': '#000000'
            },
            
            OriginalCSS: {
                'color':'black', 
                'background-color': 'transparent'
            },

            //DesiredCSS: {},
            DesiredCSS: {
                'color': '#00FF00',
                'background-color': '#000000'
            },
            DetectedCss: "",

            IndexOfParagraph: 0,
            IndexOfSentence: 0,

            // Arrays
            LengthOfParagraph: [],
            LengthOfSentences: [],

            // Miscellaneous
            StartFlag: 0,
    };

    //ExtractPtag(WESTWARD);
    ExtractPtagTest(WESTWARD);
    // ChooseStyles(WESTWARD);
    //KeyboardEvent(WESTWARD);

    //TEST();
    //document.body.style.backgroundColor="green";
    
});

function TEST() 
{   
    var ArrayOfParagraph = document.body.getElementsByTagName("p");
    for (var i = 0; i < ArrayOfParagraph.length; ++i) {
        document.write(ArrayOfParagraph[i].innerHTML);    
    }
    //document.write(ArrayOfParagraph);
    console.log(ArrayOfParagraph);
    document.body.style.backgroundColor="green";
}


function ExtractPtagTest(WESTWARD) 
{
    var ArrayOfAbb = ["Dr", "Mr", "Mrs","Ms", "Prof", "abbr", "adj", "adv", "anon", "ca", "cap", "cf", "ch", "chap", "colloq", "conj", "d", "def", "doc", "e.g", "ed", "al", "etc", "fig", "i.e", "ibid", "illus", "lang", "narr", "no", "obj", "pp", "p", "par", "pl", "poss", "prep", "pron", "pseud", "pub", "qtd", "rev", "rpt", "sec", "singular", "syn", "trans", "univ", "v", "vb", "vol", "vs"];

    //var ArrayOfParagraph = $("p").get();
    var ArrayOfParagraph = document.body.getElementsByTagName("p");
    var ArrayOfSentence = new Array();

        for (var i = 0; i < ArrayOfParagraph.length; ++i) {
        
        ArrayOfSentence[i] = ArrayOfParagraph[i].innerHTML.split('.');
        alert(ArrayOfSentence[i]);

    };// End of Step1 outer loop



};




function ExtractPtag(WESTWARD) 
{
    var ArrayOfAbb = ["Dr", "Mr", "Mrs","Ms", "Prof", "abbr", "adj", "adv", "anon", "ca", "cap", "cf", "ch", "chap", "colloq", "conj", "d", "def", "doc", "e.g", "ed", "al", "etc", "fig", "i.e", "ibid", "illus", "lang", "narr", "no", "obj", "pp", "p", "par", "pl", "poss", "prep", "pron", "pseud", "pub", "qtd", "rev", "rpt", "sec", "singular", "syn", "trans", "univ", "v", "vb", "vol", "vs"];

    //var ArrayOfParagraph = $("p").get();
    var ArrayOfParagraph = document.body.getElementsByTagName("p");
    var ArrayOfSentence = new Array();

    // Step1: Split sentence by '.'
    // For each paragraph split sentence by '.'. And store the sentence in the two dimensional array ArrayOfSentence[LengthOfParagraph][LengthOfSentence].
    for (var i = 0; i < ArrayOfParagraph.length; ++i) {
        ArrayOfSentence[i] = ArrayOfParagraph[i].innerHTML.split('.');

        var temp2HTML = "";

        for (var j = 0; j < ArrayOfSentence[i].length; ++j)
        {
            var tempLastWordOfFirstSentence = ArrayOfSentence[i][j].split(' ');
            var LastWordOfFirstSentence = tempLastWordOfFirstSentence[tempLastWordOfFirstSentence.length - 1];

            var tempFirstWordOfSecondSentence = "";
            var tempSecondWordOfSecondSentence = "";

            var FirstWordOfSecondSentence = "";
            var SecondWordOfSecondSentence = "";
            var FirstCharOfWord = "";

            if (jQuery.inArray(LastWordOfFirstSentence, ArrayOfAbb) > -1) 
            {
                // note:
                // There are issues when dealing with "etc" and "et al".
                // This two abbreviations has issues when they are in the end of sentence.

                    ArrayOfSentence[i][j + 1] = ArrayOfSentence[i][j] + '.' + ArrayOfSentence[i][j + 1];
                    ArrayOfSentence[i][j] = null;
            } else
            {
                // Do not find it in the ArrayOfAbb

                // For the last sentence in the paragraph
                if((j == (ArrayOfSentence[i].length-2)) && (ArrayOfSentence[i][j+1] == ""))
                {
                    // For end of sentence
                    ArrayOfSentence[i][j] = ArrayOfSentence[i][j] + '.';
                    ArrayOfSentence[i][j+1] = null;
                    
                    // Since the last instance in the ArrayOfSentence is "", so we increase the index to break the for loop
                    j+=1
                    continue;
                };

                tempFirstWordOfSecondSentence = ArrayOfSentence[i][j + 1].split(' ');

                FirstWordOfSecondSentence = tempFirstWordOfSecondSentence[0];
                SecondWordOfSecondSentence = tempFirstWordOfSecondSentence[1];

                if (FirstWordOfSecondSentence == "") {

                    // For end of sentence  Ex: xxxxx. The
                    tempFirstCharOfWord = SecondWordOfSecondSentence.split("");
                    FirstCharOfWord = tempFirstCharOfWord[0];

                    if (isUpperCase(FirstCharOfWord)) {
                        ArrayOfSentence[i][j] = ArrayOfSentence[i][j] + '.';
                    };
                } else if (FirstWordOfSecondSentence != "") {

                    // For Abbreviation such as Ex: U.S.A or a.k.a
                    ArrayOfSentence[i][j + 1] = ArrayOfSentence[i][j] + '.' + ArrayOfSentence[i][j + 1];
                    ArrayOfSentence[i][j] = null;
                };
            };

            //alert("END OF SPLIT by '.'");
        };// End of Step1 inner loop: Split sentence by '.'

    };// End of Step1 outer loop
    //------------------Step 1 End-------------------------        

    // Step2: Split each sentence by '!', '?', ':' or ';' and put it back to ArrayOfSentence.
    var ArrayOfPunc = ["!", "?"];
    var tempArrayOfSentence = new Array();
    var tempArrayOfIndex = new Array();
    var tempArrayofFinalSentence = new Array();
    var tempArrayofSplitedSentence = new Array();
    var tempSentence = "";
    
    var IndexOfSearchStart = 0;
    var IndexOfChar = 0;
    var IndexOftempArrayOfIndex = 0;
    var IndexOfStartSentence = 0;
    var IndexOfEndSentence = 0;
    var IndexOftempArrayOfSentence = 0;

    // For each paragraph
    for (var i = 0; i < ArrayOfSentence.length; ++i)
    {
        tempArrayOfSentence[i]= new Array();
        IndexOftempArrayOfSentence = 0;

        // For each sentence in the paragraph
        for(var j=0; j < ArrayOfSentence[i].length; ++j)
        {   
            // If it is null in the array, then skip it.
            if (ArrayOfSentence[i][j] == null)
                continue;

            tempArrayofSplitedSentence = ArrayOfSentence[i][j].split("");                        
            //******tempArrayOfIndex = [];
            tempArrayOfIndex = new Array();
            IndexOftempArrayOfIndex = 0;

            // Look for the address of each symbol in the ArrayOfChar
            for(var k=0; k < ArrayOfPunc.length; ++k)
            {
                IndexOfSearchStart = 0;
                
                while(true)
                    {
                    IndexOfChar = jQuery.inArray(ArrayOfPunc[k], tempArrayofSplitedSentence, IndexOfSearchStart);
                    
                    // If not found puctuation
                    if(IndexOfChar <= -1)
                        break; // break for while loop

                    tempArrayOfIndex[IndexOftempArrayOfIndex] = {Punc:ArrayOfPunc[k], Address:IndexOfChar};
                    IndexOfSearchStart = IndexOfChar + 1;
                    IndexOftempArrayOfIndex+=1;
                    };
            };

            // For sentence not found the puctuation, assemble and put it back to array
            if(tempArrayOfIndex.length == 0)
            {
                // Clear and set the tempSentence
                tempSentence = ArrayOfSentence[i][j];
                
                // Join the puctuation
                tempArrayOfSentence[i][IndexOftempArrayOfSentence] = tempSentence;

                // Increase the index of tempArrayOfSentence
                IndexOftempArrayOfSentence+=1;

                continue;
            };

            // Sort the tempArrayOfIndex
            tempArrayOfIndex.sort(function(a, b){
                return a.Address - b.Address;
            });

            //Assemble the sentence
            // For each punctuation in the tempArrayOfIndex 
            IndexOfStartSentence = 0;

            for (var l = 0; l < tempArrayOfIndex.length+1; ++l)
            {
                // Get and set the end index of sentence
                if(l == tempArrayOfIndex.length)
                {
                    if(IndexOfStartSentence < (tempArrayofSplitedSentence.length-1))
                        IndexOfEndSentence = tempArrayofSplitedSentence.length - 1;                         
                }else if(l < tempArrayOfIndex.length)
                {
                    IndexOfEndSentence = tempArrayOfIndex[l].Address;
                };
                

                // Clear the tempSentence
                tempSentence = "";

                // Join the char into senteence
                for(var m = IndexOfStartSentence ; m <= IndexOfEndSentence; ++m)
                {
                    if(tempSentence == "")
                    {
                        tempSentence = tempArrayofSplitedSentence[m];
                    }else 
                    {
                        tempSentence = tempSentence + tempArrayofSplitedSentence[m];
                    };
                };

                //alert("sentence " + tempSentence);
                tempArrayOfSentence[i][IndexOftempArrayOfSentence] = tempSentence;

                // Increase the index of tempArrayOfSentence
                IndexOftempArrayOfSentence+=1;
                
                // Update the IndexOfStartSentence 
                IndexOfStartSentence = IndexOfEndSentence + 1;
            };
        }; // End of For each sentence
    };// End of For each paragraph

    // Move the current tempArrayOfSentence into ArrayOfSentence 
    if(ArrayOfSentence.length == tempArrayOfSentence.length)
    {                       
        for(var i=0; i < tempArrayOfSentence.length; ++i)
        {
            ArrayOfSentence[i] = new Array;
           for (var j = 0; j < tempArrayOfSentence[i].length; ++j)
            {
                ArrayOfSentence[i][j] = tempArrayOfSentence[i][j];
            };
        };
    };
    //----------------Step2 End--------------------------------
 
    // Step3: Go through ArrayOfSentence and insert <span> tag of each spilted sentence. Then, insert <p> tag of each paragrah.
    //        Finally, put it back to the html of web page.
    for (var i = 0; i < ArrayOfSentence.length; ++i)
    {
        for(var j = 0; j < ArrayOfSentence[i].length; ++j)
        {
            if (ArrayOfSentence[i][j] != null)
            {
                if (temp2HTML == "")
                {
                    temp2HTML = '<span>' +  ArrayOfSentence[i][j] + '</span>' ;    
                }else
                {
                    temp2HTML = temp2HTML + '<span>' +  ArrayOfSentence[i][j] + '</span>' ;
                };                            
            };
        };

        ArrayOfParagraph[i].innerHTML = temp2HTML;
        temp2HTML = "";
    };

    //document.body.style.backgroundColor="green";
    
    WESTWARD.LengthOfParagraph = ArrayOfParagraph.length;

    for(i=0; i < ArrayOfParagraph.length; ++i)
    {
    	WESTWARD.LengthOfSentences[i] = ArrayOfSentence[i].length;
    };
    
    //----------------Step3 End-------------------------------------

};

function KeyboardEvent(WESTWARD){
    
    //temp
     WESTWARD.StartFlag = 1;

    $(document).bind("keydown", function(event){

		var keyCode = event.keyCode || event.which;
		event.preventDefault();
	
        if (WESTWARD.StartFlag == 1)
        {

		  // Press ">" or "spacebar" : next sentence
		  //==========================================================================>
		  if (keyCode == 32 || keyCode == 68 || keyCode == 190)
		  {
		  	RestoreCSS(WESTWARD);
		  	WESTWARD.IndexOfSentence +=1;						
		  	// check the upper boundries of the sentences
		  	if (WESTWARD.IndexOfSentence >= WESTWARD.LengthOfSentences[WESTWARD.IndexOfParagraph])
		  	{
		  		// check the upper boundries of the paragraphs
		  		if (WESTWARD.IndexOfParagraph >= WESTWARD.LengthOfParagraph-1)
		  		{
		  			WESTWARD.IndexOfSentence -=1;
		  		}
		  		else
		  		{
		  			WESTWARD.IndexOfParagraph +=1;
		  			WESTWARD.IndexOfSentence = 0;
		  		}; // END if IndexOfParagraph				
		  	}// END if IndexOfSentence
		  	
		  	ApplyCSS(WESTWARD);
    
		  };
    
		  // Press "<" : previous sentence
		  //==========================================================================>
		  if (keyCode == 188 || keyCode == 65)
		  {
		  	RestoreCSS(WESTWARD);
		  	
		  	WESTWARD.IndexOfSentence -=1;						
		  	// check the bottom boundries of the sentences
		  	if (WESTWARD.IndexOfSentence < 0)
		  	{
		  		// check the bottom boundries of the paragraphs
		  		if (WESTWARD.IndexOfParagraph == 0)
		  		{
		  			WESTWARD.IndexOfSentence +=1;
		  		}
		  		else
		  		{
		  			WESTWARD.IndexOfParagraph -=1;
		  			WESTWARD.IndexOfSentence = WESTWARD.LengthOfSentences[WESTWARD.IndexOfParagraph]-1;
		  		}; // END if IndexOfParagraph				
		  	};// END if IndexOfSentence
		  	
		  	ApplyCSS(WESTWARD);
		  	
		  }; // END if keyCode
    
            // Press "/" : next paragraph
            //==========================================================================>
    
            if (keyCode == 191 || keyCode == 83)
            {
                RestoreCSS(WESTWARD);
                WESTWARD.IndexOfParagraph +=1;
    
                if (WESTWARD.IndexOfParagraph >= WESTWARD.LengthOfParagraph)
                {
                    WESTWARD.IndexOfParagraph -=1;
                }
                
                WESTWARD.IndexOfSentence = 0;
                ApplyCSS(WESTWARD);
            };
    
            // Press "m" : previous paragraph
            //==========================================================================>
    
            if (keyCode == 77 || keyCode == 87)
            {
                RestoreCSS(WESTWARD);
                WESTWARD.IndexOfParagraph -=1;
    
                if (WESTWARD.IndexOfParagraph < 0)
                {
                    WESTWARD.IndexOfParagraph +=1;
                }
                else if (WESTWARD.IndexOfSentence != 0)
                {
                    WESTWARD.IndexOfParagraph +=1;
                }
    
                WESTWARD.IndexOfSentence = 0;
                ApplyCSS(WESTWARD);
            };
        };

		// Debug panel
		$("#msg").html(
			"<h1>" +
			"Variable: " + WESTWARD.DetectedCss['color'] + "<br>" +
			"Variable: " + WESTWARD.DetectedCss['background-color'] + "<br>" +
			"Length of paragraph: " + WESTWARD.LengthOfParagraph + "<br>" +
			"Length of sentences: " + WESTWARD.LengthOfSentences[WESTWARD.IndexOfParagraph] + "<br>" +
			"Index of paragraph " + WESTWARD.IndexOfParagraph + "<br>" +
			"Index of sentence: " + WESTWARD.IndexOfSentence + 
			"</h1>"
			).css({"background-color": "#C7EDCC", "color": "#2F2F2F", "border": "2px solid #C2E9C8"}).fadeIn();

	}); // END bind
}; // END function keyboard_event

function ApplyCSS(WESTWARD){
	var SelectorApplying;

	SelectorApplying = "p:eq(" + WESTWARD.IndexOfParagraph + ") > span:eq(" + WESTWARD.IndexOfSentence + ")";
	$(SelectorApplying).css(WESTWARD.DesiredCSS);

};

function RestoreCSS(WESTWARD){
	var SelectorRestoring

	SelectorRestoring = "p:eq(" + WESTWARD.IndexOfParagraph + ") > span:eq(" + WESTWARD.IndexOfSentence + ")";
	$(SelectorRestoring).css(WESTWARD.OriginalCSS);
	//$(SelectorRestoring).css({"color": WESTWARD.DetectedCSS['color'], "background-color": WESTWARD.DetectedCSS['background-color']});

};

function ChooseStyles(WESTWARD){
     $(".green-label").click(function() {
        WESTWARD.DesiredCSS = WESTWARD.GreenCSS;
        ApplyCSS(WESTWARD);
        WESTWARD.StartFlag = 1;
    });
    $(".pink-label").click(function() {
        WESTWARD.DesiredCSS = WESTWARD.PinkCSS;
        ApplyCSS(WESTWARD);
        WESTWARD.StartFlag = 1;
    });
    $(".blue-label").click(function() {
        WESTWARD.DesiredCSS = WESTWARD.BlueCSS;
        ApplyCSS(WESTWARD);
        WESTWARD.StartFlag = 1;
    });
    $(".black-label").click(function() {
        WESTWARD.DesiredCSS = WESTWARD.BlackCSS;
        ApplyCSS(WESTWARD);
        WESTWARD.StartFlag = 1;
    });
}

function isUpperCase(input)
{
    if(input.toUpperCase() != input)
    {
        return false;

    }else
    {
        return true;
    };
};

