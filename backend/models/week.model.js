// models/week.model.js
import mongoose from "mongoose";

const weekSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  weekNumber: { type: Number, required: true, min: 1, max: 12 },
  title: String
});

export default mongoose.model("Week", weekSchema);
