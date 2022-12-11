import express from "express";

import {updateUserRoleRouter} from "./updateUserRole";

// eslint-disable-next-line
const router = express.Router();

router.use("/users", [updateUserRoleRouter]);

export {router as adminUsersRouter};
