import express, {Request, Response} from "express";

import firebase from "../../../services/firebaseService";
import {createFile} from "../../../services/storageService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {TemplateModel} from "../../../../../shared/models/template";

// eslint-disable-next-line
const router = express.Router();

router.post("/", async function(req: Request, res: Response) {
  const {image, title, status} = req.body;
  const url = await createFile(image, "templates");

  const template: Omit<TemplateModel, "id"> = {
    title,
    url,
    status,
    likes: 0,
    texts: [],
    createdAt: Date.now(),
  };
  const {id} = await firebase.firestore.collection(COLLECTIONS.TEMPLATES).add(template);
  res.status(200).send({
    data: id,
  });
});

export {router as addTemplateRouter};
