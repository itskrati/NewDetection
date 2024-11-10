const natural = require('natural');

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

function preprocessText(text) {
  // Convert to lowercase
  text = text.toLowerCase();
  
  // Tokenize
  let tokens = tokenizer.tokenize(text);
  
  // Remove stopwords and stem remaining words
  tokens = tokens.filter(token => !natural.stopwords.includes(token));
  tokens = tokens.map(token => stemmer.stem(token));
  
  return tokens.join(' ');
}

module.exports = { preprocessText };