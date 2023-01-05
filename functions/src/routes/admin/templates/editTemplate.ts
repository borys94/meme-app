import express, {Request, Response} from "express";

import firebase from "../../../services/firebaseService";
import {COLLECTIONS} from "../../../../../shared/models/collections";
import {validateRequest} from "../../../middlewares";
import {editTemplateValidator} from "../../../validators";

// eslint-disable-next-line
const router = express.Router();

router.put("/:id", validateRequest(editTemplateValidator), async function(req: Request, res: Response) {
  const {title, status, texts} = req.body;
  const id = req.params.id;

  await firebase.firestore.collection(COLLECTIONS.TEMPLATES).doc(id).update({
    title,
    texts,
    status,
  });
  res.status(200).send({
    data: "",
  });
});

export {router as editTemplateRouter};
