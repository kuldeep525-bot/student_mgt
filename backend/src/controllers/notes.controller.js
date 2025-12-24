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

    res.status(201).json({ message: "Note created successfully", CreateNote });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Notes not created", error });
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

    if (!note) {
      return res.status(404).json({ message: "Notes Not found" });
    }

    res.status(200).json({ message: "Notes found successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const DeleteNotes = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    console.log(noteId);
    const SoftDelNotes = await Notes.findOneAndDelete(noteId);

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
    res.status(500).json({ message: "Server error" });
  }
};
