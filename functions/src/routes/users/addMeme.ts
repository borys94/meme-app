import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {createFile} from "../../services/storageService";
import {TemplateModel} from "../../../../shared/models/template";
import {MemeModel} from "../../../../shared/models/meme";
import firestoreService from "../../services/firestoreService";

// eslint-disable-next-line
const router = express.Router();

router.post("/:id/memes", async function(req: Request, res: Response) {
  const {image, templateId} = req.body;
  const url = await createFile(image, "memes");

  const templateSnap = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId).get();
  const template = firestoreService.getDocWithID<TemplateModel>(templateSnap);
  const meme: MemeModel = {
    title: template.title,
    createdAt: Date.now(),
    url,
  };
  await firebase.firestore.collection(COLLECTIONS.USERS).doc(req.currentUser!.id!).collection(COLLECTIONS.MEMES).add({
    ...meme,
  });
  res.status(200).send({
    data: "",
  });
});

export {router as addMemeRouter};
