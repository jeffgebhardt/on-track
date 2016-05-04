var allQuotes = ['"Strength is born in the deep silence of long-suffering hearts; not amidst joy."','"When you come to the end of your rope, tie a knot and hang on."','"You can be a victim of cancer, or a survivor of cancer. It’s a mindset."','"Cancer may have started the fight, but I will finish it."','"You never know how strong you are until being strong is the only choice you have."'];
var allQuotesCite = ['- Felicia Hemans', '- Franklin D. Roosevelt', '- Dave Pelzer', '- gotCancer.org', '- Cayla Mills'];
var newQuote;
var newQuoteCite;

function randomNumber() {
  return Math.floor(Math.random() * allQuotes.length);
}

function addQuote() {
  var randomIndex = randomNumber();
  document.getElementById('quotePara').innerHTML = '<h7>' + allQuotes[randomIndex] + '</h7><p>' + allQuotesCite[randomIndex] + '</p>';
}

addQuote();
