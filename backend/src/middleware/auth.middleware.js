import jwt from "jsonwebtoken";
const SecretKey = "studentMangement@_525";

export const authenticate = (req, res, next) => {
  try {
    //token get it from cookies
    const token = req.cookies.jwt;

    //token is valid or not
    if (!token) {
      return res.status(401).json({ message: "Acess denied. Login required" });
    }

    //token verify
    const decode = jwt.verify(token, SecretKey);

    //attack userid from request

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};
