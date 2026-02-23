import User from "../models/user.Model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../../utils/sendEmail.js";

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

    return res.status(201).json({
      message: "User created successfully",
      dataStore: {
        id: dataStore._id,
        name: dataStore.name,
        email: dataStore.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userexits = await User.findOne({
      email,
      isDeleted: false,
      status: { $ne: "blocked" }, //$ne means not equal
    }).select("+password");
    //check user exists

    if (!userexits) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    if (userexits.status === "blocked") {
      return res.status(403).json({ message: "Blocked by admin" });
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
        status: userexits.status,
        isDeleted: userexits.isDeleted,
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
    console.log("error", error);
    return res.status(500).json({ message: "Server Error" });
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
    //admin cannot delete our account

    if (req.user.role != "user") {
      return res
        .status(403)
        .json({ message: "admin cannot delete our account" });
    }

    const user = await User.findOneAndUpdate(
      { _id: req.user.userId, isDeleted: false },
      {
        isDeleted: true,
        status: "inactive",
      },
      { new: true },
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or already deleted" });
    }

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

export const forgotPassword = async (req, res) => {
  try {
    //first hum body se email lnga or verify karenga
    const { email } = req.body;
    //email validation
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ message: "if this email exists,a reset link has been sent" }); //Email Enumeration Protection
    }

    //secure resettoken generate by crypto
    const resetToken = crypto.randomBytes(32).toString("hex"); //32 bytes ka random secure token yeh token email me bhejna hai

    //reset token jo ki ab hash hoga or voh database me save hoga

    const hashToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    //save token in database and validate upto 10 minutes
    user.resetToken = hashToken;
    user.expiryToken = Date.now() + 10 * 60 * 1000; //valid upto 10 minutes

    user.save({ validateBeforeSave: false }); //validation skip kar ka save

    //now reset url banana
    const resetUrl = `http://localhost:4000/api/auth/reset-password/${resetToken}`;

    const message = `You requested a password reset to studentMgt.
Click the link below:
${resetUrl}
This link will expire in 10 minutes.`;

    //ab hum email bhjenga user ko

    await sendEmail({
      to: user.email,
      subject: "Password Reset",
      text: message,
    });

    //final response
    res
      .status(200)
      .json({ message: "if this email exists,a reset link has been sent" });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    //token lna url se
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    //password validation
    if (!password || !confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    //token ko hash karna kyu ki db me hash token store hai
    const hashToken = crypto.createHash("sha256").update(token).digest("hex");

    //valid user find out

    const user = await User.findOne({
      resetToken: hashToken,
      expiryToken: { $gt: Date.now() },
    });

    //ab new password hash karo
    const hashedPassword = await bcrypt.hash(password, 10);

    //password update and token delete
    user.password = hashedPassword;
    user.resetToken = undefined; //token ko remove karna compulusry hai kyu ki ab koi bhi same link se nhi ja sakhta hai
    user.expiryToken = undefined;

    await user.save();
    res.status(200).json({
      message: "Password reset successful. Please login again.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "server error" });
  }
};
