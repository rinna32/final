import { NavLink, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
export default function MainLayout() {

    const { user, logout } = useAuth();

    return (


        <div className="container mx-auto">
            <header className="flex gap-x-5 justify-end py-4">
                <NavLink to="/">Главная</NavLink>
                <NavLink to="/admin">Админка</NavLink>
                <NavLink to="/quizes">Квизы!</NavLink>
                {user ? (
                    <>
                        <span>Привет, {user.username}!</span>
                        <button
                            onClick={logout}
                            style={{
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                marginLeft: "10px"
                            }}
                        >
                            Выйти
                        </button>
                    </>
                ) : (
                    <NavLink to="/login">Войти</NavLink>
                )}
            </header>


            <main>
                <Outlet />
            </main>

            <footer>

            </footer>
        </div>

    )
}
