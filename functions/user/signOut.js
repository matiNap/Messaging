const admin = require("firebase-admin");

module.exports = function(req, res) {
  const { uid } = req.body;
  if (!uid) {
    return res.status(422).send({ error: "Pass uid" });
  }

  admin
    .database()
    .ref(`users/${uid}`)
    .set({ token: null })
    .catch(error => {
      return res.status(422).send(error);
    });
};
