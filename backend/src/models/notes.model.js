import mongoose from "mongoose";

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
    },
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;
