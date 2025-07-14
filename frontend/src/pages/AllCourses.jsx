import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/authSlice";
import { fetchCourses } from "@/redux/courseSlice";
import Navbar from "@/shared/Navbar";
import { COURSE_API_ENDPOINT, ENROLLMENT_API_ENDPOINT } from "@/utlis/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AllCourses() {

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate()

  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);
  const [courseId, setCourseId] = useState()

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);

  useEffect(() => {
    if (!courseId) return;
    console.log("Sending courseId:", courseId);

    const enrollCourse = async () => {
      try {
        const res = await axios.post(`${ENROLLMENT_API_ENDPOINT}/enroll`, { courseId }, {
          withCredentials: true,
        });

        toast.success("Enrolled successfully!");

        if (res.data?.enrolledCourses) {
          dispatch(setUser({
            ...user,
            enrolledCourses: res.data.enrolledCourses
          }));
        }

      } catch (error) {
        console.error(error);
        if (!user) {
          toast.error("user not logged in");
        }
        else {
          toast.error("Enrollment failed", {
            description: error?.response?.data?.message || "Please try again later",
          });
        }
      }
    };

    enrollCourse();
  }, [courseId]);
  // console.log(courseId)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-6 py-10">
        <h1 className="text-4xl font-bold text-[#00FFFF] font-[Orbitron] mb-8 drop-shadow-[0_0_10px_#00FFFF] text-center">
          Available Courses
        </h1>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {courses.map((course, idx) => (
            <div
              key={idx}
              className="bg-[#111] border border-[#00FFFF] p-6 rounded-xl shadow-[0_0_20px_#00FFFF40] hover:shadow-[0_0_25px_#00FFFF80] transition-all duration-300"
            >
              <h2 className="text-2xl font-bold text-[#FF004F] mb-2">
                {course.title}
              </h2>
              <p className="text-white/70 mb-4">{course.description}</p>

              {user?.role === 'student' ? (
                user?.enrolledCourses?.includes(course._id) ? (
                  <Button disabled className="bg-gray-600 cursor-not-allowed">
                    Already Enrolled
                  </Button>
                ) : (
                  <Button
                    className="bg-[#00FFFF] text-black hover:shadow-[0_0_12px_#00FFFF]"
                    onClick={() => setCourseId(course._id)}
                  >
                    Enroll
                  </Button>
                )
              ) : user?.role === 'admin' ? (
                <Button
                  className="bg-[#00FFFF] text-black hover:shadow-[0_0_12px_#00FFFF]"
                  onClick={() =>
                    navigate("/create/week", {
                      state: {
                        courseId: course._id,
                        courseName: course.title,
                      },
                    })
                  }
                >
                  Add Question
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </>
  );

}
