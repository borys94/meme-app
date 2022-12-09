import express, {Request, Response} from "express";

import firebase from "../../../services/firebaseService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {TemplateModel} from "../../../../../shared/models/template";

// eslint-disable-next-line
const router = express.Router();

router.post("/", async function(req: Request, res: Response) {
  const {image, title, status} = req.body;

  const base64EncodedImageString = image.replace(/^data:image\/\w+;base64,/, "");
  const imageBuffer = Buffer.from(base64EncodedImageString, "base64");
  const ext = image.substring("data:image/".length, image.indexOf(";base64"));
  const file = firebase.storage.bucket().file(`templates/${title}.${ext}`);
  await file.save(imageBuffer);
  await file.makePublic();
  const url = file.publicUrl();

  const template: Omit<TemplateModel, "uid"> = {
    title,
    url,
    status,
    createdAt: Date.now(),
  }
  await firebase.firestore.collection(COLLECTIONS.TEMPLATES).add(template);
  res.status(200).send({
    data: "",
  });
});

export {router as addTemplateRouter};
