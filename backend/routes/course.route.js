// routes/course.route.js
import express from "express";
import { createCourse, deleteCourse, getAllCourses } from "../controllers/course.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { enrollInCourse } from "../controllers/enrollment.controller.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import studentMiddleware from "../middlewares/studentMiddleware.js";


const router = express.Router();

router.post("/create", createCourse); //have to add admin middleware
router.get("/", getAllCourses);
router.get("/delete/:id", adminMiddleware, deleteCourse)
router.post("/enroll",studentMiddleware, enrollInCourse);

export default router;
