import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utlis/db.js';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js";
import quizRoutes from "./routes/quiz.route.js";
import attemptRoutes from "./routes/quizAttempt.route.js";
import testSeed from "./routes/testSeed.js";
import questionRoutes from "./routes/question.route.js";
import weekRoutes from "./routes/week.route.js";
import courseRoutes from "./routes/course.route.js";
import enrollmentRoutes from "./routes/enrollment.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/quiz", quizRoutes);
app.use("/api/v1/attempt", attemptRoutes);
app.use('/api/test', testSeed);
app.use("/api/v1/question", questionRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/week", weekRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend is working fine!" });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
