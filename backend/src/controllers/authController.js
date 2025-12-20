import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookie from "cookie";
const SecretKey = "studentMangement@_525";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
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

    await User.create({
      name,
      email,
      password: hashPassword,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "User not created" });
    console.log(error);
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

    const ismatch = await bcrypt.compare(password, userexits.password);

    if (!ismatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    //using jwt Generation

    const token = jwt.sign(
      {
        userId: userexits._id,
      },
      SecretKey,
      { expiresIn: "1d" }
    );

    //setup cookie

    const cookiesOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      HttpOnly: true, //frontend js cannot access
      secure: false,
      sameSite: "strict", //CSRF prvenetion
    };

    //store token in cookie

    res.cookie("jwt", token, cookiesOption);

    //success response

    res.status(200).json({
      message: "User login Successfully",
      token: token,
      user: {
        id: userexits._id,
        name: userexits.name,
        email: userexits.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
