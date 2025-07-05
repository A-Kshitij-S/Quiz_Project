import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {  ENROLLMENT_API_ENDPOINT } from "@/utlis/constants";

export const fetchMyCourses = createAsyncThunk(
  "myCourses/fetchMyCourses",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${ENROLLMENT_API_ENDPOINT}/my-courses`, {
        withCredentials: true,
      });
    //   console.log(res.data)
      return res.data.enrolledCourses;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to load courses");
    }
  }
);

const myCourseSlice = createSlice({
  name: "myCourses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchMyCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default myCourseSlice.reducer;
