import User from "../models/user.Model.js";

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
    if (req.userId === userId) {
      return res.status(400).json({
        message: "Admin cannot block himself",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //check user deleted or note delete user cannot be blocked

    if (user.isDeleted) {
      return res.status(400).json({
        message: "Deleted user cannot be blocked",
      });
    }

    user.status = "blocked";
    await user.save();
    res.status(200).json({
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

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    //check user deleted or note delete user cannot be unblocked

    if (user.isDeleted) {
      return res.status(400).json({
        message: "Deleted user cannot be unblocked",
      });
    }

    user.status = "active";
    await user.save();
    res.status(200).json({
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

    const user = await User.findById(userId);
    //user not find then return
    if (!user) {
      return res.status(404).json({ message: "user not find" });
    }

    if (!user.isDeleted) {
      return res
        .status(401)
        .json({ message: "User already active not deleted" });
    }

    user.isDeleted = false;
    user.status = "active";
    user.deletedAt = null;

    await user.save();

    return res.status(200).json({ message: "user restore correctly", user });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
