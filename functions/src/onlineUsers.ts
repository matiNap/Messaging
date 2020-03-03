import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";

const getOnlineUsers = async (
  req: functions.Request,
  res: functions.Response
) => {
  const { userUid } = req.params;
  if (!userUid) {
    return res.status(409).send("Pass userUid");
  }

  try {
    const userFriends = await admin
      .database()
      .ref(`users/${userUid}/friends`)
      .once("value");
    const friendsList = Object.keys(userFriends.val());
    const friendsData = [];

    for (const friendUid of friendsList) {
      const friendRecord = await admin
        .database()
        .ref(`users/${friendUid}`)
        .once("value");
      const { name, photoURL, online } = friendRecord.val();

      if (online) friendsData.push({ name, photoURL, online, uid: friendUid });
    }
    return res.send(friendsData);
  } catch (error) {
    return res.status(409).send(error);
  }
};

const onlineUsersRequest = express();

onlineUsersRequest.get("/:userUid", getOnlineUsers);

export default onlineUsersRequest;
