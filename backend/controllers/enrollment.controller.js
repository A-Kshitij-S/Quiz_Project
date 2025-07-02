import User from "../models/user.model.js";
import Course from "../models/course.model.js";

export const enrollInCourse = async (req, res) => {
  try {
    const userId = req.user._id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const user = await User.findById(userId);

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.json({ message: "Enrolled successfully", enrolledCourses: user.enrolledCourses });
  } catch (err) {
    res.status(500).json({ message: "Enrollment failed", error: err.message });
  }
};


export const getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ enrolledCourses: user.enrolledCourses });
  } catch (err) {
    res.status(500).json({ message: "Error fetching enrolled courses", error: err.message });
  }
}; 
