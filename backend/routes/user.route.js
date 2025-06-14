import express from "express";
import { loginUser, registerUser, updateProfile } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/profile/update/:id",authMiddleware ,updateProfile)

export default router;
