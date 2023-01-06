import express, {Request, Response} from "express";

import {BadRequestError, NotAuthorizedError, NotFoundError} from "../../errors";
import {validateRequest} from "../../middlewares";
import {addFavouriteValidator} from "../../validators";
import queryService from "../../services/queryService";

// eslint-disable-next-line
const router = express.Router();

router.post("/:userId/favourites", validateRequest(addFavouriteValidator), async function(req: Request, res: Response) {
  const {templateId} = req.body;
  const {userId} = req.params;
  if (req.currentUser!.id !== userId) {
    throw new NotAuthorizedError();
  }
  if (await queryService.getUserFavourite(userId, templateId)) {
    throw new BadRequestError("You already like this template");
  }

  const template = await queryService.getTemplate(templateId);
  if (!template) {
    throw new NotFoundError("Template not found");
  }

  await queryService.addFavouriteToUser(userId, templateId);
  res.sendStatus(201);
});

export {router as addFavouriteRouter};
