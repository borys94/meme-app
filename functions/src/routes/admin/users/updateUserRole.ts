import express, {Request, Response} from "express";

import firebase from "../../../services/firebaseService";
import {validateRequest} from "../../../middlewares";
import {editUserValidator} from "../../../validators";
import queryService from "../../../services/queryService";

// eslint-disable-next-line
const router = express.Router();

router.put("/:userId", validateRequest(editUserValidator), async function(req: Request, res: Response) {
  const {role} = req.body;
  const {userId} = req.params;

  await firebase.auth.setCustomUserClaims(userId, {
    role,
  });
  await queryService.updateUser(userId, {role});
  res.sendStatus(200);
});

export {router as updateUserRoleRouter};
