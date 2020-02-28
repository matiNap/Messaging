import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export default async function(
  req: functions.Request,
  res: functions.Response
): Promise<any> {
  const { toUid, fromUid } = req.body;

  if (!toUid || !fromUid) {
    return res.status(409).send("Pass toUid and fromUid");
  }

  try {
    await admin
      .database()
      .ref(`users/${toUid}/friendRequests`)
      .update({ [fromUid]: null });

    await admin
      .database()
      .ref(`users/${toUid}/friends`)
      .update({ [fromUid]: true });

    res.send("Accepted succesfuly");
  } catch (error) {
    res.status(409).send(error);
  }
}
