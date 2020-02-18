const admin = require("firebase-admin");
const TokenGenerator = require("uuid-token-generator");

module.exports = function(req, res) {
  const { uid, token } = req.body;
  if (!token || !uid) {
    return res.status(422).send("Pass token and uid");
  }

  const ref = admin.database().ref(`users/${uid}`);
  ref.on("value", snapshot => {
    ref.off();
    const databaseToken = snapshot.val().token;
    if (token === databaseToken) {
      const tokgen = new TokenGenerator(256, TokenGenerator.BASE62);
      const newToken = tokgen.generate();
      ref.set({ token: newToken }).catch(error => res.status(422).send(error));

      return res.status(200).send({ newToken });
    } else {
      return res.error("Invalid token");
    }
  });
};
