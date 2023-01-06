import express, {Request, Response} from "express";

import {createFile, deleteFile} from "../../services/storageService";
import {NotAuthorizedError} from "../../errors";
import queryService from "../../services/queryService";

// eslint-disable-next-line
const router = express.Router();

router.put("/:userId/avatar", async function(req: Request, res: Response) {
  const {userId} = req.params;
  if (userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }
  const avatar = await createFile(req.body.image, "avatars");
  if (req.currentUser!.avatar) {
    await deleteFile(req.currentUser!.avatar);
  }

  await queryService.updateUser(userId, {avatar});
  res.sendStatus(200);
});

export {router as updateAvatarRouter};
