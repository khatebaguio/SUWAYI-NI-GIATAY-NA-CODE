import { Navigate, Outlet } from "react-router-dom";
import type { Role } from "../../types";
import { useAuth } from "./use-auth";
import { Spinner } from "../features/ui/spinner";

export function ProtectedRoute({ role }: { role?: Role }) {
  const { user, ready } = useAuth();

  if (!ready) {
    return <Spinner />;
  }

  if (!user) return <Navigate to="/auth/login" replace />;
  if (role && user.role !== role) {
    return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
  }

  return <Outlet />;
}
