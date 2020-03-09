import admin = require("firebase-admin");
import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

const searchUserRequest = express();

const getState = (
  invitedByUser: boolean,
  invitedByMe: boolean,
  areFriends: boolean
) => {
  if (invitedByUser) {
    return "byUser";
  } else if (areFriends) {
    return "friends";
  } else if (invitedByMe) {
    return "byMe";
  } else return "none";
};

const searchUser = async (req: functions.Request, res: functions.Response) => {
  const { name, searchedBy, onlyFriends } = req.query;
  const searchForFriends = onlyFriends
    ? Boolean(Number.parseInt(onlyFriends))
    : false;
  const limit = req.query.limit ? Number.parseInt(req.query.limit) : 20;
  if (!name || !searchedBy) {
    return res.status(409).send("Pass name to search and searchedBy");
  }

  try {
    const snapshot = await admin
      .database()
      .ref(`/users`)
      .orderByChild("name")
      .startAt(`%${name}%`)
      .endAt(name + "\uf8ff")

      .limitToFirst(limit)
      .once("value");
    const result = snapshot.val();
    const friendRequestsSnapshot = await admin
      .database()
      .ref(`users/${searchedBy}/friendRequests`)
      .once("value");
    const ownFriendRequests = friendRequestsSnapshot.val();
    const searchedUsers = [];
    for (let [key] of Object.entries(result)) {
      if (key === searchedBy) continue;
      const {
        name,
        photoURL,
        displayName,
        friends,
        friendRequests,
        online
      } = result[key];

      const ivnitedByMe =
        friendRequests && friendRequests[searchedBy]
          ? friendRequests[searchedBy].sended
          : null;
      const invitedByUser =
        ownFriendRequests && ownFriendRequests[key]
          ? ownFriendRequests[key].sended
          : null;

      const areFriends =
        friends && friends[searchedBy] ? friends[searchedBy] : null;

      const friendData = {
        name,
        photoURL,
        displayName,
        uid: key,
        state: getState(invitedByUser, ivnitedByMe, areFriends)
      };
      if (searchForFriends && areFriends) {
        searchedUsers.push({ ...friendData, online });
      } else if (!searchForFriends) searchedUsers.push(friendData);
    }

    return res.send(searchedUsers);
  } catch (error) {
    return res.status(409).send(error);
  }
};

searchUserRequest.get("/", searchUser);

export default searchUserRequest;
