import express, {Request, Response} from "express";

import queryService from "../../../services/queryService";
import {createFile} from "../../../services/storageService";
import {validateRequest} from "../../../middlewares";
import {addTemplateValidator} from "../../../validators";

// eslint-disable-next-line
const router = express.Router();

router.post(
    "/",
    validateRequest(addTemplateValidator),
    async function(req: Request, res: Response) {
      const {image, title, status} = req.body;
      const url = await createFile(image, "templates");
      const {id} = await queryService.addTemplate(title, url, status);

      res.status(201).send({
        data: id,
      });
    }
);

export {router as addTemplateRouter};
