const admin = require("firebase-admin");
const TokenGenerator = require("uuid-token-generator");

module.exports = function(req, res) {
  if (!req.body.password || !req.body.email || !req.body.username) {
    return res.status(422).send({ error: "Pass email,username and password" });
  }
  admin
    .auth()
    .createUser({
      password: req.body.password,
      displayName: req.body.username,
      email: req.body.email,
      fName: req.body.fname,
      sname: req.body.sname,
      disabled: false
    })
    .then(userRecord => {
      const { uid } = userRecord;
      const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
      admin
        .database()
        .ref(`users/${uid}`)
        .set({
          token: tokgen.generate()
        })
        .catch(error => {
          return res
            .status(404)
            .send({ error, message: "Cannot find user by uid" });
        });
      return res.send({ uid });
    })
    .catch(err => {
      return res.error(err);
    });
};
