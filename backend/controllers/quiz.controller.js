// import Quiz from "../models/quiz.model.js"
import Quiz from "../models/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { title, questions, course, week, duration, totalMarks } = req.body;

    if (!course || !week) {
      return res.status(400).json({ message: "Course and week are required" });
    }

    const quiz = new Quiz({
      title,
      questions,
      course,
      week,
      createdBy: req.user.id, // from auth middleware
      duration: duration || 10,
      totalMarks: totalMarks || 0,
    });

    await quiz.save();

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select("-questions.correctAnswer"); // hide correct answers
    res.status(200).json({
      message: "all quizzes fetched successfully",
      quizzes,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    res.json({
      message: "quiz fetched successfully",
      quiz,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({
      message: "Quiz deleted successfully",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting quiz:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};


export const getQuizByCourseAndWeek = async (req, res) => {
  try {
    const { courseId, weekId } = req.params;

    const quiz = await Quiz.findOne({
      course: courseId,
      week: weekId,
    }).populate("questions");

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found for this course and week" });
    }

    res.json({ quiz });
  } catch (err) {
    res.status(500).json({ message: "Error fetching quiz", error: err.message });
  }
};

