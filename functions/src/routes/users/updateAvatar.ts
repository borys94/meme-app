import express, {Request, Response} from "express";

import firebase from "../../services/firebaseService";
import {COLLECTIONS} from "../../../../shared/models/collections";
import {createFile, deleteFile} from "../../services/storageService";
import {UserModel} from "../../../../shared/models/user";
import {NotAuthorizedError} from "../../errors";

// eslint-disable-next-line
const router = express.Router();

router.put("/:id/avatar", async function(req: Request, res: Response) {
  if (req.params.id !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  const avatar = await createFile(req.body.image, "avatars");
  if (req.currentUser!.avatar) {
    await deleteFile(req.currentUser!.avatar);
  }

  const updatedValues: Partial<UserModel> = {
    avatar,
  };

  await firebase.firestore.collection(COLLECTIONS.USERS).doc(req.params.id).update(updatedValues);

  res.status(200).send({
    data: "",
  });
});

export {router as updateAvatarRouter};
