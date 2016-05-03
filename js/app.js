var allQuotes = ['"Strength is born in the deep silence of long-suffering hearts; not amidst joy." - Felicia Hemans','"When you come to the end of your rope, tie a knot and hang on." - Franklin D. Roosevelt','"You can be a victim of cancer, or a survivor of cancer. It’s a mindset." - Dave Pelzer','"Cancer may have started the fight, but I will finish it." - gotCancer.org','"You never know how strong you are until being strong is the only choice you have." - Cayla Mills'];
var newQuote;

function randomNumber(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomQuotePicker() {
  newQuote = allQuotes[randomNumber(0,allQuotes.length - 1)];
  return newQuote;
}

function addQuote(quoteText) {
  randomQuotePicker();
  document.getElementById('quotePara').textContent = newQuote;
}

addQuote();
