import { NavLink } from "react-router";


export default function QuizesPage() {
    const quizzes = JSON.parse(localStorage.getItem("quizes") || "[]");

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-4xl font-bold text-center mb-10">Мои квизы</h1>

            {quizzes.length === 0 ? (
                <p className="text-center text-gray-500 text-xl">
                    Пока нет ни одного квиза. Перейдите в админку и создайте первый!
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {quizzes.map((quiz) => (
                        <NavLink
                            key={quiz.id}
                            to={`/quizes/${quiz.id}`}
                            className="block p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all text-center border border-gray-200"
                        >
                            <h3 className="text-2xl font-semibold text-gray-800">
                                {quiz.title || "Без названия"}
                            </h3>
                            <p className="text-gray-500 mt-2">
                                Вопросов: {quiz.quizQuestions?.length || 0}
                            </p>
                        </NavLink>
                    ))}
                </div>
            )}
        </div>
    );
}