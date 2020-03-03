import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";

export const postStatus = async (
  req: functions.Request,
  res: functions.Response
) => {
  const { userUid } = req.params;
  const { newStatus } = req.query;
  if (!userUid) {
    return res.status(409).send("Pass userUid and newStatus");
  }
  try {
    admin
      .database()
      .ref(`users/${userUid}`)
      .update({
        online: Boolean(Number.parseInt(newStatus))
      });

    return res.send("Updated succesfully");
  } catch (error) {
    return res.status(409).send(error);
  }
};

const statusRequest = express();

statusRequest.post("/:userUid", postStatus);

export default statusRequest;
