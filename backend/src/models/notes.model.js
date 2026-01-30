import mongoose from "mongoose";
import { type } from "node:os";

const NotesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    UserNote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;
