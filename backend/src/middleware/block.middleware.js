//is middleware me blocked user or deleted user ko system se jana me rokenga

import User from "../models/user.Model.js";

export const delBlocked = async (req, res, next) => {
  try {
    // userId comes from authenticate middleware (token already verified)
    const userId = req.userId;

    //check user exits or nhi with user id
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //check user blocked
    if (user.isDeleted === "true") {
      return res.status(401).json({ message: "User not found or deleted" });
    }
    //check user blocked
    if (user.status !== "active") {
      return res.status(401).json({ message: "Your account is   blocked" });
    }
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};
