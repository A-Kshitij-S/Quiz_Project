import express from "express";
import { submitQuiz, getResult } from "../controllers/quizAttempt.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import studentMiddleware from "../middlewares/studentMiddleware.js";

const router = express.Router();

router.post("/submit/:quizId", authMiddleware,studentMiddleware, submitQuiz);
router.get("/result/:attemptId", authMiddleware,studentMiddleware, getResult);

export default router;
 