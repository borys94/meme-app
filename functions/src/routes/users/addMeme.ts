import express, {Request, Response} from "express";

import {createFile} from "../../services/storageService";
import {NotFoundError, NotAuthorizedError} from "../../errors";
import {validateRequest} from "../../middlewares";
import {addMemeValidator} from "../../validators";
import queryService from "../../services/queryService";

// eslint-disable-next-line
const router = express.Router();

router.post("/:userId/memes", validateRequest(addMemeValidator), async function(req: Request, res: Response) {
  const {image, templateId} = req.body;
  const {userId} = req.params;
  if (req.currentUser!.id !== userId) {
    throw new NotAuthorizedError();
  }

  const template = await queryService.getTemplate(templateId);
  if (!template) {
    throw new NotFoundError("Template not found");
  }
  const url = await createFile(image, "memes");
  const {id} = await queryService.addMemeToUser(userId, url, template.title);
  res.status(201).send({data: id});
});

export {router as addMemeRouter};
