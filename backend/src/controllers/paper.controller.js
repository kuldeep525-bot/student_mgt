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
    const { paperId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paperId)) {
      return res.status(400).json({ message: "Invalid paper ID" });
    }

    const paper = await Paper.findOne({
      _id: paperId,
      isActive: true,
      isDeleted: false,
    });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const user = await User.findById(req.user.userId);

    const hasPurchased = user.purchasedPapers.some(
      (id) => id.toString() === paperId,
    );

    if (!hasPurchased) {
      return res.status(403).json({
        message: "You have not purchased this paper",
      });
    }

    return res.redirect(paper.answerPdf);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const generateUpiLink = async (req, res) => {
  try {
    const paperId = req.params.paperId;
    const paper = await Paper.findById(paperId);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const upiId = "9779781674@fam";
    const name = "Kuldeep kumar";
    //upi link created
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name,
    )}&am=${paper.price}&cu=INR&tn=${encodeURIComponent(
      `Purchase ${paper.title}`,
    )}`;

    return res.status(200).json({
      success: true,
      upiLink,
      amount: paper.price,
      paperTitle: paper.title,
    });
  } catch (error) {
    console.log("UPI Link Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const submitUpiTransaction = async (req, res) => {
  try {
    const { paperId, transactionId } = req.body;

    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID required" });
    }

    const user = await User.findById(req.user.userId);

    const alreadyExists = user.pendingPayments.find(
      (p) => p.transactionId === transactionId,
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Transaction already submitted" });
    }

    //pendingPayments array ke andar ek naya record add:
    // kaunsa paper
    // kya transactionId
    // status = "pending" (abhi admin ne verify nahi kiya)
    user.pendingPayments.push({
      paper: paperId,
      transactionId,
      status: "pending",
    });

    // Duplicate Transaction ID Block Karo

    await user.save();

    return res.status(200).json({
      message: "Transaction submitted. Waiting for admin approval.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
