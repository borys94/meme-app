import express, {Request, Response} from "express";
import crypto from "crypto";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {base64ToBuffer} from "../../utils/base64ToBuffer";
import {createPublicFile} from "../../utils/createPublicFile";
import {deletePublicFile} from "../../utils/deletePublicFile";
import {UserModel} from "../../../../shared/models/user";
import {NotAuthorizedError} from "../../errors";

// eslint-disable-next-line
const router = express.Router();

router.put("/:id/avatar", async function(req: Request, res: Response) {
  if (req.params.id !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  const [buffer, ext] = base64ToBuffer(req.body.image);
  const avatarId = `avatars/${crypto.randomUUID()}.${ext}`;
  const url = await createPublicFile(buffer, avatarId);
  if (req.currentUser!.avatar) {
    await deletePublicFile(req.currentUser!.avatar.id);
  }

  const updatedValues: Partial<UserModel> = {
    avatar: {
      url,
      id: avatarId,
    },
  };

  await firebase.firestore.collection(COLLECTIONS.USERS).doc(req.params.id).update(updatedValues);

  res.status(200).send({
    data: "",
  });
});

export {router as updateAvatarRouter};
