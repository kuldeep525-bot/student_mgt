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
