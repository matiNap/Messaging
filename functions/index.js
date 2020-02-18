const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
const serviceAccount = require("./service_account.json");
const firebaseConfig = require("./firebase_config");

const createUser = require("./user/createUser.js");
const deleteUser = require("./user/deleteUser.js");
const signIn = require("./user/signIn.js");
const signOut = require("./user/signOut.js");
const checkAuth = require("./user/checkAuth");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://messaging-e1510.firebaseio.com"
});

firebase.initializeApp(firebaseConfig);

exports.createUser = functions.https.onRequest(createUser);
exports.deleteUser = functions.https.onRequest(deleteUser);
exports.signIn = functions.https.onRequest(signIn);
exports.signOut = functions.https.onRequest(signOut);
exports.checkAuth = functions.https.onRequest(checkAuth);
