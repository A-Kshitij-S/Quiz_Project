import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// 🔀 Shuffle helper
const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function QuizAttempt() {
  const { quizId } = useParams();

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  // shuffle once on mount
  useEffect(() => {
    const shuffled = shuffle(staticQuestions);
    setQuestions(shuffled);
    setAnswers(Array(shuffled.length).fill(""));
  }, []);

  const handleOptionToggle = (qIndex, option) => {
    const updated = [...answers];
    updated[qIndex] = updated[qIndex] === option ? "" : option; // deselect if same
    setAnswers(updated);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Quiz submitted successfully!");
    // Later: send to backend here
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-[#00FFFF] font-[Orbitron] mb-8 drop-shadow-[0_0_10px_#00FFFF] text-center">
        Quiz: {quizId}
      </h1>

      <div className="space-y-8 max-w-3xl mx-auto overflow-y-auto">
        {questions.map((question, qIndex) => (
          <div
            key={qIndex}
            className="bg-[#111] border border-[#00FFFF] p-6 rounded-xl shadow-[0_0_20px_#00FFFF40]"
          >
            <h2 className="text-lg font-semibold text-[#FF004F] mb-4">
              Q{qIndex + 1}. {question.text}
            </h2>

            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`block px-4 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
                    answers[qIndex] === opt
                      ? "border-[#FF004F] bg-[#1a1a1a]"
                      : "border-[#333] hover:border-[#FF004F]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={answers[qIndex] === opt}
                    onChange={() => handleOptionToggle(qIndex, opt)}
                    className="mr-2 accent-[#FF004F]"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="mt-10 text-center">
        <Button
          onClick={handleSubmit}
          className="bg-[#FF004F] text-white hover:shadow-[0_0_12px_#FF004F]"
        >
          Submit Quiz
        </Button>
      </div>
    </div>
  );
}
