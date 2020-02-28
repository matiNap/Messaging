import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
const TokenGenerator = require("uuid-token-generator");

export default (req: functions.Request, res: functions.Response) => {
  const { fname, sname, email, password, username } = req.body;
  if (!password || !email || !username || !fname || !sname) {
    return res
      .status(422)
      .send({ error: "Pass email,username, fname, sname and password" });
  }

  return admin
    .auth()
    .createUser({
      password: password,
      displayName: username,
      email: email,

      disabled: false
    })
    .then((userRecord: admin.auth.UserRecord) => {
      const { uid } = userRecord;
      const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
      admin
        .database()
        .ref(`users/${uid}`)
        .set({
          token: tokgen.generate(),
          fName: fname,
          sname: sname,
          name: `${fname} ${sname}`
        })
        .catch(error => {
          return res
            .status(404)
            .send({ error, message: "Cannot find user by uid" });
        });
      return res.send({ uid });
    })
    .catch(err => {
      return res.status(422).send(err);
    });
};
