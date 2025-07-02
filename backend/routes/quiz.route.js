import express from "express";
import { createQuiz, deleteQuiz, getAllQuizzes, getQuizByCourseAndWeek, getQuizById } from "../controllers/quiz.controller.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router= express.Router()

router.post("/create",authMiddleware, adminMiddleware, createQuiz)
router.get("/getall", getAllQuizzes)
router.get("/:id", getQuizById)
router.get("/by-course-week/:courseId/:weekId", authMiddleware, getQuizByCourseAndWeek);
router.delete("/delete/:id",authMiddleware,adminMiddleware, deleteQuiz)

export default router