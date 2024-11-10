const { trainModel } = require('./model');
const { preprocessText } = require('./preprocessor');

// Test cases for the model
const testData = [
  { text: "Scientists discover new planet in solar system", expected: "real" },
  { text: "Unicorns found living in Central Park", expected: "fake" },
  { text: "New traffic light installed at busy intersection", expected: "real" },
  { text: "Pizza found to grant immortality, scientists claim", expected: "fake" }
];

function runTests() {
  const trainingData = [
    { text: "Breaking: Scientists discover that chocolate cures all diseases!", label: "fake" },
    { text: "New study shows regular exercise improves heart health", label: "real" },
    { text: "Aliens spotted in local supermarket buying groceries", label: "fake" },
    { text: "Stock market closes higher amid economic recovery signs", label: "real" }
  ];

  const classifier = trainModel(trainingData);
  
  console.log("=== Running Tests ===\n");
  
  let correct = 0;
  testData.forEach(test => {
    const processedText = preprocessText(test.text);
    const result = classifier.classify(processedText);
    const success = result === test.expected;
    
    console.log(`Test: "${test.text}"`);
    console.log(`Expected: ${test.expected}`);
    console.log(`Got: ${result}`);
    console.log(`Status: ${success ? "✓ PASSED" : "✗ FAILED"}\n`);
    
    if (success) correct++;
  });
  
  const accuracy = (correct / testData.length) * 100;
  console.log(`Overall Accuracy: ${accuracy}%`);
}

runTests();