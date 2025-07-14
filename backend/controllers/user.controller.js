import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";


export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
    });

    await user.save();
    res.status(201).json({ message: "User registered", success: true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    
    const user = await User.findOne({ email, role });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      msg: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      success:true
    });
  } catch (err) {
    res.status(500).json({ error: err.message, success:false });
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true, // always true in cross-domain production
    sameSite: "None", // allows cross-domain cookie removal
    path: "/",
  });

  res.status(200).json({ message: "Logout successful", success: true });
};



export const getUserProfile = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Not logged in" });
  }

  res.json({ success: true, user: req.user });
};



// controller/userController.js
export const updateProfile = async (req, res) => {
  try {
    const { name, email, newPassword, oldPassword } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;

    const user = await User.findById(req.user.id); // secure: use user from token
    if (!user) return res.status(404).json({ message: "User not found" });

    if (newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({
          message: "Old password is incorrect",
          success: false,
        });
      }
      updateFields.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateFields, {
      new: true,
    });

    res.json({ msg: "User updated", user: updatedUser, success:true });
  } catch (err) {
    res.status(500).json({ error: err.message, success:false });
  }
};


