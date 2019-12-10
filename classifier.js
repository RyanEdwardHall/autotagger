const natural = require('natural');
const classifier = new natural.BayesClassifier();

class Store {
    constructor() {
        this.data = {
            'orgID1234': null
        }
    }
    fetch(id) {
        try {
            return natural.BayesClassifier.restore(JSON.parse(this.data[id]))
        } catch(e) {
            throw new Error('No classifier exists for this org');
        }
    }
    store(id, classifier) {
        this.data[id] = JSON.stringify(classifier);
    }
}

const db = new Store();

const trainingData = [
    {text: 'make it work on iphone', idea: 'tech'},
    {text: 'website does not work well with mobile', idea: 'tech'},
    {text: 'your cashier is rude', idea: 'people'},
    {text: 'spotted employee sleeping on the job', idea: 'people'},
    {text: 'website improvements would help my phone', idea: 'tech'},
    {text: 'machine is constantly broken', idea: 'atm'},
];

// var testData = [
//     {text: 'Your website is slow on my iphone'},
// ];

trainingData.forEach(function(item){
    classifier.addDocument(item.text, item.idea);
});

classifier.train();
db.store('orgID1234', classifier);

// testData.forEach(function(item){
    // var ideaGuess = classifier.classify(item.text);
    // console.log(item.text);
    // console.log("Suggested idea:", ideaGuess);
    // console.log(classifier.getClassifications(item.text));
// });

module.exports = db;
