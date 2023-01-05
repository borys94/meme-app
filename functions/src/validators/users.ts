import {body} from "express-validator";
import {USER_ROLES} from "../../../shared/models/user";

export const editUserValidator = [
  body("role")
      .notEmpty()
      .isIn([USER_ROLES.USER, USER_ROLES.ADMIN])
      .withMessage("role must be valid"),
];
