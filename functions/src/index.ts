import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as firebase from "firebase";
import serviceAccount from "../service_account";
import firebaseConfig from "../firebase_config";

import createUserFunction from "./createUser";
import deleteUserFunction from "./deleteUser";
import signInFunction from "./signIn";
import signOutFunction from "./signOut";
import checkAuthFunction from "./checkAuth";
import acceptRequestFunction from "./acceptRequest";
import rejectRequestFunction from "./rejectRequest";
import friendRequestRequest from "./friendRequest";
import searchUserRequest from "./searchUser";

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
//FriendRequests
export const friendRequest = functions.https.onRequest(friendRequestRequest);
export const acceptRequest = functions.https.onRequest(acceptRequestFunction);
export const rejectRequest = functions.https.onRequest(rejectRequestFunction);

//SerchUser
export const searchUser = functions.https.onRequest(searchUserRequest);
