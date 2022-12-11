import express from "express";

import {adminTemplatesRouter} from "./templates";
import {adminUsersRouter} from "./users";

// eslint-disable-next-line
const router = express.Router();

router.use("/admin", [adminTemplatesRouter, adminUsersRouter]);

export {router as adminRouter};
