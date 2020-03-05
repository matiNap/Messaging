import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";

const getLastReaded = async (
  req: functions.Request,
  res: functions.Response
) => {
  const { userUid } = req.params;
  const { withUid } = req.query;

  if (!userUid || !withUid)
    return res.status(500).send("Pass userUid abnand withUid");

  try {
    const snapshot = await admin
      .database()
      .ref(`chat/${userUid}/toRead/${withUid}`)
      .once("value");

    const value = snapshot.val();
    return res.send(String(value));
  } catch (error) {
    return res.status(500).send(error);
  }
};

const setLastReaded = async (
  req: functions.Request,
  res: functions.Response
) => {
  const { userUid } = req.params;
  const { withUid } = req.query;

  if (!userUid || !withUid)
    return res.status(500).send("Pass userUid and withUid");
  const newValue = String(new Date().getTime());
  try {
    await admin
      .database()
      .ref(`chat/${userUid}/toRead/${withUid}`)
      .set(newValue);

    return res.send("Succes");
  } catch (error) {
    return res.sendStatus(500);
  }
};

const sendMessage = async (req: functions.Request, res: functions.Response) => {
  const { userUid } = req.params;
  const { withUid } = req.query;
  const { content } = req.body;

  if (!content || !userUid || !withUid) return res.sendStatus(500);

  try {
    const currentTime = new Date().getTime();
    const message = {
      text: content,
      createdAt: currentTime,
      _id: withUid
    };

    admin
      .database()
      .ref(`chat/${userUid}/messages/${withUid}`)
      .push(message);

    admin
      .database()
      .ref(`chat/${withUid}/messages/${userUid}`)
      .push(message);

    return res.send(message);
  } catch (error) {
    console.log(error);
    return res.status(409).send(error);
  }
};

const chat = express();

chat.post("/:userUid", sendMessage);
chat.get("/lastReaded/:userUid", getLastReaded);
chat.post("/lastReaded/:userUid", setLastReaded);

export default chat;
