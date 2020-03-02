import * as firebase from "firebase";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import * as TokenGenerator from "uuid-token-generator";

export default (req: functions.Request, res: functions.Response): any => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Pass password and email" });
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userRecord: any) => {
      const { displayName, uid, photoURL } = userRecord.user;
      const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
      const ref = admin.database().ref(`users/${uid}`);

      ref
        .update({
          token: tokgen.generate()
        })
        .catch(error => {
          return res
            .status(422)
            .send({ error, message: "Cannot find user by uid" });
        });
      return ref.on("value", (snapshot: any) => {
        const { fname, sname, name } = snapshot.val();
        return res.status(200).send({
          displayName,
          uid,
          photoURL,
          email,
          fname,
          sname,
          name
        });
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).send(err);
    });
};
