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

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: "course not found",
        success: false,
      });
    }
 
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (deletedCourse) {
      return res.status(200).json({
        message: "course deleted successfully",
        course: deletedCourse,
        message: true,
      });
    } else {
      return res.status(400).json({
        message: "unable to delete course",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
