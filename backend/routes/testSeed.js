// routes/testSeed.js
import express from "express";
import Question from "../models/question.model.js";

const router = express.Router();

router.post("/seed-questions", async (req, res) => {
  try {
    const questions = await Question.insertMany([
      {
        text: "What is the capital of France?",
        options: ["A. Paris", "B. Rome", "C. Berlin", "D. Madrid"],
        correctAnswer: "A",
      },
      {
        text: "2 + 2 = ?",
        options: ["A. 3", "B. 4", "C. 5", "D. 22"],
        correctAnswer: "B",
      },
    ]);

    res.status(201).json({ message: "Questions seeded", questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
