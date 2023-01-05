import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {deleteFile} from "../../services/storageService";
import {NotAuthorizedError, NotFoundError} from "../../errors";

// eslint-disable-next-line
const router = express.Router();

router.delete("/:id/memes/:memeId", async function(req: Request, res: Response) {
  if (req.currentUser!.id !== req.params.id) {
    throw new NotAuthorizedError();
  }
  const {memeId} = req.params;

  const meme = firebase.firestore.collection(COLLECTIONS.USERS).doc(req.currentUser!.id!)
      .collection(COLLECTIONS.MEMES).doc(memeId);
  const memeData = (await meme.get()).data();
  if (!memeData) {
    throw new NotFoundError("Meme not found");
  }
  await meme.delete();
  await deleteFile(memeData.url);
  res.sendStatus(200);
});

export {router as removeMemeRouter};
