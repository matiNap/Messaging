import admin = require("firebase-admin");
import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";

const postFriendRequest = (req: functions.Request, res: functions.Response) => {
  const { toUid } = req.params;
  const { fromUid } = req.query;

  if (!fromUid || !toUid) {
    res.status(409).send("Pass fromUid and toUid");
  }

  const ref = admin.database().ref(`users/${toUid}/friendRequests`);
  ref
    .update({
      [fromUid]: {
        sended: true
      }
    })
    .then(() => {
      return res.send("Friend has been added");
    })
    .catch(error => {
      return res.status(409).send(error);
    });
};

const getFriendRequest = async (
  req: functions.Request,
  res: functions.Response
): Promise<any> => {
  const { toUid } = req.params;

  if (!toUid) {
    return res.status(409).send("Pass toUid");
  }

  try {
    admin
      .database()
      .ref(`users/${toUid}/friendRequests`)
      .on("value", async (snapshot: any) => {
        const friendRequests = snapshot.val();
        const sendedBy: Array<any> = [];
        for (let [key] of Object.entries(friendRequests)) {
          const userData = await admin
            .database()
            .ref(`users/${key}`)
            .once("value");
          const userRecord = await admin.auth().getUser(key);
          const data = userData.val();
          sendedBy.push({
            name: data.name,
            uid: key,
            photoURL: userRecord.photoURL
          });
        }

        return res.send(sendedBy);
      });
  } catch (error) {
    return res.status(409).send(error);
  }
};

const friendRequest = express();

// friendRequest.use(cors({ origin: true }));

friendRequest.get("/:toUid", getFriendRequest);
friendRequest.post("/:toUid", postFriendRequest);

export default friendRequest;
