import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { type ReactElement } from "react"; // Importa ReactElement

export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};
