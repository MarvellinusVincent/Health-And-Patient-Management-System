import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Note: In React Router v6, components are structured differently
export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}