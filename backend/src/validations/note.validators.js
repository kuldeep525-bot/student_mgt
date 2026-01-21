import { body } from "express-validator";

export const notesValidations = [
  body("title").notEmpty().withMessage("title is required."),
  body("content")
    .notEmpty()
    .withMessage("Content is required.")
    .isEmail()
    .withMessage("Email is not valid."),
];
