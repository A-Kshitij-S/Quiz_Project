import mongoose from "mongoose";

const weekSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  weekNumber: { type: Number, required: true },
});

export default mongoose.model("Week", weekSchema);