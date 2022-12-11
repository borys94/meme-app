import express, {Request, Response} from "express";

import firebase from "../../../services/firebaseService";
import {COLLECTIONS} from "../../../../../shared/models/collections";

// eslint-disable-next-line
const router = express.Router();

router.put("/:id", async function(req: Request, res: Response) {
  const {role} = req.body;
  const id = req.params.id;

  await firebase.auth.setCustomUserClaims(id, {
    role,
  });
  await firebase.firestore.collection(COLLECTIONS.USERS).doc(id).update({
    role,
  });
  res.status(200).send({
    data: id,
  });
});

export {router as updateUserRoleRouter};
