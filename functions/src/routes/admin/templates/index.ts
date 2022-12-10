import express from "express";

import {addTemplateRouter} from "./addTemplate";
import {editTemplateRouter} from "./editTemplate";

// eslint-disable-next-line
const router = express.Router();

router.use("/templates", [addTemplateRouter, editTemplateRouter]);

export {router as adminTemplatesRouter};
