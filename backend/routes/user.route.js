import express from "express";
import {  getUserProfile, loginUser, logoutUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import authMiddleware, { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", authMiddleware, getUserProfile)
router.post("/profile/update/:id",authMiddleware, verifyToken ,updateProfile)

export default router;
