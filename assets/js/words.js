var Word = function(word) {
	this.word = word;
};

Word.prototype.capitalize = function() {
	var output = this;

	output[1] = output[1].toUpperCase();

	return output;
};

// Noun declaration
var Noun = function(word) {
	super(word);
};

Noun.prototype = Object.create(Word.prototype);
Noun.prototype.constructor = Noun;

Noun.prototype.accusative = function(noun) {
	return this.word + "n";
};

Noun.prototype.plural = function(noun) {
	return this.word + "j";
};
