import { StrictMode } from "react";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/context/auth-context";
import { useAuth } from "./components/context/use-auth";
import { ProtectedRoute } from "./components/context/protected-route";
import { Navbar } from "./components/features/layout/navbar";
import { Spinner } from "./components/features/ui/spinner";
import { AuthLayout } from "./pages/auth/layout";
import { LoginPage } from "./pages/auth/login";
import { SignupPage } from "./pages/auth/signup";
import { UserHomePage } from "./pages/user/home";
import { RecipePage } from "./pages/user/recipe";
import { AdminHomePage } from "./pages/admin/home";
import { AllRecipesPage } from "./pages/recipes/all";
import { CategoriesPage } from "./pages/recipes/categories";
import { FavoritesPage } from "./pages/recipes/favorites";
import { SearchPage } from "./pages/recipes/search";
import "./styles/global.css";

function RootRedirect() {
  const { user, ready } = useAuth();
  if (!ready) return <Spinner />;
  if (!user) return <Navigate to="/auth/login" replace />;
  return <Navigate to={user.role === "ADMIN" ? "/admin" : "/user"} replace />;
}

function Shell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
      </Route>
      <Route path="/" element={<RootRedirect />} />
      <Route
        element={
          <Shell>
            <ProtectedRoute />
          </Shell>
        }
      >
        <Route path="/recipes" element={<AllRecipesPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Route>
      <Route
        element={
          <Shell>
            <ProtectedRoute role="USER" />
          </Shell>
        }
      >
        <Route path="/user" element={<UserHomePage />} />
      </Route>
      <Route
        element={
          <Shell>
            <ProtectedRoute role="ADMIN" />
          </Shell>
        }
      >
        <Route path="/admin" element={<AdminHomePage />} />
      </Route>
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
