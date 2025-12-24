import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { registerValidations } from "../validations/auth.validators.js";
import { validate } from "../middleware/validate.middleware.js";

const router = express.Router();

router.post("/register", registerValidations, validate, register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
