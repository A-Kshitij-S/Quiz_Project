import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const authMiddleware = async (req, res, next) => {

  const token = req.cookies.token; // ✅ get token from cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token in cookie" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;


export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // decoded contains { id, role }
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};