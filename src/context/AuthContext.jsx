/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = localStorage.getItem('currentUser');
        if (saved) {
            setUser(JSON.parse(saved));
        }
    }, []);

    const login = (username, password) => {
        let users = JSON.parse(localStorage.getItem('app_users') || '[]');

        if (username === 'admin' && password === '123') {
            const userData = { username: 'admin', favorites: users.find(u => u.username === 'admin')?.favorites || [] };
            setUser(userData);
            localStorage.setItem('currentUser', JSON.stringify(userData));
            return true;
        }

        const found = users.find(u => u.username === username && u.password === password);
        if (found) {
            const { password: _password, ...safeUser } = found;
            setUser(safeUser);
            localStorage.setItem('currentUser', JSON.stringify(safeUser));
            return true;
        }
        return false;
    };

    const register = (username, password) => {
        let users = JSON.parse(localStorage.getItem('app_users') || '[]');
        if (users.some(u => u.username === username)) return false;

        users.push({ username, password, favorites: [] });
        localStorage.setItem('app_users', JSON.stringify(users));
        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
    };

    const toggleFavorite = (item) => {
        if (!user) return;
        const updated = { ...user };
        if (!updated.favorites) updated.favorites = [];

        const index = updated.favorites.indexOf(item);
        if (index === -1) {
            updated.favorites.push(item);
        } else {
            updated.favorites.splice(index, 1);
        }

        setUser(updated);
        localStorage.setItem('currentUser', JSON.stringify(updated));
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, toggleFavorite }}>
            {children}
        </AuthContext.Provider>
    );
};