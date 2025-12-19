import User from "../models/userModel.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //check user exists
    const userexists = await User.findOne({ email });

    if (userexists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //if user not exits it means new user then save it now

    await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "User not created" });
    console.log(error);
  }
};
