import { useParams } from "react-router"
import QuizDirectQuestion from "../components/blocks/QuizDirectQuestion"
import QuizSingleAnswer from "../components/blocks/QuizSingleAnswer"
import QuizMultipleQuestion from "../components/blocks/QuizMultipleQuestion"

export default function PlayQuizPage() {

    const { id } = useParams()

    const quizes = JSON.parse(localStorage.getItem("quizes")) || []

    const currentQuiz = quizes.find(q => String(q.id) === String(id))

    if (!currentQuiz) {
        return <h2>Квиз не найден</h2>
    }

    // ИСПРАВЛЕНО: теперь берём quizQuestions
    const questions = currentQuiz.quizQuestions || []

    return (
        <div>
            <h1>{currentQuiz.title}</h1>

            <div>
                {questions.map((question, index) => {
                    switch (question.type) {

                        case "direct":
                            return (
                                <QuizDirectQuestion
                                    key={index}
                                    question={question.question}
                                    correctAnswer={question.correctAnswer}
                                />
                            )

                        case "single":   // ИСПРАВЛЕНО
                            return (
                                <QuizSingleAnswer
                                    key={index}
                                    question={question.question}
                                    correctAnswer={question.correctAnswer}
                                    variants={question.options}
                                />
                            )

                        case "multiple":
                            return (
                                <QuizMultipleQuestion
                                    key={index}
                                    correctAnswersList={question.correctAnswer}
                                    question={question.question}
                                    variants={question.options}
                                />
                            )

                        default:
                            return null
                    }
                })}
            </div>
        </div>
    )
}
