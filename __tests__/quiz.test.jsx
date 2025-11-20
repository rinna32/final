import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import PlayQuizPage from '../src/pages/PlayQuizPage';
import QuizesPage from '../src/pages/QuizesPage';
import Login from '../src/pages/Login';
import NewQuizForm from '../src/components/NewQuizForm';
import QuizDirectQuestion from '../src/components/blocks/QuizDirectQuestion';
import QuizSingleAnswer from '../src/components/blocks/QuizSingleAnswer';
import QuizMultipleQuestion from '../src/components/blocks/QuizMultipleQuestion';

const renderWithProviders = (ui, { route = '/' } = {}) => {
    return render(
        <AuthProvider>
            <MemoryRouter initialEntries={[route]}>
                {ui}
            </MemoryRouter>
        </AuthProvider>
    );
};

test('страница квизов существует', () => {
    renderWithProviders(<QuizesPage />);
    expect(screen.getByText(/Мои квизы/i)).toBeInTheDocument();
});

test('страница прохождения показывает "Квиз не найден"', () => {
    renderWithProviders(<PlayQuizPage />, { route: '/quizes/999999' });
    expect(screen.getByText(/Квиз не найден/i)).toBeInTheDocument();
});

test('логин форма существует', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText(/логин/i)).toBeInTheDocument();
});

test('можно добавить вопрос в NewQuizForm', () => {
    renderWithProviders(<NewQuizForm />);
    const button = screen.getByText(/Добавить вопрос/i);
    fireEvent.click(button);
    expect(screen.getAllByText(/Введите текст вопроса/i).length).toBeGreaterThan(1);
});

test('кнопка сохранения квиза существует', () => {
    renderWithProviders(<NewQuizForm />);
    expect(screen.getByText(/Сохранить Квиз/i)).toBeInTheDocument();
});

test('QuizDirectQuestion рендерится', () => {
    render(<QuizDirectQuestion question="Сколько будет 2+2?" correctAnswer="4" />);
    expect(screen.getByText(/Сколько будет 2\+2\?/i)).toBeInTheDocument();
});

test('QuizSingleAnswer рендерит варианты', () => {
    render(
        <QuizSingleAnswer
            question="Столица России?"
            correctAnswer="Москва"
            variants={["Париж", "Москва", "Лондон"]}
        />
    );
    expect(screen.getByText(/Москва/i)).toBeInTheDocument();
});

test('QuizMultipleQuestion рендерит чекбоксы', () => {
    render(
        <QuizMultipleQuestion
            question="Какие языки программирования?"
            correctAnswersList={["JavaScript", "Python"]}
            variants={["JavaScript", "Python", "Java"]}
        />
    );
    expect(screen.getAllByRole('checkbox').length).toBe(3);
});

test('PlayQuizPage рендерит вопросы', async () => {
    const mockQuiz = {
        id: 1,
        title: "Тестовый квиз",
        quizQuestions: [
            { id: 1, type: "direct", question: "2+2?", correctAnswer: "4" }
        ]
    };
    localStorage.setItem("quizes", JSON.stringify([mockQuiz]));

    renderWithProviders(<PlayQuizPage />, { route: '/quizes/1' });

    expect(await screen.findByText(/Тестовый квиз/i)).toBeInTheDocument();
});

test('QuizesPage показывает сообщение если квизов нет', () => {
    localStorage.setItem("quizes", JSON.stringify([]));
    renderWithProviders(<QuizesPage />);
    expect(screen.getByText(/Пока нет ни одного квиза/i)).toBeInTheDocument();
});
