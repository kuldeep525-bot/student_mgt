import express from "express";
import {
  aiSummary,
  Archive,
  createNotes,
  dashboard,
  DeleteNotes,
  Favourite,
  GetAllNotes,
  GetNOTES,
  hardDelete,
  RestoreNotes,
  smartNotes,
  UnArchive,
  UnFavourite,
  UpdateNotes,
} from "../controllers/notes.controller.js";
import { authenticate } from "../middleware/jwt.middleware.js";
import { notesValidations } from "../validations/note.validators.js";
import { delBlocked } from "../middleware/block.middleware.js";

const router = express.Router();

router.post("/create", authenticate, delBlocked, notesValidations, createNotes);
router.get("/getnotes/:noteId", authenticate, delBlocked, GetNOTES);
router.get("/getallnotes", authenticate, delBlocked, GetAllNotes);
router.get("/smartsearch", authenticate, delBlocked, smartNotes);
router.get("/dashboard", authenticate, dashboard);
router.get("/summary/:noteId", authenticate, delBlocked, aiSummary);
router.patch("/deletenote/:noteId", authenticate, delBlocked, DeleteNotes);
router.delete("/harddeletenote/:noteId", authenticate, hardDelete);
router.patch("/restorenote/:noteId", authenticate, delBlocked, RestoreNotes);
router.put("/update/:noteId", authenticate, delBlocked, UpdateNotes);
router.patch("/archive/:noteId", authenticate, delBlocked, Archive);
router.patch("/unarchive/:noteId", authenticate, delBlocked, UnArchive);
router.patch("/favourite/:noteId", authenticate, delBlocked, Favourite);
router.patch("/unfavourite/:noteId", authenticate, delBlocked, UnFavourite);
export default router;
