import express from "express";

import {addFavouriteRouter} from "./addFavourite";
import {removeFavouriteRouter} from "./removeFavourite";

// eslint-disable-next-line
const router = express.Router();

router.use("/users", [removeFavouriteRouter, addFavouriteRouter]);

export {router as usersRouter};
