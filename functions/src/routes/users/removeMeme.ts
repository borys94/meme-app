import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {deletePublicFileByUrl} from "../../utils/deletePublicFile";
// eslint-disable-next-line
const router = express.Router();

router.delete("/:id/memes/:memeId", async function(req: Request, res: Response) {
  const {memeId} = req.params;

  const meme = firebase.firestore.collection(COLLECTIONS.USERS).doc(req.currentUser!.id!).collection(COLLECTIONS.MEMES).doc(memeId);
  const memeData = await (await meme.get()).data();
  if (!memeData) {
    throw new Error();
  }
  await meme.delete();
  await deletePublicFileByUrl(memeData.url);
  res.status(200).send({
    data: "",
  });
});

export {router as removeMemeRouter};
