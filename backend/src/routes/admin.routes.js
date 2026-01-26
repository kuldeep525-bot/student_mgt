import express from "express";
import {
  getAllUser,
  userBlocked,
  userRestor,
  userUnblocked,
} from "../controllers/admin.controller.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { authenticate } from "../middleware/jwt.middleware.js";
import { delBlocked } from "../middleware/block.middleware.js";

const router = express.Router();

router.get("/getAll", authenticate, adminOnly, getAllUser);
//blocked user

router.patch(
  "/users/:userId/block",
  authenticate,
  delBlocked,
  adminOnly,
  userBlocked,
);

router.patch(
  "/users/:userId/unblock",
  authenticate,
  delBlocked,
  adminOnly,
  userUnblocked,
);

router.patch("/users/:userId", authenticate, adminOnly, userRestor);

export default router;
