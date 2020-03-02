import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export default (req: functions.Request, res: functions.Response) => {
  if (!req.body.userToken || !req.body.id) {
    res.status(422).send("Pass id and user token");
  }
  admin
    .auth()
    .deleteUser(req.body.id)
    .then(() => res.send({ deleted: true }))
    .catch(err => {
      return res.status(409).send(err);
    });
};
