import Quiz from "../models/quiz.model.js";
import Question from "../models/question.model.js";
import QuizAttempt from "../models/quizAttempt.model.js";

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body; // [{ question: "id", selectedOption: "B" }]
    const quizId = req.params.quizId;
    const userId = req.user._id;
    console.log("REQ.USER =", req.user);
    const quiz = await Quiz.findById(quizId).populate("questions");

    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

    let score = 0;
    const evaluatedAnswers = [];

    for (const ans of answers) {
      const question = await Question.findById(ans.question);

      if (!question) {
        console.warn("Question not found:", ans.question);
        continue; // or handle differently
      }

      const isCorrect = question.correctAnswer === ans.selectedOption;

      if (isCorrect) score++;

      evaluatedAnswers.push({
        question: question._id,
        selectedOption: ans.selectedOption,
        isCorrect,
      });
    }

    const attempt = new QuizAttempt({
      user: req.user._id, // ✅ NOT req.user.id
      quiz: quizId,
      answers: evaluatedAnswers,
      score,
      submittedAt: new Date(),
    });

    console.log("REQ.USER =", req.user);
    console.log("Saving attempt for user:", req.user._id); // should now log the actual ObjectId

    await attempt.save();

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



// import QuizAttempt from "../models/quizAttempt.model.js";
// import Quiz from "../models/quiz.model.js"
// import Question from "../models/question.model.js";

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
