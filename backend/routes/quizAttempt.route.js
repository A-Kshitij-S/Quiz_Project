import express from "express";
import { submitQuiz, getResult } from "../controllers/quizAttempt.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/submit/:quizId", authMiddleware, submitQuiz);
router.get("/result/:attemptId", authMiddleware, getResult);

export default router;
 