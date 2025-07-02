import express from "express";
import { enrollInCourse } from "../controllers/enrollment.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getEnrolledCourses } from "../controllers/enrollment.controller.js";
import studentMiddleware from "../middlewares/studentMiddleware.js";


const router = express.Router();

router.post("/enroll", authMiddleware,studentMiddleware, enrollInCourse);
router.get("/my-courses", authMiddleware,studentMiddleware, getEnrolledCourses);


export default router;
