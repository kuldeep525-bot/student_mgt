import express from "express";

import { authenticate } from "../middleware/jwt.middleware.js";
import { delBlocked } from "../middleware/block.middleware.js";

import {
  fakePurchase,
  downloadAnswer,
  downloadQuestionPdf,
  getPaper,
  getSinglePaper,
} from "../controllers/paper.controller.js";

const router = express.Router();

router.get("/getAllPaper", authenticate, delBlocked, getPaper);
router.get("/getPaper/:paperId", authenticate, delBlocked, getSinglePaper);
router.get("/dwnlQues/:paperId", authenticate, delBlocked, downloadQuestionPdf);
router.get("/dwnlAns/:paperId", authenticate, delBlocked, downloadAnswer);
router.post("/fakePurchase/:paperId", authenticate, delBlocked, fakePurchase);

export default router;
