import express from "express";
import {
  analyticsDashboard,
  createPaper,
  getAllUser,
  userBlocked,
  userRestor,
  userUnblocked,
} from "../controllers/admin.controller.js";
import { adminOnly } from "../middleware/admin.middleware.js";
import { authenticate } from "../middleware/jwt.middleware.js";
import { delBlocked } from "../middleware/block.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

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
router.get("/analytical", authenticate, adminOnly, analyticsDashboard);

router.post(
  "/create",
  authenticate,
  adminOnly,
  upload.fields([
    { name: "questionPdf", maxCount: 1 },
    { name: "answerPdf", maxCount: 1 },
  ]),
  createPaper,
);

export default router;
