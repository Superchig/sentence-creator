function createSentence() {
	var commonNouns = document
			.getElementById("commonNouns")
			.value
			.split("\n")
			.map(function (noun) {
				return new Noun(noun);
			});

	var transVerbs = document
			.getElementById("transVerbs")
			.value
			.split("\n")
			.map(function (infinitive) {
				return new Verb(infinitive);
			});

	var senPats = document.getElementById("senPats").value
			.split("\n");

	var senPat = randomItem(senPats).split(" ");

	var index = 0;
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
		}

		index++;
	}

	var sentence = senPat.join(" ");
	
	console.log(sentence);
	document.getElementById("output").innerHtml = sentence;
}

function saveCommonNouns() {
	document.cookie = "commonNouns=" + document.getElementById("commonNouns").value;
}

function saveTransVerbs() {
	document.cookie = "transVerbs=" + document.get.ElementById("transVerbs").value;
}

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

// Sentence pattern declaration
var SenPat = function(sentencePattern) {
	this.pattern = sentencePattern;
};
