import express from "express";

import {addFavouriteRouter} from "./addFavourite";
import {removeFavouriteRouter} from "./removeFavourite";
import {updateAvatarRouter} from "./updateAvatar";

// eslint-disable-next-line
const router = express.Router();

router.use("/users", [removeFavouriteRouter, addFavouriteRouter, updateAvatarRouter]);

export {router as usersRouter};
