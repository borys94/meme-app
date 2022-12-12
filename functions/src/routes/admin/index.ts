import express from "express";

import {adminTemplatesRouter} from "./templates";
import {adminUsersRouter} from "./users";
import {requireAdmin, requireAuth} from "../../middlewares";
// eslint-disable-next-line
const router = express.Router();

router.use("/admin", requireAuth, requireAdmin, [adminTemplatesRouter, adminUsersRouter]);

export {router as adminRouter};
