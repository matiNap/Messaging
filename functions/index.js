import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
const firebase = require("firebase");
import serviceAccount from "../service_account.json";
import firebaseConfig from "../firebase_config";

import createUserFunction from "./createUser";
import deleteUserFunction from "./deleteUser";
import signInFunction from "./signIn";
import signOutFunction from "./signOut";
import checkAuthFunction from "./checkAuth";
import sendFriendRequestFunction from "./sendFriendRequest";
import listenFriendRequestsFunction from "./listenFriendRequests";
import acceptRequestFunction from "./acceptRequest";
import rejectRequestFunction from "./rejectRequest";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://messaging-e1510.firebaseio.com"
});

firebase.initializeApp(firebaseConfig);

export const createUser = functions.https.onRequest(createUserFunction);
export const deleteUser = functions.https.onRequest(deleteUserFunction);
export const signIn = functions.https.onRequest(signInFunction);
export const signOut = functions.https.onRequest(signOutFunction);
export const checkAuth = functions.https.onRequest(checkAuthFunction);
export const sendFriendRequest = functions.https.onRequest(
  sendFriendRequestFunction
);
export const listenFriendRequests = functions.https.onRequest(
  listenFriendRequestsFunction
);
export const acceptRequest = functions.https.onRequest(acceptRequestFunction);
export const rejectRequest = functions.https.onRequest(rejectRequestFunction);
