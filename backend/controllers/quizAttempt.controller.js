import Quiz from "../models/quiz.model.js";
import Question from "../models/question.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // [{ questionId, selectedIndex }]
    const quizId = req.params.quizId;
    const userId = req.user._id;

    const quiz = await Quiz.findById(quizId).populate("questions");
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const evaluatedAnswers = [];

    // console.log("answers received:", answers);

    for (const ans of answers) {
      const questionId =
        typeof ans.question === "object" ? ans.question._id : ans.question;
      const question = await Question.findById(questionId);

      if (!question) {
        console.warn("Question not found:", ans.questionId);
        continue;
      }

      const isCorrect = question.correctAnswerIndex === ans.selectedIndex;
      // console.log(`Question: ${question._id}`);
      // console.log(`Correct Answer Index: ${question.correctAnswerIndex}`);
      // console.log(`Selected Index: ${ans.selectedIndex}`);
      // console.log(`Is Correct: ${isCorrect}`);
      if (isCorrect) score++;

      evaluatedAnswers.push({
        question: question._id,
        selectedOption: ans.selectedIndex, // ✅ This fixes the error
        isCorrect,
      });
    }

    // Save attempt
    const attempt = await QuizAttempt.create({
      user: userId,
      quiz: quizId,
      answers: evaluatedAnswers,
      score,
    });

    res.status(200).json({
      message: "Quiz submitted successfully",
      score,
      attemptId: attempt._id,
    });
  } catch (err) {
    console.error("Submit quiz error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const getResult = async (req, res) => {
  try {
    const attempt = await QuizAttempt.findById(req.params.attemptId)
      .populate("quiz", "title")
      .populate("answers.question", "text options correctAnswer");

    if (!attempt) {
      return res.status(404).json({ message: "Attempt not found" });
    }

    // Optional: check if user owns the attempt
    if (attempt.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.status(200).json({
      quizTitle: attempt.quiz.title,
      score: attempt.score,
      answers: attempt.answers.map((a) => ({
        question: a.question.text,
        options: a.question.options,
        selected: a.selectedOption,
        correctAnswer: a.question.correctAnswer,
        isCorrect: a.isCorrect,
      })),
      submittedAt: attempt.submittedAt,
    });
  } catch (err) {
    console.error("Get result error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};
