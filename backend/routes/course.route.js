// routes/course.route.js
import express from "express";
import { createCourse, getAllCourses } from "../controllers/course.controller.js";

const router = express.Router();

router.post("/create", createCourse);
router.get("/", getAllCourses);

export default router;
