import { Button } from "@/components/ui/button";
import { fetchMyCourses } from "@/redux/myCourseSlice";
import Navbar from "@/shared/Navbar";
import { ENROLLMENT_API_ENDPOINT } from "@/utlis/constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function StudentDashboard() {
  const { user } = useSelector(store => store.auth)

  const dispatch = useDispatch()
  const navigate= useNavigate()

  const { courses, loading, error } = useSelector((state) => state.myCourses);

  useEffect(() => {
    dispatch(fetchMyCourses());
  }, []);

  return (

    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-6 py-10">

        {/* Welcome */}
        {user && (
          <h1 className="text-4xl font-bold text-[#00FFFF] mb-6 font-[Orbitron] drop-shadow-[0_0_10px_#00FFFF]">
            Welcome, {user.name}
          </h1>
        )}

        {/* My Courses */}
        <h2 className="text-2xl font-semibold text-[#FF004F] mb-4">My Courses</h2>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
          { courses && courses.map((course) => (
            <div
              key={course._id}
              className="bg-[#111] border border-[#00FFFF] rounded-xl p-6 shadow-[0_0_15px_#00FFFF40] hover:shadow-[0_0_25px_#00FFFF80] transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-[#00FFFF] mb-2">{course.title}</h3>
              <p className="text-sm text-white/80 mb-4">{course.description}</p>
              <Button
                className="bg-[#FF004F] text-white hover:shadow-[0_0_12px_#FF004F]"
                onClick={() => {
                  // You can navigate to the course or quiz
                  navigate(`/courses/${course._id}`);
                }}
              >
                Start Quiz
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
