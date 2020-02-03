const functions = require("firebase-functions");
const admin = require("firebase-admin");
const serviceAccount = require("./service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://messaging-e1510.firebaseio.com"
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
