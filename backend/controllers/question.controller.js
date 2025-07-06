import Question from "../models/question.model.js";
import Week from "../models/week.model.js";
import QuizResult from "../models/result.model.js"

export const createQuestion = async (req, res) => {
  try {
    const { course, weekNumber, questionText, options, correctAnswerIndex } = req.body;

    const week = await Week.findOne({ course, weekNumber });
    if (!week) {
      return res.status(404).json({ message: "Week not found for the given course" });
    }

    const question = await Question.create({
      course,
      week: week._id,
      questionText,
      options,
      correctAnswerIndex,
    });

    res.status(201).json({ message: "Question created", question });
  } catch (err) {
    res.status(500).json({ message: "Error creating question", error: err.message });
  }
};



export const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate("course week");
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching questions" });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("course week");
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json(question);
  } catch (err) {
    res.status(500).json({ message: "Error fetching question" });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting question" });
  }
};


export const getQuestionsByCourseAndWeek = async (req, res) => {
  try {
    const { courseId, weekNumber } = req.params;

    const week = await Week.findOne({ course: courseId, weekNumber });
    if (!week) {
      return res.status(404).json({ message: "Week not found for this course" });
    }

    const questions = await Question.find({
      course: courseId,
      week: week._id,
    });

    res.status(200).json({ questions });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch questions", error: err.message });
  }
};


export const submitAnswer = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { selectedIndex } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    const isCorrect = selectedIndex === question.correctAnswerIndex;

    res.json({
      message: "Answer submitted",
      correct: isCorrect,
      correctAnswerIndex: question.correctAnswerIndex, // optional
    });
  } catch (err) {
    res.status(500).json({ message: "Error submitting answer", error: err.message });
  }
};


export const submitQuiz = async (req, res) => {
  const userId = req.user._id;
  const { course, week, score, total } = req.body; // ✅ match frontend keys

  try {
    const result = await QuizResult.create({
      user: userId,
      course,
      week,
      score,
      total
    });

    res.status(201).json({ success: true, result });
  } catch (err) {
    console.error("QuizResult Save Error:", err);
    res.status(500).json({ success: false, message: "Failed to save result" });
  }
};

 

export const getUserResults = async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user._id })
      .populate("course", "title")
      .populate("week", "number")
      .sort({ submittedAt: -1 });

    res.json(results);
  } catch (err) {
    console.error("❌ Failed to fetch quiz results:", err); // ✅ logs actual error
    res.status(500).json({ message: "Error fetching quiz results" }); // ✅ correct message
  }
};

