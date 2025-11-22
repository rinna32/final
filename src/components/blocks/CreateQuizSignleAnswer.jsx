export default function CreateQuizSignleAnswer({ question, editQuestion }) {

    const editOption = (id, index, value) => {
        const newOptions = question.options.map((opt, i) =>
            i === index ? value : opt
        );
        editQuestion(id, newOptions, "options");
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

            <div className="space-y-4">
                <p className="font-medium">Варианты ответа (выберите один правильный)</p>
                {question.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-x-4">
                        <input
                            type="radio"
                            name={`correct-${question.id}`}
                            checked={question.correctAnswer === option}
                            onChange={() => editQuestion(question.id, option, "correctAnswer")}
                        />

                        <input
                            className="border border-gray-500 px-3 py-2 flex-1 rounded"
                            type="text"
                            placeholder={`Вариант ${index + 1}`}
                            value={option}
                            onInput={(e) => editOption(question.id, index, e.target.value)}
                        />
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

            {question.correctAnswer && (
                <div className="mt-4 p-3 bg-green-100 border border-green-500 rounded">
                    <strong>Правильный ответ:</strong> {question.correctAnswer}
                </div>
            )}
        </div>
    );
}