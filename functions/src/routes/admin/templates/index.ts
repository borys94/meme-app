import express from "express";

import { addTemplateRouter } from "./addTemplate";
import { editTemplateRouter } from "./editTemplate";

const router = express.Router();

router.use("/templates", [addTemplateRouter, editTemplateRouter]);

export { router as adminTemplatesRouter };
