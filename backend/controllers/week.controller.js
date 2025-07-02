// controllers/week.controller.js
import Week from "../models/week.model.js";

export const createWeek = async (req, res) => {
  try {
    const week = await Week.create(req.body);
    res.status(201).json({ success: true, week });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// controllers/week.controller.js

export const getWeeksByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const weeks = await Week.find({ course: courseId }).sort({ weekNumber: 1 });

    res.json({ weeks });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch weeks", error: err.message });
  }
};
