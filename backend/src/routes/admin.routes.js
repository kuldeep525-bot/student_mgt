import express from "express";
import {
  analyticsDashboard,
  approveUpiPayment,
  createPaper,
  deletePaper,
  getAllUser,
  hardDeletePaper,
  RestorePaper,
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
  "/paper/create",
  authenticate,
  adminOnly,
  upload.fields([
    { name: "questionPdf", maxCount: 1 },
    { name: "answerPdf", maxCount: 1 },
  ]),
  createPaper,
);

router.patch("/paper/delete/:paperId", authenticate, adminOnly, deletePaper);
router.patch(
  "/paper/restorePaper/:paperId",
  authenticate,
  adminOnly,
  RestorePaper,
);
router.delete(
  "/paper/harddelete/:paperId",
  authenticate,
  adminOnly,
  hardDeletePaper,
);
router.post("/paper/approvUpi", authenticate, adminOnly, approveUpiPayment);

export default router;
