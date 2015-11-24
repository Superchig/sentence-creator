function createSentence() {
	var commonNouns = getCommonNouns();
	var transVerbs = getTransVerbs();
	var adjectives = getAdjectives();
	var senPats = document.getElementById("senPats").value
			.replace("\n ", "\n")
			.split("\n");

	var senPat = randomItem(senPats);

	// Remove the period at the end of the sentence pattern.
	if (senPat[senPat.length - 1] == '.') {
		senPat = senPat.substr(0, senPat.length - 1);
	}
	
	var sentence = subSentence(senPat,
							   commonNouns,
							   transVerbs,
							   adjectives) + "."; // Add the period

	console.log(sentence);
	document.getElementById("output").value = sentence;
}

function subSentence(senPat, commonNouns, transVerbs, adjectives) {
	var index = 0;

	senPat = senPat.split(" ");
	for (var word of senPat) {
		switch (word) {
		case "COMMON_NOUN":
			senPat[index] = randomItem(commonNouns).word;
			break;
		case "PRES_TRANS_VERB":
			senPat[index] = randomItem(transVerbs).presentTense();
			break;
		case "ACC_COMMON_NOUN":
			senPat[index] = randomItem(commonNouns).accusative();
			break;
		case "PLURAL_COMMON_NOUN":
			senPat[index] = randomItem(commonNouns).plural();
			break;
		case "ACC_PLURAL_COMMON_NOUN":
			senPat[index] = randomItem(commonNouns).accPlural();
			break;
		case "ADJECTIVE":
			senPat[index] = randomItem(adjectives).word;
			break;
		case "PLURAL_ADJECTIVE":
			senPat[index] = randomItem(adjectives).plural();
			break;
		case "ACC_ADJECTIVE":
			senPat[index] = randomItem(adjectives).accusative();
			break;
		case "ACC_PLURAL_ADJECTIVE":
			senPat[index] = randomItem(adjectives).accPlural();
			break;
		}

		index++;
	}
	return senPat.join(" ");
}

// Functions that retrieve words from the DOM

function getAdjectives() {
	return document.getElementById("adjectives")
		.value
		.replace("\n ", "\n")
		.split("\n")
		.map(function(adjective) {
			return new Adjective(adjective);
		});
}

function getCommonNouns() {
	return document.getElementById("commonNouns")
		.value
		.replace("\n ", "\n")
		.split("\n")
		.map(function (noun) {
			return new Noun(noun);
		});
}

function getTransVerbs() {
	return document.getElementById("transVerbs")
		.value
		.replace("\n ", "\n")
		.split("\n")
		.map(function (infinitive) {
			return new Verb(infinitive);
		});
}

// Cookies Functions

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var c of ca) {
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "";
}

function saveInput(inputName) {
	document.cookie = inputName + "=" + document.getElementById(inputName).value;
}

function loadInput(inputName) {
	document.getElementById(inputName).value = getCookie(inputName);
}

// DOM Add onclick properties onto corresponding buttons.

function addSaveInputToButton(buttonId, inputName) {
	document.getElementById(buttonId).addEventListener('click', saveInput(inputName));
}

addSaveInputToButton("saveCommonNouns", "commonNouns");
addSaveInputToButton("saveTransVerbs", "transVerbs");
addSaveInputToButton("saveAdjectives", "adjectives");
addSaveInputToButton("saveSenPats", "senPats");

function addLoadInputToButton(buttonId, inputName) {
	document.getElementById(buttonId).addEventListener('click', loadInput(inputName));
}

addLoadInputToButton("saveCommonNouns", "commonNouns");
addLoadInputToButton("saveTransVerbs", "transVerbs");
addLoadInputToButton("saveAdjectives", "adjectives");
addLoadInputToButton("saveSenPats", "senPats");


function randomItem(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

// Word declaration
var Word = function(word) {
	this.word = word;
};

Word.prototype.capitalize = function() {
	var output = this.word;

	output[1] = output[1].toUpperCase();

	return output;
};

// Noun declaration
var Noun = function(word) {
	Word.call(this, word);
};

Noun.prototype = Object.create(Word.prototype);
Noun.prototype.constructor = Noun;

Noun.prototype.accusative = function() {
	return this.word + "n";
};

Noun.prototype.plural = function() {
	return this.word + "j";
};

Noun.prototype.accPlural = function() {
	return this.word + "jn";
};

// Verb declaration
var Verb = function(infinitive) {
	Word.call(this, infinitive);
};

Verb.prototype = Object.create(Word.prototype);
Verb.prototype.constructor = Verb;

Verb.prototype.root = function() {
	return this.word.substr(0, this.word.length - 1);
};

Verb.prototype.pastTense = function() {
	return this.root() + "is";
};

Verb.prototype.presentTense = function() {
	return this.root() + "as";
};

Verb.prototype.futureTense = function() {
	return this.root() + "os";
};

// Adjective declaration
var Adjective = function(adjective) {
	Word.call(this, adjective);
};

Adjective.prototype = Object.create(Word.prototype);
Adjective.prototype.constructor = Word;

Adjective.prototype.plural = function() {
	return this.word + "j";
};

Adjective.prototype.accusative = function() {
	return this.word + "n";
};

Adjective.prototype.accPlural = function() {
	return this.word + "jn";
};
