import express, {Request, Response} from "express";
import {FieldValue} from "firebase-admin/firestore";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {NotAuthorizedError, NotFoundError} from "../../errors";
import {validateRequest} from "../../middlewares";
import {addFavouriteValidator} from "../../validators";

// eslint-disable-next-line
const router = express.Router();

router.post("/:id/favourites", validateRequest(addFavouriteValidator), async function(req: Request, res: Response) {
  if (req.currentUser!.id !== req.params.id) {
    throw new NotAuthorizedError();
  }
  const {templateId} = req.body;
  const template = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId);
  const data = (await template.get()).data();
  if (!data) {
    throw new NotFoundError("Template not found");
  }

  await firebase.firestore.collection(COLLECTIONS.USERS).doc(req.currentUser!.id!)
      .collection(COLLECTIONS.FAVOURITES).doc(templateId).set({
        ...data,
      });
  await template.update({
    likes: FieldValue.increment(1),
  });
  res.sendStatus(201);
});

export {router as addFavouriteRouter};
