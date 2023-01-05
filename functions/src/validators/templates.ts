import {body} from "express-validator";
import {TEMPLATE_STATUS} from "../../../shared/models/template";

export const addTemplateValidator = [
  body("status")
      .notEmpty()
      .isIn([TEMPLATE_STATUS.PUBLISHED, TEMPLATE_STATUS.UNPUBLISHED])
      .withMessage("status must be valid"),
  body("title")
      .notEmpty()
      .isString()
      .withMessage("title must be not empty string"),
  body("image")
      .notEmpty()
      .isString()
      .withMessage("image must be valid"),
];

export const editTemplateValidator = [
  body("status")
      .notEmpty()
      .isIn([TEMPLATE_STATUS.PUBLISHED, TEMPLATE_STATUS.UNPUBLISHED])
      .withMessage("status must be valid"),
  body("title")
      .notEmpty()
      .isString()
      .withMessage("title must be not empty string"),
  body("texts")
      .exists()
      .withMessage("texts must be valid"),
];
