import { QUESTIONS_API_ENDPOINT } from '@/utlis/constants';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchQuizQuestions = createAsyncThunk(
  'quiz/fetchQuestions',
  async ({ courseId, weekNo }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${QUESTIONS_API_ENDPOINT}/by-course-week/${courseId}/${weekNo}`);
      return res.data.questions;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  }
);


const quizQuestionSlice = createSlice({
  name: 'quizQuestions',
  initialState: {
    questions: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearQuestions: (state) => {
      state.questions = [];
      state.status = 'idle';
      state.error = null;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuizQuestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(fetchQuizQuestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearQuestions, setQuestions } = quizQuestionSlice.actions;
export default quizQuestionSlice.reducer;
