import QuizDirectQuestion from "../components/blocks/QuizDirectQuestion";
import QuizSingleAnswer from "../components/blocks/QuizSingleAnswer";
import QuizMultipleQuestion from "../components/blocks/QuizMultipleQuestion";
import { useParams } from "react-router";


export default function PlayQuizPage() {
    const { id } = useParams();
    const quizes = JSON.parse(localStorage.getItem("quizes") || "[]");
    const currentQuiz = quizes.find((q) => String(q.id) === String(id));

    if (!currentQuiz) {
        return <h2 className="text-center text-3xl mt-20">Квиз не найден</h2>;
    }

    const questions = currentQuiz.quizQuestions || [];

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-4xl font-bold text-center mb-10">
                {currentQuiz.title}
            </h1>

            <div className="space-y-16">
                {questions.map((question) => (
                    <div key={question.id || Date.now()}>
                        <p className="text-xl font-medium mb-4 text-gray-600">
                            Вопрос {questions.indexOf(question) + 1} из {questions.length}
                        </p>

                        {question.type === "direct" && (
                            <QuizDirectQuestion
                                question={question.question}
                                correctAnswer={question.correctAnswer}
                            />
                        )}

                        {question.type === "single" && (
                            <QuizSingleAnswer
                                question={question.question}
                                correctAnswer={question.correctAnswer}
                                variants={question.options}
                            />
                        )}

                        {question.type === "multiple" && (
                            <QuizMultipleQuestion
                                question={question.question}
                                correctAnswersList={question.correctAnswer}
                                variants={question.options}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}