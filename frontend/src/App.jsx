import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register"
import StudentDashboard from "./pages/StudentDashboard";
import CourseDetails from "./pages/CourseDetails";
import QuizAttempt from "./pages/QuizAttempt";
import AllCourses from "./pages/AllCourses";
import Profile from "./pages/Profile";
import axios from "axios";
import { COURSE_API_ENDPOINT, USER_API_ENDPOINT } from "./utlis/constants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/authSlice";
import { Toaster } from "sonner";
import AdminDashboard from "./pages/AdminDashboard";
import QuizPage from "./pages/QuizPage";
import CreateCourse from "./pages/admin/CreateCourse";
import CreateQuestion from "./pages/admin/CreateQuestions";
import CreateWeek from "./pages/admin/CreateWeek";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import CourseList from "./pages/CourseList";
// import QuizAttempt from "./pages/QuizAttempt";


const appRouter= createBrowserRouter([
  {
    path:'/',
    element: <Home/>
  },
  {
    path:'/login',
    element: <Login/>
  },
  {
    path:'/register',
    element:<Register/>
  },
  {
    path:'/student-dashboard',
    element:<StudentDashboard/>
  },
  {
    path:'/courses/:courseId',
    element:<CourseDetails/>
  },
  {
    path:'/quiz/:quizId',
    element:<QuizAttempt/>
  },
  {
    path:'/courses',
    element:<AllCourses/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },

  //admin
  {
    path:'/admin-dashboard',
    element:<AllCourses/>
  },
  {
    path:"/create/course",
    element:<CreateCourse/>
  },
  {
    path:"/create/week",
    element:<CreateWeek/>
  },
  {
    path:"create/question",
    element:<CreateQuestion/>
  },
  //questions
  {
    path:'/question/by-course-week/:courseId/:weekNo',
    element:<QuizPage/>
  },
])

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/profile`, {
          withCredentials: true,
        });
        if (res.data?.user) {
          dispatch(setUser(res.data.user));
        }
      } catch (err) {
        console.log("User not authenticated");
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Toaster position="top-center" richColors />
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
