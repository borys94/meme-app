import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {FieldValue} from "firebase-admin/firestore";
import {NotAuthorizedError} from "../../errors";

// eslint-disable-next-line
const router = express.Router();

router.delete("/:id/favourites/:templateId", async function(req: Request, res: Response) {
  if (req.currentUser!.id !== req.params.id) {
    throw new NotAuthorizedError();
  }
  const {templateId} = req.params;

  await firebase.firestore.collection(COLLECTIONS.USERS).doc(req.currentUser!.id!)
      .collection(COLLECTIONS.FAVOURITES).doc(templateId).delete();
  await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId).update({
    likes: FieldValue.increment(-1),
  });
  res.status(200).send({
    data: "",
  });
});

export {router as removeFavouriteRouter};
