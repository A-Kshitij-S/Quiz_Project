import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { COURSE_API_ENDPOINT } from "@/utlis/constants";

export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${COURSE_API_ENDPOINT}/`, {
        withCredentials: true,
      });
      // console.log(res.data)
      return res.data.courses; // Assuming the response looks like { courses: [...] }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Failed to fetch");
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
