import express from "express";

import {signUpRouter} from "./signUp";

// eslint-disable-next-line
const router = express.Router();

router.use("/auth", [signUpRouter]);

export {router as authRouter};


