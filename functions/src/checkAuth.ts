import * as admin from "firebase-admin";
import * as TokenGenerator from "uuid-token-generator";
import * as functions from "firebase-functions";

export default (req: functions.Request, res: functions.Response) => {
  const { uid, token } = req.body;
  if (!token || !uid) {
    return res.status(422).send("Pass token and uid");
  }

  const ref = admin.database().ref(`users/${uid}`);
  return ref.on("value", (snapshot: admin.database.DataSnapshot) => {
    ref.off();
    const databaseToken = snapshot.val().token;
    const { fname, sname, name } = snapshot.val();

    if (token === databaseToken) {
      const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
      const newToken = tokgen.generate();
      ref
        .update({ token: newToken })
        .catch(error => res.status(422).send(error));
      admin
        .auth()
        .getUser(uid)
        .then(userRecord => {
          const { email, displayName } = userRecord;
          return res
            .status(200)
            .send({ newToken, fname, sname, name, email, displayName });
        })
        .catch(err => {
          return res.status(409).send(err);
        });
    } else {
      return res.status(409).send("Invalid token");
    }
  });
};
