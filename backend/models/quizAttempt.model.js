import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  answers: [
    {
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      selectedOption: {
        type: String,
        required: true,
      },
      isCorrect: {
        type: Boolean,
        default: false,
      },
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  submittedAt: {
    type: Date,
  },
});

export default mongoose.model("QuizAttempt", quizAttemptSchema);
