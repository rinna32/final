import { useEffect, useState } from "react";

export default function IndexPage() {

    const [time, setTime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadTime() {
            try {
                const response = await fetch("https://worldtimeapi.org/api/timezone/Europe/Moscow");
                const data = await response.json();
                const date = new Date(data.datetime);
                setTime(date.toLocaleString("ru-RU"));
            } catch {
                setTime("Не удалось загрузить время");
            } finally {
                setLoading(false);
            }
        }

        loadTime();
    }, []);

    return (
        <div>
            <p>Главная страница нашего сайта</p>

            <h3>Текущее время в Москве:</h3>

            {loading ? (
                <p>Загрузка...</p>
            ) : (
                <p><b>{time}</b></p>
            )}
        </div>
    );
}
