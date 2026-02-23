import mongoose from "mongoose";
import User from "../models/user.Model.js";
import Paper from "../models/paper.model.js";

export const getPaper = async (req, res) => {
  try {
    // query params se page & limit lo
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // total active papers count
    const total = await Paper.countDocuments({
      isActive: true,
      isDeleted: false,
    });

    // paginated result
    const papers = await Paper.find({ isActive: true, isDeleted: false })
      .select("title subject year price")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest first

    if (papers.length === 0) {
      return res.status(200).json({
        message: "No papers found",
        totalPapers: total,
        page,
        totalPages: Math.ceil(total / limit),
        papers: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Papers",
      totalPapers: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      papers,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const getSinglePaper = async (req, res) => {
  try {
    const paperId = req.params.paperId;

    const paper = await Paper.findOne({
      _id: paperId,
      isActive: true,
      isDeleted: false,
    }).select("title subject year price");

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    return res.status(200).json(paper);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const downloadQuestionPdf = async (req, res) => {
  try {
    const paperId = req.params.paperId;
    const paper = await Paper.findOne({
      _id: paperId,
      isActive: true,
      isDeleted: false,
    });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    if (!paper.questionPdf) {
      return res.status(404).json({ message: "PDF not available" });
    }

    return res.redirect(paper.questionPdf);

    //send file to download
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const downloadAnswer = async (req, res) => {
  try {
    const paperId = req.params.paperId;

    if (!mongoose.Types.ObjectId.isValid(paperId)) {
      return res.status(400).json({ message: "Invalid paper ID" });
    }

    //  Find Paper
    const paper = await Paper.findOne({
      _id: paperId,
      isActive: true,
      isDeleted: false,
    });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    //  Get Fresh User from DB
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 4 Check Purchase
    const hasPurchased = user.purchasedPapers.some(
      (id) => id.toString() === paperId,
    );

    if (!hasPurchased) {
      return res.status(403).json({
        message: "You have not purchased this paper",
      });
    }

    //  If Purchased → Redirect to Answer PDF
    // return res.redirect(paper.answerPdf);
    return res.status(200).json("purchased paper successfully");
  } catch (error) {
    console.log("Download Answer Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const fakePurchase = async (req, res) => {
  try {
    const { paperId } = req.params;

    //  Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(paperId)) {
      return res.status(400).json({ message: "Invalid paper ID" });
    }

    //  Check if paper exists
    const paper = await Paper.findOne({
      _id: paperId,
      isActive: true,
      isDeleted: false,
    });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    //  Add paper to user's purchasedPapers
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      {
        $addToSet: { purchasedPapers: paperId }, // prevents duplicates
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Paper purchased successfully (fake)",
      purchasedPapers: user.purchasedPapers,
    });
  } catch (error) {
    console.log("Fake Purchase Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
