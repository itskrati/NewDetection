const readline = require('readline');
const { trainModel } = require('./model');
const { preprocessText } = require('./preprocessor');
const { trainingData } = require('./data');
const { fetchLatestNews } = require('./newsApi');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Train the model
console.log('Training the model...');
const classifier = trainModel(trainingData);
console.log('Model training complete!\n');

function detectFakeNews(text) {
  const processedText = preprocessText(text);
  const classification = classifier.classify(processedText);
  const probability = classifier.getClassifications(processedText);
  
  return {
    text,
    classification,
    confidence: Math.round(probability[0].value * 100)
  };
}

async function showLatestNews() {
  console.log('\nFetching latest news...');
  const articles = await fetchLatestNews();
  
  if (articles.length === 0) {
    console.log('No news articles available at the moment.');
    return;
  }

  console.log('\n=== Latest News Analysis ===');
  articles.slice(0, 5).forEach((article, index) => {
    const result = detectFakeNews(article.title);
    console.log(`\n${index + 1}. ${article.title}`);
    console.log(`Source: ${article.source.name}`);
    console.log(`Classification: ${result.classification.toUpperCase()}`);
    console.log(`Confidence: ${result.confidence}%`);
    console.log(`URL: ${article.url}`);
  });
}

function showMenu() {
  console.log('\n=== Fake News Detection System ===');
  console.log('1. Check a news headline');
  console.log('2. Show latest news with analysis');
  console.log('3. Exit');
  
  rl.question('\nSelect an option (1-3): ', async (answer) => {
    switch(answer) {
      case '1':
        rl.question('\nEnter a news headline to check: ', (text) => {
          const result = detectFakeNews(text);
          console.log('\n=== Analysis Result ===');
          console.log(`Text: ${result.text}`);
          console.log(`Classification: ${result.classification.toUpperCase()}`);
          console.log(`Confidence: ${result.confidence}%`);
          showMenu();
        });
        break;
      case '2':
        await showLatestNews();
        showMenu();
        break;
      case '3':
        console.log('\nThank you for using the Fake News Detector!');
        rl.close();
        break;
      default:
        console.log('\nInvalid option. Please try again.');
        showMenu();
    }
  });
}

// Start the application
showMenu();