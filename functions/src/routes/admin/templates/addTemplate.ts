import express, {Request, Response} from "express";
import crypto from "crypto";

import firebase from "../../../services/firebaseService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {TemplateModel} from "../../../../../shared/models/template";
import {base64ToBuffer} from "../../../utils/base64ToBuffer";
import {createPublicFile} from "../../../utils/createPublicFile";

// eslint-disable-next-line
const router = express.Router();

router.post("/", async function(req: Request, res: Response) {
  const {image, title, status} = req.body;

  const [buffer, ext] = base64ToBuffer(image);
  const path = `templates/${crypto.randomUUID()}.${ext}`;
  const url = await createPublicFile(buffer, path);
  // const url = "xxx"

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
