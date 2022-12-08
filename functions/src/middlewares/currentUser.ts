import {NextFunction, Request, Response} from "express";

import firebase from "../services/firebaseService";
import firestoreService from "../services/firestoreService";
import {COLLECTIONS} from "../../../shared/models/collections";
import {UserModel} from "../../../shared/models/user";

declare global {
  // eslint-disable-next-line
  namespace Express {
    interface Request {
      currentUser?: UserModel | null
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;

  if (token) {
    const {uid} = await firebase.auth.verifyIdToken(token, true);
    const userSnap = await firebase.firestore.collection(COLLECTIONS.USERS).doc(uid).get();
    const user = firestoreService.getDocWithID<UserModel>(userSnap);
    req.currentUser = user;
  } else {
    req.currentUser = null;
  }

  next();
};
