import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export default (req: functions.Request, res: functions.Response): any => {
  const { uid } = req.body;
  if (!uid) {
    res.status(422).send({ error: "Pass uid" });
  }

  admin
    .database()
    .ref(`users/${uid}`)
    .update({ token: null })
    .then(() => {
      return res.send("Signed out");
    })
    .catch(error => {
      res.status(409).send(error);
    });
};
