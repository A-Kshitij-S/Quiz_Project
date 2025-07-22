import { WEEK_API_ENDPOINT } from "@/utlis/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeeksByCourse = createAsyncThunk(
  "week/fetchWeeksByCourse",
  async (courseId, thunkAPI) => {
    try {
      const res = await axios.get(`${WEEK_API_ENDPOINT}/by-course/${courseId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch weeks");
    }
  }
);

const weekSlice = createSlice({
  name: "week",
  initialState: {
    week: null,
    loading: false,
    error: null,
  },
  reducers: {
    setWeek: (state, action) => {
      state.week = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeksByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeksByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.week = action.payload;
      })
      .addCase(fetchWeeksByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setWeek } = weekSlice.actions;
export default weekSlice.reducer;
