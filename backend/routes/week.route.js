// routes/week.route.js
import express from "express";
import { createWeek, getWeeksByCourse } from "../controllers/week.controller.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create",authMiddleware, adminMiddleware, createWeek);
router.get("/by-course/:courseId", getWeeksByCourse);


export default router;
