import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {createFile} from "../../services/storageService";
import {MemeModel} from "../../../../shared/models/meme";
import {NotFoundError, NotAuthorizedError} from "../../errors";
import {validateRequest} from "../../middlewares";
import {addMemeValidator} from "../../validators";

// eslint-disable-next-line
const router = express.Router();

router.post("/:id/memes", validateRequest(addMemeValidator), async function(req: Request, res: Response) {
  const {image, templateId} = req.body;
  if (req.currentUser!.id !== req.params.id) {
    throw new NotAuthorizedError();
  }
  const templateRef = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(templateId);
  const template = (await templateRef.get()).data();
  if (!template) {
    throw new NotFoundError("Template not found");
  }
  const url = await createFile(image, "memes");
  const meme: MemeModel = {
    title: template.title,
    createdAt: Date.now(),
    url,
  };
  await firebase.firestore.collection(COLLECTIONS.USERS).doc(req.currentUser!.id!)
      .collection(COLLECTIONS.MEMES).add({
        ...meme,
      });
  res.sendStatus(201);
});

export {router as addMemeRouter};
