import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";

const postDeviceToken = (req: functions.Request, res: functions.Response) => {
  const { userUid } = req.params;
  const { token } = req.query;

  if (!token || !userUid) return res.status(409).send("Pass token and userUid");

  admin
    .database()
    .ref(`users/${userUid}`)
    .update({ deviceToken: token });
};

const deviceTokenRequest = express();

deviceTokenRequest.post("/:userUid", postDeviceToken);

export default deviceTokenRequest;
