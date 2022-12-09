import {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";

export const updateUser = async (req: Request, res: Response) => {
  const {role} = req.body;
  const uid = req.params.uid;

  await firebase.auth.setCustomUserClaims(uid, {
    role,
  });
  await firebase.firestore.collection(COLLECTIONS.USERS).doc(uid).update({
    role,
  });
  res.status(200).send({
    data: uid,
  });
};
