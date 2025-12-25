import mongoose from "mongoose";
import Notes from "../models/notes.model.js";

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    //validation
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }
    //notes create
    const CreateNote = await Notes.create({
      title,
      content,
      UserNote: req.userId, // userId middleware se aaya
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      CreateNote,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Notes not created", error });
  }
};

export const GetNOTES = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.noteId;
    const note = await Notes.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Notes Not found" });
    }

    if (note.UserNote.toString() !== userId) {
      console.log(note.UserNote);
      return res
        .status(403)
        .json({ message: "Not authorized to access this note" });
    }

    res.status(200).json({ message: "Notes found successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const GetAllNOTES = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const note = await Notes.find({ UserNote: userId });
    console.log(note);

    if (!note) {
      return res.status(404).json({ message: "Notes Not found" });
    }

    if (note.length == 0) {
      return res.status(200).json({
        message: "No Notes Found",
        note: [],
      });
    }

    res.status(200).json({ message: "Notes found successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const DeleteNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.noteId;

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid NoteID" });
    }

    const SoftDelNotes = await Notes.findById(noteId);

    if (!SoftDelNotes) {
      return res
        .status(404)
        .json({ message: "Note not found or already deleted" });
    }

    //sirif owner he delete kar sakhte hai

    if (SoftDelNotes.UserNote.toString() !== userId) {
      return res.status(400).json({ message: "Acess Denied" });
    }

    await Notes.findByIdAndDelete(noteId);

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const UpdateNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const noteId = req.params.noteId;
    const { title, content } = req.body;
    //check this note Id is valid or not

    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid NoteID" });
    }

    //NOTE EXISTS OR NOT
    const note = await Notes.findById(noteId);

    if (!note) {
      return res.status(400).json({ message: "Note Not Found" });
    }

    //SIRIF OWNER HE UPDATE KAR SAKTE HAI

    if (note.UserNote.toString() !== userId) {
      return res.status(400).json({ message: "Acess Denied" });
    }

    if (!title && !content) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    //updated now

    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();

    //success response

    res.status(200).json({ message: "Note updated Successfully", data: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
