import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utlis/db.js';
import userRouter from "./routes/user.route.js"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const corsOption={
    origin:'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOption))


app.use("/api/v1/user", userRouter)

// http://localhost:3000/

app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`);
});
