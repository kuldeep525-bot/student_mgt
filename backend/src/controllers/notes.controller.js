import mongoose from "mongoose";
import Notes from "../models/notes.model.js";
import User from "../models/user.Model.js";
import axios from "axios";

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

export const aiSummary = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Notes.findOne({
      _id: noteId,
      UserNote: req.user.userId,
      isDeleted: false,
    });
    if (!note) {
      return res.status(404).json({ message: "Notes Not found" });
    }

    if (!note.content) {
      return res.status(400).json({ error: "content is required" });
    }

    console.log("summary make in 2 minutes");

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const aiResponse = await axios.post("http://localhost:11434/api/generate", {
      model: "gemma3:1b",
      prompt: `Summarize this note clearly and concisely:${note.content}`,
      stream: false,
    });

    note.summary = aiResponse.data.response;
    await note.save();

    return res
      .status(200)
      .json({ message: "summary created", summary: aiResponse.data.response });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server  error" });
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

export const smartNotes = async (req, res) => {
  try {
    const {
      search,
      archived,
      favourite,
      startDate,
      endDate,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Pagination setup
    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.min(Number(limit), 20);
    const skip = (currentPage - 1) * perPage;

    //default filter object
    const filter = {};

    // Base Conditions
    filter.UserNote = req.user.userId; // Logged-in user ke notes
    filter.isDeleted = false; // Soft deleted notes hide

    //search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    //$or=mongo operator,$regex=partial match,$options: "i" → case-insensitive

    //conditional filter
    //archived filter
    if (archived === "true") filter.isArchived = true;
    if (archived === "false") filter.isArchived = false;

    //  Favourite filter
    if (favourite === "true") filter.isFavourite = true;
    if (favourite === "false") filter.isFavourite = false;

    //with startDate and endDate
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    //  Sorting logic
    let sortOption = { createdAt: -1 };
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "edited") {
      sortOption = { updatedAt: -1 };
    }

    // Execute queries in parallel
    const [notes, total] = await Promise.all([
      Notes.find(filter).sort(sortOption).skip(skip).limit(perPage).lean(),

      Notes.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      currentPage,
      totalPages: Math.ceil(total / perPage),
      totalResults: total,
      notes,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const dashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    //current month and new date
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const [
      totalNotes,
      archiveNotes,
      deleteNotes,
      favouriteNotes,
      thisMonthNotes,
    ] = await Promise.all([
      // isliye humna promise.all ka use kiya hai:Saari queries ek saath database ko bhejta hai
      // Faster response milta hai
      //total active notes
      Notes.countDocuments({
        UserNote: userId,
        isDeleted: false,
      }),

      //archived Notes

      Notes.countDocuments({
        UserNote: userId,
        isArchived: true,
        isDeleted: false,
      }),

      //deleted Notes
      Notes.countDocuments({
        UserNote: userId,
        isDeleted: true,
      }),

      //favourite Notes
      Notes.countDocuments({
        UserNote: userId,
        isFavourite: true,
        isDeleted: false,
      }),

      Notes.countDocuments({
        UserNote: userId,
        isDeleted: false,
        createdAt: {
          $gte: monthStart,
          $lte: monthEnd,
        },
      }),
    ]);

    //But countDocuments():
    // Sirf number return karta hai
    // Fast hota hai
    // Memory efficient hota hai

    return res.status(200).json({
      success: true,
      data: {
        totalNotes,
        archiveNotes,
        deleteNotes,
        favouriteNotes,
        thisMonthNotes,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
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
      { isDeleted: true, deletedAt: new Date() },
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

export const hardDelete = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Notes.findOneAndDelete({
      _id: noteId,
      UserNote: req.user.userId,
      isDeleted: true, // only already soft-deleted notes
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    return res.status(200).json({ message: "notes deleted permanetly" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
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
