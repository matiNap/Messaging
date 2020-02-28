import admin = require("firebase-admin");
import * as functions from "firebase-functions";

export default async (
  req: functions.Request,
  res: functions.Response
): Promise<any> => {
  const { toUid } = req.body;

  if (!toUid) {
    return res.status(409).send("Pass toId");
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
