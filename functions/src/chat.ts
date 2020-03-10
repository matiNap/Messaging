import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as express from "express";
import * as TokenGenerator from "uuid-token-generator";
import axios from "axios";

const getReaded = async (req: functions.Request, res: functions.Response) => {
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

const setReaded = async (req: functions.Request, res: functions.Response) => {
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

    return res.send(newValue);
  } catch (error) {
    return res.sendStatus(500);
  }
};

const sendMessage = async (req: functions.Request, res: functions.Response) => {
  const { userUid } = req.params;
  const { withUid } = req.query;
  const { content } = req.body;

  if (!content || !userUid || !withUid)
    return res.status(409).send("Pass content, userUid and withUid");
  const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
  const messageId = tokgen.generate();
  try {
    const currentTime = new Date().getTime();
    const message = {
      text: content,
      createdAt: currentTime,
      _id: messageId,
      sendedBy: withUid
    };

    await admin
      .database()
      .ref(`chat/${withUid}/messages/${userUid}`)
      .push(message);

    await admin
      .database()
      .ref(`chat/${userUid}/messages/${withUid}`)
      .push(message);
    const nameSnapshot = await admin
      .database()
      .ref(`users/${userUid}/name`)
      .once("value");
    const deviceTokenSnapshot = await admin
      .database()
      .ref(`users/${userUid}/deviceToken`)
      .once("value");
    axios.post("https://exp.host/--/api/v2/push/send", {
      to: deviceTokenSnapshot.val(),
      title: nameSnapshot.val(),
      body: message.text
    });

    return res.send(message);
  } catch (error) {
    console.log(error);
    return res.status(409).send(error);
  }
};

const chat = express();

chat.post("/:userUid", sendMessage);
chat.post("/readMessage/:userUid", setReaded);
chat.get("/readMessage/:userUid", getReaded);

export default chat;
