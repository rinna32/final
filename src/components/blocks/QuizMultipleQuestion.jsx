import { useEffect, useState } from "react";

export default function QuizMultipleQuestion({ question, correctAnswersList, variants }) {
    const [userAnswer, setUserAnswer] = useState([]);
    const [result, setResult] = useState(null);

    const toggleAnswer = (answer) => {
        setUserAnswer((prev) =>
            prev.includes(answer)
                ? prev.filter((item) => item !== answer)
                : [...prev, answer]
        );
    };

    useEffect(() => {
        const isCorrect =
            userAnswer.length === correctAnswersList.length &&
            correctAnswersList.every((item) => userAnswer.includes(item)) &&
            userAnswer.every((item) => correctAnswersList.includes(item));

        setResult(isCorrect ? "Верно! 🎉" : "Неверно 😔");
    }, [userAnswer, correctAnswersList]);

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-xl">
            <h3 className="text-3xl font-bold mb-10 text-center">{question}</h3>

            <div className="space-y-5">
                {variants.map((answer, index) => (
                    <label
                        key={index}
                        className="flex items-center gap-5 p-5 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                    >
                        <input
                            type="checkbox"
                            checked={userAnswer.includes(answer)}
                            onChange={() => toggleAnswer(answer)}
                            className="w-6 h-6 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-xl font-medium">{answer}</span>
                    </label>
                ))}
            </div>

            {result && userAnswer.length > 0 && (
                <div
                    className={`mt-10 p-6 text-center text-2xl font-bold rounded-xl ${result.includes("Верно") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                >
                    {result}
                    {!result.includes("Верно") && correctAnswersList.length > 0 && (
                        <p className="text-lg mt-3 opacity-80">
                            Правильные ответы: {correctAnswersList.join(", ")}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}