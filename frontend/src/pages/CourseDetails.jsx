import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/shared/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "@/redux/courseSlice";

export default function CourseDetails() {
  const { courseId } = useParams();
  const [selectedWeek, setSelectedWeek] = useState("");

  const [title, useTitle] = useState("")
  const [description, useDescription] = useState("")

  const dispatch = useDispatch();
  const navigate= useNavigate()
  const { courses } = useSelector((state) => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
  // console.log(courses)

  useEffect(() => {
    if (courses) {
      for (const ele of courses) {
        if (ele._id === courseId) {
          useTitle(ele.title)
          useDescription(ele.description)
        }
      }
    }
  })

  const quizzes = [
    { id: "quiz1", title: "Quiz", week: "1" },
    { id: "quiz2", title: "Quiz", week: "2" }
  ];

  const filteredQuizzes = quizzes.filter((q) => q.week === selectedWeek);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-6 py-10">
        {/* Course Title */}
        <h1 className="text-4xl font-bold text-[#00FFFF] mb-4 font-[Orbitron]">
          Course: {title}
        </h1>

        <p className="text-white/70 max-w-xl mb-6">
          {description}. Select a week to view its quizzes.
        </p>

        {/* Week Selector */}
        <select
          className="bg-[#111] border border-[#00FFFF] text-white px-4 py-2 rounded-md mb-6"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          <option value="">-- Select Week --</option>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={String(i + 1)}>
              Week {i + 1}
            </option>
          ))}
        </select>

        {/* Quizzes */}
        <div className="space-y-4">
          {selectedWeek && filteredQuizzes.length > 0 ? (
            filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-[#111] border border-[#00FFFF] rounded-lg p-4 shadow-[0_0_15px_#00FFFF40]"
              >
                <h3 className="text-xl text-[#00FFFF] font-bold mb-2">
                  {quiz.title}
                </h3>
                <Button
                  className="bg-[#FF004F] hover:shadow-[0_0_12px_#FF004F]"
                  onClick={() => navigate(`/question/by-course-week/${courseId}/${selectedWeek}`)}
                >
                  Start Quiz
                </Button>
              </div>
            ))
          ) : selectedWeek ? (
            <p className="text-white/60">No quizzes available for Week {selectedWeek}.</p>
          ) : null}
        </div>
      </div>
    </>
  );
}
