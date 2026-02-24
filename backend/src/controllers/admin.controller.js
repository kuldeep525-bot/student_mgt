import Notes from "../models/notes.model.js";
import User from "../models/user.Model.js";
import { uploadOnCloudinary } from "../../utils/cloudnary.js";
import Paper from "../models/paper.model.js";
import { sendEmail } from "../../utils/sendEmail.js";

export const getAllUser = async (req, res) => {
  try {
    const { deleted } = req.query;

    let filter = {};

    if (deleted === "true") {
      filter.isDeleted = true;
    } else if (deleted == "false") {
      filter.isDeleted = false;
    }

    const user = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "find all the user",
      totalUsers: user.length,
      user,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const userBlocked = async (req, res) => {
  try {
    //firstly userId lenga req.params se
    const { userId } = req.params;

    // admin khud ko block na kar sake
    if (req.user.userId === userId) {
      return res.status(400).json({
        message: "Admin cannot block himself",
      });
    }

    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false, status: { $ne: "blocked" } },
      { $set: { status: "blocked" } },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User blocked successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server internal error" });
  }
};

export const userUnblocked = async (req, res) => {
  try {
    //firstly userId lenga req.params se
    const { userId } = req.params;

    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: false, status: "blocked" },
      { $set: { status: "active" } },
      { new: true },
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User Unblocked successfully",
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server internal error" });
  }
};

export const userRestor = async (req, res) => {
  try {
    //firstly hum userid lnga url me se

    const { userId } = req.params;
    //check karenga yeh id database hai yeh hi

    const user = await User.findOneAndUpdate(
      { _id: userId, isDeleted: true },
      {
        $set: {
          isDeleted: false,
          status: "active",
          deletedAt: null,
        },
      },
      { new: true },
    );
    //user not find then return
    if (!user) {
      return res.status(404).json({ message: "user not find" });
    }

    return res.status(200).json({ message: "user restore correctly", user });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const analyticsDashboard = async (req, res) => {
  try {
    // const notes = await Notes.find();
    // const deletedNotes = notes.filter((deleted) => {
    //   return deleted.isDeleted === true;
    // });
    // const user = await User.find();
    // const activeUser = user.filter((act) => {
    //   return act.status === "active";
    // });
    // return res.status(200).json({
    //   user: { totalUser: user.length, activeUser: activeUser.length },
    //   notes: { totalNotes: notes.length, deletedNotes: deletedNotes.length },
    // });//hum yeh sab bhi kar sakhte hai prr yeh hamera data lna me slow ho jayega show hum mongodb ka countdown use karenga

    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: "active" });
    const inactiveUsers = await User.countDocuments({ status: "inactive" });
    const blockedUsers = await User.countDocuments({ status: "blocked" });

    //notes
    const totalNotes = await Notes.countDocuments({ isDeleted: false });
    const deletedNotes = await Notes.countDocuments({ isDeleted: true });
    const archivedNotes = await Notes.countDocuments({ isArchived: true });
    const favouriteNotes = await Notes.countDocuments({ isFavourite: true });

    // MONTHLY USER GROWTH
    const monthlyUserGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    // MONTHLY NOTES GROWTH

    const monthlyNotesGrowth = await Notes.aggregate([
      {
        $match: { isDeleted: false },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
    ]);

    return res.status(200).json({
      users: {
        totalUsers,
        activeUsers,
        inactiveUsers,
        blockedUsers,
      },
      notes: {
        totalNotes,
        deletedNotes,
        archivedNotes,
        favouriteNotes,
      },
      charts: {
        monthlyUserGrowth,
        monthlyNotesGrowth,
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const createPaper = async (req, res) => {
  try {
    const { title, subject, year, price } = req.body;

    //  Basic validation
    if (!title || !subject || !year) {
      return res.status(400).json({
        message: "Title, Subject and Year are required",
      });
    }

    //  File check
    if (!req.files?.questionPdf || !req.files?.answerPdf) {
      return res.status(400).json({
        message: "Both Question PDF and Answer PDF are required",
      });
    }

    //  Get local file paths
    const questionLocalPath = req.files.questionPdf[0].path;
    const answerLocalPath = req.files.answerPdf[0].path;

    //  Upload to Cloudinary
    const questionUpload = await uploadOnCloudinary(questionLocalPath);
    const answerUpload = await uploadOnCloudinary(answerLocalPath);

    if (!questionUpload || !answerUpload) {
      return res.status(500).json({
        message: "File upload failed",
      });
    }

    //  Create Paper in DB
    const paper = await Paper.create({
      title,
      subject,
      year,
      price,
      questionPdf: questionUpload.secure_url,
      answerPdf: answerUpload.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Paper uploaded successfully",
      data: paper,
    });
  } catch (error) {
    console.error("Create Paper Error:", error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const deletePaper = async (req, res) => {
  try {
    const paperId = req.params.paperId;
    const paper = await Paper.findOneAndUpdate(
      {
        _id: paperId,
        isActive: true,
        isDeleted: false,
      },
      { isDeleted: true, isActive: false },
      { new: true },
    );

    if (!paper) {
      return res
        .status(404)
        .json({ message: "paper not found or already deleted" });
    }

    return res.status(200).json({ message: "Paper deleted successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const RestorePaper = async (req, res) => {
  try {
    const paperId = req.params.paperId;
    const paper = await Paper.findOneAndUpdate(
      {
        _id: paperId,
        isActive: false,
        isDeleted: true,
      },
      { isDeleted: false, isActive: true },
      { new: true },
    );

    if (!paper) {
      return res
        .status(404)
        .json({ message: "paper not found or already restore" });
    }

    return res.status(200).json({ message: "Paper restore successfully" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const hardDeletePaper = async (req, res) => {
  try {
    const paperId = req.params.paperId;
    const paper = await Paper.findOneAndDelete({
      _id: paperId,
      isActive: false,
      isDeleted: true,
    });

    if (!paper) {
      return res.status(404).json({ message: "paper not found" });
    }
    return res.status(200).json({ message: "paper deleted permanetly" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const approveUpiPayment = async (req, res) => {
  try {
    const { userId, paperId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const paper = await Paper.findById(paperId);
    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    // Duplicate unlock se bachao
    if (!user.purchasedPapers.includes(paperId)) {
      user.purchasedPapers.push(paperId);
    }

    user.pendingPayments = user.pendingPayments.map((p) => {
      if (p.paper.toString() === paperId) {
        p.status = "approved";
      }
      return p;
    });

    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Payment Approved – Paper Unlocked ",
      text: `Hi ${user.name || "there"},
      
Your payment has been approved by admin.

Paper: ${paper.title}

You can now login and download your paper.

Thanks,
StudentMgt Team`,
    });

    return res.status(200).json({
      message: "Payment approved, paper unlocked & email sent",
    });
  } catch (error) {
    console.log("Approve Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
