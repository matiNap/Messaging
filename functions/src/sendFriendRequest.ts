import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export default (req: functions.Request, res: functions.Response) => {
  const { fromUid, toUid } = req.body;
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
