var allQuotes = [];
var appendFooterTwo = document.getElementById('footerTwo');

function Randomquotes(quote,who) {
  this.quote = quote;
  this.who = who;
  allQuotes.push(this);
}

var quote1 = new Randomquotes('Strength is born in the deep silence of long-suffering hearts; not amidst joy.','Felicia Hemans');

var quote2 = new Randomquotes('When you come to the end of your rope, tie a knot and hang on.','Franklin D. Roosevelt');

var quote3 = new Randomquotes('You can be a victim of cancer, or a survivor of cancer. It’s a mindset','Dave Pelzer');

var quote4 = new Randomquotes('Cancer may have started the fight, but I will finish it.','gotCancer.org');

var quote5 = new Randomquotes('You never know how strong you are until being strong is the only choice you have.','Cayla Mills');

function randomNumber(min,max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomQuotePicker() {
  return allQuotes[randomNumber(0,allQuotes.length - 1)];
}
