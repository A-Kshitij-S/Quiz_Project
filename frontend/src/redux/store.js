import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice"
import myCourseReducer from "./myCourseSlice";
import quizQuestionReducer from "./quixQuestion"

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    myCourses: myCourseReducer,
    quizQuestions: quizQuestionReducer
  },
});

export default store;
