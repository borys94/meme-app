import express, {Request, Response} from "express";

import {deleteFile} from "../../services/storageService";
import {NotAuthorizedError, NotFoundError} from "../../errors";
import queryService from "../../services/queryService";

// eslint-disable-next-line
const router = express.Router();

router.delete("/:userId/memes/:memeId", async function(req: Request, res: Response) {
  const {userId, memeId} = req.params;
  if (req.currentUser!.id !== userId) {
    throw new NotAuthorizedError();
  }

  const meme = await queryService.getUserMeme(userId, memeId);
  if (!meme) {
    throw new NotFoundError("Meme not found");
  }
  await queryService.removeMemeFromUser(userId, memeId);
  await deleteFile(meme.url);
  res.sendStatus(200);
});

export {router as removeMemeRouter};
