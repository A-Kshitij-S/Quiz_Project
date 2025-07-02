import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
  getQuestionsByCourseAndWeek,
  submitAnswer,
} from "../controllers/question.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createQuestion);
router.get("/:id", getQuestionById);
router.get("/by-course-week/:courseId/:weekNumber", getQuestionsByCourseAndWeek); 
router.post("/submit-answer/:questionId", submitAnswer);
router.delete("/:id", authMiddleware, adminMiddleware, deleteQuestion);


export default router;
