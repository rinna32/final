// src/pages/Login.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export default function Login() {
    const [isReg, setIsReg] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, register } = useAuth();
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        setError('');
        let ok;
        if (isReg) {
            ok = register(username, password);
            if (!ok) return setError('Такой пользователь уже есть');
        } else {
            ok = login(username, password);
            if (!ok) return setError('Неверный логин или пароль');
        }
        navigate('/');
    };

    return (
        <div className="login-page">
            <h2>{isReg ? 'Регистрация' : 'Вход'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={submit}>
                <input placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} required />
                <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} required />
                <button type="submit">{isReg ? 'Зарегистрироваться' : 'Войти'}</button>
            </form>
            <p>
                <button type="button" onClick={() => setIsReg(!isReg)} style={{ background: 'none', border: 'none', color: '#0066cc', cursor: 'pointer' }}>
                    {isReg ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                </button>
            </p>
            <p style={{ fontSize: '14px', color: '#666' }}>Подсказка: admin / 123</p>
        </div>
    );
}