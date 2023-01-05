import express from "express";

import {addFavouriteRouter} from "./addFavourite";
import {removeFavouriteRouter} from "./removeFavourite";
import {updateAvatarRouter} from "./updateAvatar";
import {addMemeRouter} from "./addMeme";
import {removeMemeRouter} from "./removeMeme";
import {requireAuth} from "../../middlewares";

// eslint-disable-next-line
const router = express.Router();

router.use(
    "/users",
    requireAuth,
    [
      removeFavouriteRouter,
      addFavouriteRouter,
      updateAvatarRouter,
      addMemeRouter,
      removeMemeRouter,
    ]
);

export {router as usersRouter};
