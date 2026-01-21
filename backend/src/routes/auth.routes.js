import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { registerValidations } from "../validations/auth.validators.js";
import { validate } from "../middleware/validate.middleware.js";
import jwt from "jsonwebtoken";
import passport from "passport";
const SecretKey = "studentMangement@_525";
const router = express.Router();

router.post("/register", registerValidations, validate, register);
router.post("/login", login);
router.post("/logout", logout);

//google auth

// Step 1: Redirect to Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Step 2: Google callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ userId: req.user._id }, SecretKey, {
      expiresIn: "7d",
    });

    res.redirect(`http://localhost:5500/login-success?token=${token}`);
  },
);

export default router;
