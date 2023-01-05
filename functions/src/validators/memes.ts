import {body} from "express-validator";

export const addMemeValidator = [
  body("image")
      .notEmpty()
      .isString()
      .withMessage("image must be valid"),
  body("templateId")
      .notEmpty()
      .isString()
      .withMessage("templateId must be valid"),
];
