import { useEffect, useState } from "react";

export default function QuizDirectQuestion({ question, correctAnswer }) {
    const [userAnswer, setUserAnswer] = useState("");
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (userAnswer.trim() === "") {
            setResult(null);
            return;
        }

        const isCorrect = userAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
        setResult(isCorrect ? "Верно! 🎉" : `Неверно 😔 Правильный ответ: ${correctAnswer}`);
    }, [userAnswer, correctAnswer]);

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold mb-10 text-center text-gray-800">
                {question}
            </h3>

            <div className="space-y-6">
                <input
                    type="text"
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Введите ваш ответ здесь..."
                    className="w-full px-6 py-5 text-xl border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-all"
                />
            </div>

            {result && (
                <div
                    className={`mt-10 p-6 text-center text-2xl font-bold rounded-xl ${result.includes("Верно")
                            ? "bg-green-100 text-green-800 border-2 border-green-300"
                            : "bg-red-100 text-red-800 border-2 border-red-300"
                        }`}
                >
                    {result}
                </div>
            )}
        </div>
    );
}