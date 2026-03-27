import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AppContext";
import InteractiveBackground from "../background/InteractiveBackground";

export default function ProtectedRoute({ children }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <InteractiveBackground />
            {children ? children : <Outlet />}
        </>
    );
}
