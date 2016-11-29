function words(word){
	//Format the argument to replace backSlash and tab by space. 
	// and Split the argument in an array
	var word_formated = word.replace("\n", " ");
	word_formated = word_formated.replace("\t", " ");
	var word_splitted = word_formated.split(" ")
	var expectedCount = {};
	var temp = "";

	for (var i = 0; i < word_splitted.length; i++) {
		temp = (word_splitted[i]).trim();
	  if (temp !== "") {
	    if(expectedCount[temp] !== undefined){
  			expectedCount[temp] = expectedCount[word_splitted[i]] + 1;
		  } else {
  			expectedCount[temp] = 1;
		  }	
	  }
	}

	return expectedCount;
}

module.exports = words;