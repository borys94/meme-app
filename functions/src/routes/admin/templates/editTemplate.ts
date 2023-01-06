import express, {Request, Response} from "express";

import queryService from "../../../services/queryService";
import {validateRequest} from "../../../middlewares";
import {editTemplateValidator} from "../../../validators";
import {NotFoundError} from "../../../errors";

// eslint-disable-next-line
const router = express.Router();

router.put(
    "/:id",
    validateRequest(editTemplateValidator),
    async function(req: Request, res: Response) {
      const {title, status, texts} = req.body;
      const templateId = req.params.id;

      const template = await queryService.getTemplate(templateId);
      if (!template) {
        throw new NotFoundError("Template not found");
      }

      await queryService.updateTemplate(templateId, {title, texts, status});
      res.sendStatus(200);
    }
);

export {router as editTemplateRouter};
