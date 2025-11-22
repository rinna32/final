import { useState } from "react";
import CreateQuizDirectQuestion from "./blocks/CreateQuizDirectQuestion";
import CreateQuizSignleAnswer from "./blocks/CreateQuizSignleAnswer";
import CreateQuizMultipleAnswer from "./blocks/CreateQuizMultipleAnswer";

export default function NewQuizForm() {
    const [questionList, setQuestionList] = useState([
        {
            id: Date.now(),
            type: "direct",
            options: [""],
            question: "",
            correctAnswer: "",
        },
    ]);

    const [quizName, setQuizName] = useState("");

    const addQuestion = () => {
        setQuestionList([
            ...questionList,
            {
                id: Date.now(),
                type: "direct",
                options: [""],
                question: "",
                correctAnswer: "",
            },
        ]);
    };

    const editQuestion = (id, value, field) => {
        setQuestionList(
            questionList.map((item) =>
                item.id === id ? { ...item, [field]: value } : item
            )
        );
    };

    const saveQuiz = () => {
        const quizToSave = {
            id: Date.now(),
            title: quizName || "Без названия",
            quizQuestions: questionList,
        };

        const existing = JSON.parse(localStorage.getItem("quizes") || "[]");
        existing.push(quizToSave);
        localStorage.setItem("quizes", JSON.stringify(existing));
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-center mb-8">
                <input
                    className="border border-gray-500 px-4 py-2 w-full max-w-lg text-center text-xl"
                    value={quizName}
                    onChange={(e) => setQuizName(e.target.value)}
                    type="text"
                    placeholder="Название квиза"
                />
            </div>

            {questionList.map((question) => (
                <div
                    key={question.id}
                    className="border border-gray-300 rounded-lg p-6 mb-8 bg-white shadow"
                >
                    <select
                        className="bg-gray-700 text-white px-4 py-2 mb-6 rounded"
                        value={question.type}
                        onChange={(e) => editQuestion(question.id, e.target.value, "type")}
                    >
                        <option value="direct">Прямой ответ</option>
                        <option value="single">Единичный выбор</option>
                        <option value="multiple">Множественный выбор</option>
                    </select>

                    {question.type === "direct" && (
                        <CreateQuizDirectQuestion
                            question={question}
                            editQuestion={editQuestion}
                        />
                    )}
                    {question.type === "single" && (
                        <CreateQuizSignleAnswer
                            question={question}
                            editQuestion={editQuestion}
                        />
                    )}
                    {question.type === "multiple" && (
                        <CreateQuizMultipleAnswer
                            question={question}
                            editQuestion={editQuestion}
                        />
                    )}
                </div>
            ))}
            <div className="flex justify-center gap-6 mt-10">
                <button
                    className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                    onClick={addQuestion}
                >
                    Добавить вопрос
                </button>

                <button
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                    onClick={saveQuiz}
                >
                    Сохранить Квиз!
                </button>
            </div>
        </div>
    );
}