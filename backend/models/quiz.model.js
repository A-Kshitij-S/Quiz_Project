import mongoose from "mongoose";


const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: false, //temporary
  },
  week: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Week",
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: false,
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // likely a teacher/admin
    required: true,
  },
  duration: {
    type: Number, // in minutes
    default: 10,
  },
  totalMarks: {
    type: Number,
    default: 0, // optional, or calculate based on questions
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Quiz', quizSchema);