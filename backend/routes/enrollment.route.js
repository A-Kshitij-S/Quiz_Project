import express from "express";
import { enrollInCourse } from "../controllers/enrollment.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { getEnrolledCourses } from "../controllers/enrollment.controller.js";


const router = express.Router();

router.post("/enroll", authMiddleware, enrollInCourse);
router.get("/my-courses", authMiddleware, getEnrolledCourses);


export default router;
