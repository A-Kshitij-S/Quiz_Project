// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return res.status(401).json({ msg: "No token, access denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    const user = await User.findById(verified.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;