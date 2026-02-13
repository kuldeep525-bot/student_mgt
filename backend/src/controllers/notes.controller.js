import mongoose from "mongoose";
import Notes from "../models/notes.model.js";
import User from "../models/user.Model.js";

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
      UserNote: req.user.userId, // userId middleware se aaya
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
    const noteId = req.params.noteId;
    const note = await Notes.findOne({
      _id: noteId,
      UserNote: req.user.userId,
      isDeleted: false,
      isArchived: false,
    }).populate("UserNote", "name email");
    if (!note) {
      return res.status(404).json({ message: "Notes Not found" });
    }

    res.status(200).json({ message: "Notes found successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const GetAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({
      UserNote: req.user.userId,
      isDeleted: false,
      isArchived: false,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      totalNotes: notes.length,
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const DeleteNotes = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const SoftDelNotes = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false,
      },
      { isDeleted: true },
      { new: true },
    );

    if (!SoftDelNotes) {
      return res
        .status(404)
        .json({ message: "Note not found or already deleted" });
    }

    res.status(200).json({
      message: "Note deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const RestoreNotes = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const SoftDelNotes = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: true,
      },
      { isDeleted: false },
      { new: true },
    );

    if (!SoftDelNotes) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note restore successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const UpdateNotes = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;

    //NOTE EXISTS OR NOT
    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isArchived: false,
        isDeleted: false,
      },
      { $set: { title, content } },
      { new: true },
    ).populate("UserNote", "name email");

    if (!note) {
      return res.status(400).json({ message: "Note Not Found" });
    }

    if (note.isArchived) {
      return res.status(400).json({
        message: "Archived note cannot be updated",
      });
    }

    //success response

    res.status(200).json({ message: "Note updated Successfully", data: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Archive = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false, //delete not cannot archive
      },
      { $set: { isArchived: true } },
      { new: true },
    );

    //  Note exist check
    if (!note) {
      return res.status(404).json({
        message: "Note not found or already archived",
      });
    }

    return res.status(200).json({
      message: "Note Archive successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const UnArchive = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false, //delete not cannot unarchive
      },
      { $set: { isArchived: false } },
      { new: true },
    );

    //  Note exist check
    if (!note) {
      return res.status(404).json({
        message: "Note not found or already unarchived",
      });
    }

    return res.status(200).json({
      message: "Note unArchive successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const Favourite = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false, //delete not cannotbe favourite
      },
      { $set: { isFavourite: true } },
      { new: true },
    );

    //  Note exist check
    if (!note) {
      return res.status(404).json({
        message: "Note not found ",
      });
    }

    return res.status(200).json({
      message: "Note favourite successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const UnFavourite = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false, //delete not cannot undfavourite
      },
      { $set: { isFavourite: false } },
      { new: true },
    );

    //  Note exist check
    if (!note) {
      return res.status(404).json({
        message: "Note not found or",
      });
    }

    return res.status(200).json({
      message: "Note Unfavourite successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
