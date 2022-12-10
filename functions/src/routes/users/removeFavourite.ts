import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";

// eslint-disable-next-line
const router = express.Router();

router.delete("/:id/favourites/:templateId", async function(req: Request, res: Response) {
  const {templateId} = req.params;
  console.log(templateId);

  await firebase.firestore.collection(COLLECTIONS.USERS).doc(req.currentUser!.uid).collection(COLLECTIONS.FAVOURITES).doc(templateId).delete();
  res.status(200).send({
    data: "",
  });
});

export {router as removeFavouriteRouter};
