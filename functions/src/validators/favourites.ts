import {body} from "express-validator";

export const addFavouriteValidator = [
  body("templateId")
      .notEmpty()
      .isString()
      .withMessage("templateId must be valid"),
];
