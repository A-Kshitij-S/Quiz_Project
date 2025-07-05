import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import courseReducer from "./courseSlice"
import myCourseReducer from "./myCourseSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    myCourses: myCourseReducer
  },
});

export default store;
