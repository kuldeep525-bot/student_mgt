import express from "express";
import {
  createNotes,
  DeleteNotes,
  GetAllNOTES,
  GetNOTES,
  UpdateNotes,
} from "../controllers/notes.controller.js";
import { authenticate } from "../middleware/jwt.middleware.js";
import { notesValidations } from "../validations/note.validators.js";
import { delBlocked } from "../middleware/block.middleware.js";

const router = express.Router();

router.post("/create", authenticate, delBlocked, notesValidations, createNotes);
router.get("/getnotes/:noteId", authenticate, delBlocked, GetNOTES);
router.get("/getallnotes", authenticate, delBlocked, GetAllNOTES);
router.delete("/deletnote/:noteId", authenticate, delBlocked, DeleteNotes);
router.put("/update/:noteId", authenticate, delBlocked, UpdateNotes);
export default router;
