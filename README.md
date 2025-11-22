# final

## Возможность проверить приложение без локального запуска:

finalquiz.vercel.app


## Описание проекта

Проект предназначен для пользователей, которые хотят создавать свои тесты и проходить их

## Установка и запуск

1. Откройте терминал.  
2. Перейдите в папку проекта:

cd final

3. Установите зависимости:

npm install

4. Для запуска проекта выполните команду:

npm run dev

5. В терминале появится ссылка на локальный сервер проекта (обычно [http://localhost:5173](http://localhost:5173)).
   Чтобы открыть сайт, скопируйте ссылку и вставьте её в браузер или зажмите **Ctrl + ЛКМ (Windows) / Command + ЛКМ (MacOS)**.

# Архитектура проекта

final/
├── tests/                      # Тесты проекта
├── .github/
│   └── workflows/              # Конфигурации GitHub Actions
├── coverage/                   # Отчёты покрытия тестами
├── node_modules/               # Установленные зависимости
├── public/                     # Статичные файлы (например, index.html)
├── src/
│   ├── assets/                 # Статичные ресурсы (картинки, иконки)
│   ├── components/
│   │   ├── blocks/             # Компоненты для квизов
│   │   │   ├── CreateQuizDirectQuestion.jsx
│   │   │   ├── CreateQuizMultipleAnswer.jsx
│   │   │   ├── CreateQuizSingleAnswer.jsx
│   │   │   ├── QuizDirectQuestion.jsx
│   │   │   ├── QuizMultipleQuestion.jsx
│   │   │   ├── QuizSingleAnswer.jsx
│   │   │   └── NewQuizForm.jsx
│   │   └── context/
│   │       └── AuthContext.jsx # Контекст аутентификации
│   ├── pages/                  # Страницы приложения
│   │   ├── AdminPage.jsx
│   │   ├── CreateQuizPage.jsx
│   │   ├── IndexPage.jsx
│   │   ├── MainLayout.jsx
│   │   ├── PlayQuizPage.jsx
│   │   └── QuizzesPage.jsx
│   ├── App.jsx                 # Главный компонент приложения
│   ├── data.js                 # Данные для приложения
│   ├── index.css               # Глобальные стили
│   ├── main.jsx                # Точка входа в приложение
│   ├── routes.js               # Настройка маршрутов
│   └── stores.js               # Хранилища состояния (например, Zustand/Pinia)
├── .gitignore
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md


## Технические требования

Для работы проекта требуется установить и использовать следующие инструменты и библиотеки:

* VS Code или другой редактор кода
* Node.js и npm
* React
* Vite
* Tailwind CSS
* react-router-dom

## Автор

Снитко Мария Олеговна