import { fetchQuizQuestions, setQuestions } from '@/redux/quixQuestion';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/shared/Navbar';
import { QUESTIONS_API_ENDPOINT } from '@/utlis/constants';
import axios from 'axios';

const QuizPage = () => {
    const { courseId, weekNo } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { questions, status, error } = useSelector((state) => state.quizQuestions);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [score, setScore] = useState(null);

    useEffect(() => {
        dispatch(fetchQuizQuestions({ courseId, weekNo }));
    }, [dispatch, courseId, weekNo]);

    const shuffleQuestions = () => {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        dispatch(setQuestions(shuffled));
    };

    useEffect(() => {
        dispatch(fetchQuizQuestions({ courseId, weekNo }));
        setScore(null);
        setSelectedOptions({});
    }, [dispatch, courseId, weekNo]);


    const handleOptionSelect = (qId, option) => {
        if (score !== null) return;
        setSelectedOptions((prev) => ({
            ...prev,
            [qId]: prev[qId] === option ? undefined : option,
        }));
    };


    const handleSubmit = () => {
        let correct = 0;
        questions.forEach((q) => {
            const selected = selectedOptions[q._id];
            const correctAnswer = q.options[q.correctAnswerIndex];
            if (selected !== undefined && selected === correctAnswer) {
                correct += 1;
            }
        });

        setScore(correct); // Triggers useEffect below
    };

    useEffect(() => {
        const submitResult = async () => {
            if (score === null) return;

            try {
                console.log("course =", questions[0]?.week);

                const res = await axios.post(
                    `${QUESTIONS_API_ENDPOINT}/submit`,
                    {
                        course: questions[0]?.course, // ✅ object ID from question
                        week: questions[0]?.week, // all questions are from same week
                        score,
                        total: questions.length,
                    },
                    { withCredentials: true }
                );

                console.log("✅ Quiz submitted successfully:", res.data);
            } catch (err) {
                console.error("❌ Failed to save quiz result:", err);
            }
        };

        submitResult();
    }, [score]);


    const handleTryAgain = () => {
        setScore(null);
        setSelectedOptions({});
    };

    const goToDashboard = () => {
        navigate('/student-dashboard'); // change if your route is different
    };

    if (status === 'loading')
        return <p className="text-white text-xl p-10">Loading questions...</p>;
    if (status === 'failed')
        return <p className="text-red-500 text-xl p-10">Error: {error}</p>;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-[#0B0B0B] text-white px-6 py-10 font-sans">
                <div className="flex justify-between items-center mb-10">
                    <button
                        className="text-white px-4 py-2 border border-gray-600 rounded-md hover:bg-[#1f1f1f] transition"
                        onClick={() => navigate(`/question/by-course-week/${courseId}/${parseInt(weekNo) - 1}`)}
                        disabled={parseInt(weekNo) <= 1}
                    >
                        ← Previous Week
                    </button>

                    <h2 className="text-3xl font-semibold text-center">Quiz - Week {weekNo}</h2>

                    <button
                        className="text-white px-4 py-2 border border-gray-600 rounded-md hover:bg-[#1f1f1f] transition"
                        onClick={() => navigate(`/question/by-course-week/${courseId}/${parseInt(weekNo) + 1}`)}
                        disabled={parseInt(weekNo) >= 12}
                    >
                        Next Week →
                    </button>
                </div>

                {score === null && questions.length > 0 && (
                    <div className="flex justify-center mb-6">
                        <Button
                            onClick={shuffleQuestions}
                            className="bg-[#00FFFF] hover:bg-[#00c0c0] text-black px-6 py-2"
                        >
                            🔀 Randomize Questions
                        </Button>
                    </div>
                )}


                {questions.map((q, index) => {
                    const selected = selectedOptions[q._id];
                    const isAttempted = selected !== undefined;
                    const correctAnswer = q.options[q.correctAnswerIndex];

                    return (
                        <div
                            key={q._id}
                            className={`bg-[#121212] border ${!isAttempted && score !== null
                                ? 'border-gray-600'
                                : 'border-[#2D2D2D]'
                                } p-6 mb-8 rounded-2xl shadow-md transition-all duration-300`}
                        >
                            <h3 className="text-lg font-medium mb-4">
                                {index + 1}. {q.questionText}
                            </h3>

                            <ul className="space-y-2">
                                {q.options.map((opt, i) => {
                                    const isSelected = selected === opt;
                                    const isCorrect = opt === correctAnswer;

                                    let optionClasses =
                                        'p-3 rounded-md border transition-all duration-200 cursor-pointer';

                                    if (score === null) {
                                        optionClasses += isSelected
                                            ? ' bg-[#7C3AED] text-white shadow-md'
                                            : ' bg-[#1A1A1A] border-[#2a2a2a] hover:bg-[#7C3AED] hover:text-white';
                                    } else {
                                        if (isCorrect) {
                                            optionClasses += ' bg-green-700 text-white border-green-500';
                                        } else if (isSelected) {
                                            optionClasses += ' bg-red-700 text-white border-red-500';
                                        } else {
                                            optionClasses += ' bg-[#1A1A1A] border-[#2a2a2a]';
                                        }
                                    }

                                    return (
                                        <li
                                            key={i}
                                            className={optionClasses}
                                            onClick={() => handleOptionSelect(q._id, opt)}
                                        >
                                            {opt}
                                        </li>
                                    );
                                })}
                            </ul>

                            {!isAttempted && score !== null && (
                                <p className="mt-3 text-gray-400 italic">Not attempted</p>
                            )}
                        </div>
                    );
                })}

                {/* Submit / Score Actions */}
                {questions.length > 0 && score === null && (
                    <div className="fixed bottom-4 inset-x-0 flex justify-center">
                        <Button
                            onClick={handleSubmit}
                            className="bg-[#FF004F] text-white text-lg px-8 py-3 rounded-lg hover:shadow-[0_0_15px_#FF004F] transition"
                        >
                            Submit Quiz
                        </Button>
                    </div>
                )}

                {score !== null && (
                    <div className="mt-10 text-center space-y-4">
                        <div className="text-2xl text-[#00FFAA] font-bold">
                            You scored {score} out of {questions.length} 🎉
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
                            <Button
                                onClick={handleTryAgain}
                                className="bg-[#7C3AED] hover:bg-[#6b21a8] text-white px-6 py-2"
                            >
                                Try Again
                            </Button>
                            <Button
                                onClick={goToDashboard}
                                className="bg-[#00FFFF] hover:bg-[#00c0c0] text-black px-6 py-2"
                            >
                                Take Another Quiz
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default QuizPage;
