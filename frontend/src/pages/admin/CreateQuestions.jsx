import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import axios from 'axios';
import { QUESTIONS_API_ENDPOINT } from '@/utlis/constants';
import Navbar from '@/shared/Navbar';

const CreateQuestion = () => {
    const location = useLocation();
    const courseId = location.state?.courseId || '';
    const courseName = location.state?.courseName || '';
    const weekNum = location.state?.weekNum || ''
    // console.log(weekNum)
    const [questionNumber, setQuestionNumber] = useState(0)

    const [refreshTrigger, setRefreshTrigger] = useState(false);


    const navigate = useNavigate()

    const [question, setQuestion] = useState({
        course: courseId,
        weekNumber: weekNum,
        questionText: '',
        options: ['', '', '', ''],
        correctAnswerIndex: '',
    });

    const handleChange = (e) => {
        setQuestion({ ...question, [e.target.name]: e.target.value });
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...question.options];
        updatedOptions[index] = value;
        setQuestion({ ...question, options: updatedOptions });
    };

    useEffect(() => {
        const fetchQuestionCount = async () => {
            try {
                const res = await axios.post(`${QUESTIONS_API_ENDPOINT}/count`, {
                    courseId,
                    weekNumber: weekNum
                }, { withCredentials: true });

                setQuestionNumber(res.data.count + 1);
            } catch (err) {
                console.error(err);
                setQuestionNumber(1); // fallback
            }
        };

        if (courseId && weekNum) fetchQuestionCount();
    }, [courseId, weekNum, refreshTrigger]);





    const handleSubmit = async (e) => {
        e.preventDefault();

        const { course: courseId, questionText, options, correctAnswerIndex: correctAnswerIndex } = question;
        if (!weekNum || !questionText || options.some(opt => !opt) || correctAnswerIndex === '') {
            toast.error('All fields are required.');
            return;
        }

        if (+weekNum < 1 || +weekNum > 12) {
            toast.error('Week number must be between 1 and 12.');
            return;
        }

        try {
            await axios.post(`${QUESTIONS_API_ENDPOINT}/create`, {
                course: courseId,
                weekNumber: weekNum,
                questionText: question.questionText.trim(),
                options: question.options.map((opt) => opt.trim()),
                correctAnswerIndex: Number(question.correctAnswerIndex),
            }, {
                withCredentials: true,
            });
            toast.success('Question created successfully.');
            navigate("/create/question", {
                state: {
                    courseId,
                    courseName,
                    weekNum,
                },
            });
            setQuestion({
                course: courseId,
                weekNumber: weekNum,
                questionText: '',
                options: ['', '', '', ''],
                correctAnswerIndex: '',
            });

            setRefreshTrigger(prev => !prev);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to create question.');
        }
    };


    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0a0a0a] text-white p-6 font-[Orbitron]">
                <div className="max-w-2xl mx-auto">
                    <Card className="bg-[#111] border border-[#00FFFF30] shadow-[0_0_20px_#00FFFF40] rounded-xl">
                        <CardContent className="p-8 space-y-6">
                            <h2 className="text-3xl font-bold text-[#00FFFF] drop-shadow-[0_0_5px_#00FFFF]">
                                Add Question to <span className="text-[#FF004F]">{courseName}</span>
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Hidden Course ID */}
                                <input type="hidden" name="courseId" value={question.courseId} />

                                {/* Week Number (1–12) */}
                                <div>
                                    <label className="block text-sm mb-1  text-white">Week Number (1–12)</label>
                                    <Input
                                        type="number"
                                        name="weekNumber"
                                        disabled
                                        value={question.weekNumber}
                                        onChange={handleChange}
                                        placeholder={weekNum}
                                        min="1"
                                        max="12"
                                        className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-1  text-white">Question Nummber: {questionNumber}</label>
                                </div>

                                <div>
                                    <label className="block text-sm mb-1  text-white">Question Text</label>
                                    <Textarea
                                        name="questionText"
                                        value={question.questionText}
                                        onChange={handleChange}
                                        placeholder="Enter your question..."
                                        className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm mb-1  text-white">Options</label>
                                    {question.options.map((opt, idx) => (
                                        <Input
                                            key={idx}
                                            placeholder={`Option ${idx + 1}`}
                                            value={opt}
                                            onChange={(e) => handleOptionChange(idx, e.target.value)}
                                            className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                        />
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm mb-1 text-white">Correct Answer Index (0–3)</label>
                                    <Input
                                        type="number"
                                        name="correctAnswerIndex"
                                        value={question.correctAnswerIndex}
                                        onChange={handleChange}
                                        min="0"
                                        max="3"
                                        className="bg-[#0a0a0a] border border-[#00FFFF50] text-white"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="bg-[#FF004F] text-white hover:bg-[#ff2e6e] w-full shadow-[0_0_10px_#FF004F]"
                                >
                                    Create Question
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => navigate("/admin-dashboard")}
                                    className="border border-[#00FFFF80] text-white bg-[#FF004F] hover:bg-[#00FFFF20] w-full"
                                >
                                    Done
                                </Button>

                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default CreateQuestion;
