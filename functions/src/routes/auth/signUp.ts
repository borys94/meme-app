import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";

import {FirebaseAuthError} from "../../errors";
import {USER_ROLES} from "../../../../shared/models/user";

// eslint-disable-next-line
const router = express.Router();

router.post("/signUp", async function(req: Request, res: Response) {
  const {email, password} = req.body;

  let user;
  try {
    user = await firebase.auth.createUser({
      email,
      password,
    });
  } catch (e) {
    throw new FirebaseAuthError(e);
  }

  await firebase.firestore.collection(COLLECTIONS.USERS).doc(user.uid).set({
    email,
    uid: user.uid,
    createdAt: Date.now(),
    role: USER_ROLES.USER,
  });

  res.status(200).send({
    data: user.uid,
  });
});

export {router as signUpRouter};
