import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Course", 
    required: true 
  },
  week: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Week", 
    required: true 
  },
  questionText: { 
    type: String, 
    required: true 
  },
  options: [{ 
    type: String, 
    required: true 
  }],
  correctAnswerIndex: { 
    type: Number, 
    required: true 
  },
});

export default mongoose.model("Question", questionSchema);
