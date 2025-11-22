import ReactDOM from "react-dom/client";
import './index.css';
import { router } from "./routes";
import { RouterProvider } from "react-router";
import { AuthProvider } from './context/AuthContext';



const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);