// controllers/course.controller.js
import Course from "../models/course.model.js";

export const createCourse = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({ success: true, course });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json({ courses });
};
