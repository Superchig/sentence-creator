function createSentence() {
  var commonNouns = document
	  .getElementById("commonNouns")
	  .value
	  .split("\n");

  var transVerbs = document
	  .getElementById("transVerbs")
	  .value
	  .split("\n");

  var commonNoun1 = randomItem(commonNouns);
  var commonNoun2 = randomItem(commonNouns);
  var transVerb = randomItem(transVerbs);

  var sentence = commonNoun1 + " " + transVerb + " " + accusative(commonNoun2) + ".";
  console.log(sentence);
  document.getElementById("output").innerHtml = sentence;
}

function saveCommonNouns() {
  document.cookie = "commonNouns=" + document.getElementById("commonNouns").value;
}

function saveTransVerbs() {
  document.cookie = "transVerbs=" + document.get.ElementById("transVerbs").value;
}

function capitalize(str) {
  var output = str;

  output[1] = output[1].capitalize();

  return output;
}

function randomItem(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function accusative(noun) {
  return noun + "n";
}

function plural(noun) {
  return noun + "j";
}

function accPlural(noun) {
  return accusative(plural(noun));
}
