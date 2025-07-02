// models/course.model.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  code: { type: String, required: true, unique: true }, // eg. ECE101
  description: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Course", courseSchema);
