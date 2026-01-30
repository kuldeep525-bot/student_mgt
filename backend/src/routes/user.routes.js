import express from "express";
import {
  forgotPassword,
  login,
  logout,
  register,
  Userdelete,
} from "../controllers/user.controller.js";
import { registerValidations } from "../validations/auth.validators.js";
import { validate } from "../middleware/validate.middleware.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import { authenticate } from "../middleware/jwt.middleware.js";
import { delBlocked } from "../middleware/block.middleware.js";
const SecretKey = "studentMangement@_525";
const router = express.Router();

router.post("/register", registerValidations, validate, register);
router.post("/login", login);
router.post("/logout", logout);
router.delete("/user/delete", authenticate, delBlocked, Userdelete);
router.post("/forgot", forgotPassword);

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
      expiresIn: "1d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.redirect(`http://localhost:5500/frontend/pages/dashboard.html`);
  },
);

export default router;
