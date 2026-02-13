//is middleware me blocked user or deleted user ko system se jana me rokenga

export const delBlocked = async (req, res, next) => {
  try {
    //check user deleted
    if (req.user.isDeleted === true) {
      return res.status(401).json({ message: "User not found or deleted" });
    }
    //check user blocked
    if (req.user.status !== "active") {
      return res
        .status(401)
        .json({ message: "Your account is blocked. Contact admin" });
    }

    next();
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};
