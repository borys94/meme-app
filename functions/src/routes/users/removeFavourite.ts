import express, {Request, Response} from "express";

import {BadRequestError, NotAuthorizedError} from "../../errors";
import queryService from "../../services/queryService";

// eslint-disable-next-line
const router = express.Router();

router.delete("/:userId/favourites/:favouriteId", async function(req: Request, res: Response) {
  const {favouriteId, userId} = req.params;
  if (req.currentUser!.id !== userId) {
    throw new NotAuthorizedError();
  }

  const template = await queryService.getUserFavourite(userId, favouriteId);
  if (!template) {
    throw new BadRequestError("You cannot unlike");
  }

  await queryService.removeFavouriteFromUser(userId, favouriteId);
  res.sendStatus(200);
});

export {router as removeFavouriteRouter};
