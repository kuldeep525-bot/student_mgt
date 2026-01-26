import User from "../models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const SecretKey = "studentMangement@_525";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //check user exists
    const userexists = await User.findOne({ email });

    if (userexists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //using bcrypt to secure password

    const hashPassword = await bcrypt.hash(password, 10);

    //if user not exits it means new user then save it now

    const dataStore = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    return res
      .status(201)
      .json({ message: "User created successfully", dataStore });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "User not created" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userexits = await User.findOne({ email });
    //check user exists

    if (!userexits) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //check user deleted or not
    if (userexits.isDeleted === true) {
      return res.status(401).json({ message: "User is  deleted" });
    }

    //check user blocked or not
    if (userexits.status === "blocked") {
      return res.status(401).json({ message: "Your account is blocked" });
    }

    const ismatch = await bcrypt.compare(password, userexits.password);

    if (!ismatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //using jwt Generation
    const token = jwt.sign(
      {
        userId: userexits._id,
        role: userexits.role,
      },
      SecretKey,
      { expiresIn: "1d" },
    );

    //setup cookie
    const cookiesOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true, //frontend js cannot access
      secure: false,
      sameSite: "lax", //CSRF prvenetion
    };

    //store token in cookie
    res.cookie("jwt", token, cookiesOption);

    //success response
    res.status(200).json({
      message: "User login Successfully",
      jwt: token,
      user: {
        id: userexits._id,
        name: userexits.name,
        email: userexits.email,
        role: userexits.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({ message: "Kindly login first" });
    }

    // clear the cookie
    res.clearCookie("jwt");
    res.status(201).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(500).json({ message: "logout Error" });
    console.log(error);
  }
};

export const Userdelete = async (req, res) => {
  try {
    //  userId JWT middleware se aata hai
    const userId = req.userId;

    //  user exist check
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // already deleted check
    if (user.isDeleted) {
      return res.status(400).json({ message: "User already deleted" });
    }

    user.isDeleted = true;
    user.status = "inactive";
    user.deletedAt = new Date();

    await user.save();

    return res.status(200).json({
      message: "Account deleted successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Delete account error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
