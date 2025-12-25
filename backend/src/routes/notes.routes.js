import express from "express";
import {
  createNotes,
  DeleteNotes,
  GetAllNOTES,
  GetNOTES,
  UpdateNotes,
} from "../controllers/notes.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authenticate, createNotes);
router.get("/getnotes/:noteId", authenticate, GetNOTES);
router.get("/getallnotes", authenticate, GetAllNOTES);
router.delete("/deletnote/:noteId", authenticate, DeleteNotes);
router.put("/update/:noteId", authenticate, UpdateNotes);
export default router;
