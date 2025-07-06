import express from "express";
import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  deleteQuestion,
  getQuestionsByCourseAndWeek,
  submitAnswer,
  submitQuiz,
  getUserResults,

} from "../controllers/question.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", authMiddleware, adminMiddleware, createQuestion);
// router.get("/:id", getQuestionById);
router.get("/by-course-week/:courseId/:weekNumber", getQuestionsByCourseAndWeek); 
router.delete("/:id", authMiddleware, adminMiddleware, deleteQuestion);

router.post("/submit", authMiddleware, submitQuiz)
router.get("/results", authMiddleware, getUserResults);


export default router;
