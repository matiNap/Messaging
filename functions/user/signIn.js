const firebase = require("firebase");
const admin = require("firebase-admin");
const TokenGenerator = require("uuid-token-generator");

module.exports = function(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Pass password and email" });
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(userRecord => {
      const { displayName, uid, photoURL } = userRecord.user;
      const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
      admin
        .database()
        .ref(`users/${uid}`)
        .set({
          token: tokgen.generate()
        })
        .catch(error => {
          return res
            .status(422)
            .send({ error, message: "Cannot find user by uid" });
        });
      return res.status(200).send({ displayName, uid, photoURL });
    })
    .catch(err => {
      return res.status(401).send(err);
    });
};
