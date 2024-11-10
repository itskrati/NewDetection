const natural = require('natural');

function trainModel(trainingData) {
  const classifier = new natural.BayesClassifier();

  trainingData.forEach(item => {
    classifier.addDocument(item.text, item.label);
  });

  classifier.train();
  return classifier;
}

module.exports = { trainModel };