import { useEffect, useState } from "react";

export default function QuizSingleAnswer({ question, correctAnswer, variants }) {
    const [userAnswer, setUserAnswer] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (userAnswer) {
            if (userAnswer === correctAnswer) {
                setResult("Верно! 🎉");
            } else {
                setResult(`Неверно! Правильный ответ: ${correctAnswer} 😔`);
            }
        }
    }, [userAnswer, correctAnswer]);

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-8 text-center">{question}</h3>

            <div className="space-y-4">
                {variants.map((variant, index) => (
                    <label
                        key={index}
                        className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                        <input
                            type="radio"
                            name={`answer-${question.id || "single"}`}
                            checked={userAnswer === variant}
                            onChange={() => setUserAnswer(variant)}
                            className="w-5 h-5 text-blue-600"
                        />
                        <span className="text-lg">{variant}</span>
                    </label>
                ))}
            </div>

            {result && (
                <div
                    className={`mt-8 p-4 text-center text-xl font-bold rounded-lg ${result.includes("Верно") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                >
                    {result}
                </div>
            )}
        </div>
    );
}