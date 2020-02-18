const admin = require("firebase-admin");

module.exports = function(req, res) {
  if (!req.body.userToken || !req.body.id) {
    res.status(422).send("Pass id and user token");
  }
  admin
    .auth()
    .deleteUser(req.body.id)
    .then(() => res.send({ deleted: true }))
    .catch(err => {
      return res.error(err);
    });
};
