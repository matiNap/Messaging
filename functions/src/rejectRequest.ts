import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export default async (req: functions.Request, res: functions.Response) => {
  const { toUid, fromUid } = req.body;

  if (!toUid || !fromUid) {
    return res.status(409).send("Pass toUid and fromUid");
  }

  try {
    await admin
      .database()
      .ref(`users/${toUid}/friendRequests`)
      .update({ [fromUid]: null });

    return res.send("Rejected succesfuly");
  } catch (error) {
    return res.status(409).send(error);
  }
};
