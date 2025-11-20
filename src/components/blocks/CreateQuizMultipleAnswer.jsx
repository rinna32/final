import { useEffect, useState } from "react";

export default function CreateQuizMultipleAnswer({ question, editQuestion }) {
    const [checkedAnswers, setCheckedAnswers] = useState([]);

    useEffect(() => {
        if (Array.isArray(question.correctAnswer)) {
            setCheckedAnswers(question.correctAnswer);
        } else {
            setCheckedAnswers([]);
        }
    }, [question.correctAnswer]);

    useEffect(() => {
        editQuestion(question.id, checkedAnswers, "correctAnswer");
    }, [checkedAnswers, question.id, editQuestion]);

    const editOption = (index, value) => {
        const newOptions = question.options.map((opt, i) =>
            i === index ? value : opt
        );
        editQuestion(question.id, newOptions, "options");
    };

    const toggleCorrectAnswer = (option) => {
        setCheckedAnswers((prev) =>
            prev.includes(option)
                ? prev.filter((a) => a !== option)
                : [...prev, option]
        );
    };

    return (
        <div className="space-y-6">
            <label className="block">
                <p className="mb-2 font-medium">Введите текст вопроса</p>
                <input
                    className="border border-gray-500 px-3 py-2 w-full rounded"
                    type="text"
                    placeholder="Текст вопроса"
                    value={question.question}
                    onInput={(e) => editQuestion(question.id, e.target.value, "question")}
                />
            </label>

            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <input
                            className="border border-gray-500 px-3 py-2 flex-1 rounded"
                            type="text"
                            placeholder={`Вариант ${index + 1}`}
                            value={option}
                            onInput={(e) => editOption(index, e.target.value)}
                        />

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={checkedAnswers.includes(option)}
                                onChange={() => toggleCorrectAnswer(option)}
                            />
                            <span>Правильный</span>
                        </label>
                    </div>
                ))}
            </div>

            <button
                onClick={() =>
                    editQuestion(question.id, [...question.options, ""], "options")
                }
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
            >
                + Добавить вариант
            </button>

            {checkedAnswers.length > 0 && (
                <div className="mt-4 p-4 bg-green-50 border border-green-400 rounded">
                    <h4 className="font-semibold mb-2">Правильные ответы:</h4>
                    <ul className="list-disc list-inside">
                        {checkedAnswers.map((ans, i) => (
                            <li key={i}>{ans || "(пустой вариант)"}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}