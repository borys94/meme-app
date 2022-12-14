import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {FieldValue} from "firebase-admin/firestore";

// eslint-disable-next-line
const router = express.Router();

router.post("/:id/favourites", async function(req: Request, res: Response) {
  const {templateId} = req.body;

  const template = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId);
  const data = (await template.get()).data();

  await firebase.firestore.collection(COLLECTIONS.USERS).doc(req.currentUser!.id!).collection(COLLECTIONS.FAVOURITES).doc(templateId).set({
    ...data,
  });
  await template.update({
    likes: FieldValue.increment(1),
  });
  res.status(200).send({
    data: "",
  });
});

export {router as addFavouriteRouter};
