import admin = require("firebase-admin");
import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

const searchUserRequest = express();

const searchUser = async (req: functions.Request, res: functions.Response) => {
  const { name } = req.query;
  const limit = req.query.limit ? Number.parseInt(req.query.limit) : 20;
  if (!name) {
    return res.status(409).send("Pass name to search");
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

    const searchedUsers = [];
    for (let [key] of Object.entries(result)) {
      const { name, photoURL, displayName } = result[key];
      searchedUsers.push({ name, photoURL, displayName, uid: key });
    }

    return res.send(searchedUsers);
  } catch (error) {
    return res.status(409).send(error);
  }
};

searchUserRequest.get("/", searchUser);

export default searchUserRequest;
