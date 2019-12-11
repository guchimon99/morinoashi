const fs = require('fs');
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

function buildQuestionImageURL(userID, questionID) {
  return `https://firebasestorage.googleapis.com/v0/b/morinoashi.appspot.com/o/${userID}%2F${questionID}.png?alt=media`
}

function buildAnswerImageURL(userID, questionID, answerID) {
  return `https://firebasestorage.googleapis.com/v0/b/morinoashi.appspot.com/o/${userID}%2F${questionID}%2F${answerID}.png?alt=media`
}

exports.question = functions.https.onRequest((req, res) => {
  const params = req.params[0].split("/")
  const userID = params[1]
  const questionID = params[3]
  const template = fs.readFileSync('./resources/index.html', {encoding: 'utf-8'})
  const image = buildQuestionImageURL(userID, questionID)
  const html = template
                  .replace(/https:\/\/morinoashi\.firebaseapp\.com\/ogp\.png/, image)
                  .replace("summary", "summary_large_image")
  res.status(200).send(html)
});

exports.answer = functions.https.onRequest((req, res) => {
  const params = req.params[0].split("/")
  const userID = params[1]
  const questionID = params[3]
  const answerID = params[5]
  const template = fs.readFileSync('./resources/index.html', {encoding: 'utf-8'})
  const image = buildAnswerImageURL(userID, questionID, answerID)
  const html = template
                .replace(/https:\/\/morinoashi\.firebaseapp\.com\/ogp\.png/, image)
                .replace("summary", "summary_large_image")
  res.status(200).send(html)
});