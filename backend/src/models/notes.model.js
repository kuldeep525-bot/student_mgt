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
    summary: {
      type: String,
      default: "",
    },
    UserNote: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      //yeh useful hai jab user delete karega toh uska time note karega
      type: Date,
      default: null,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

//compound index for main queries

NotesSchema.index({ UserNote: 1, isDeleted: 1 });
NotesSchema.index({ UserNote: 1, isArchived: 1 });
NotesSchema.index({ UserNote: 1, isFavourite: 1 });

const Notes = mongoose.model("Notes", NotesSchema);

export default Notes;
