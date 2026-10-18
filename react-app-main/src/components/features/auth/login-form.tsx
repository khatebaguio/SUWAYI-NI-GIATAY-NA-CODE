import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AuthFormHeader } from "./auth-form-header";

export function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setLoading(true);
    try {
      const user = await login(email, password);
      navigate(user.role === "ADMIN" ? "/admin" : "/user");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
      setLoading(false);
    }
  }

  return (
    <>
      <AuthFormHeader
        title="Sign in to Recipe Book."
        subtitle="Welcome back! Find the recipes you love and get cooking."
      />
      <form className="mt-8 grid gap-5" onSubmit={handleSubmit} noValidate>
        <div>
          <Input
            label="Email"
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Input
            label="Password"
            id="auth-password"
            type="password"
            autoComplete="current-password"
            minLength={1}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? <p role="alert" className="text-sm text-red-600">{error}</p> : null}
        <Button
          type="submit"
          disabled={loading}
          className="mt-1 bg-emerald-900 py-3 font-medium hover:bg-emerald-950 disabled:cursor-wait disabled:opacity-60"
        >
          {loading ? "Please wait…" : "Sign in"}
        </Button>
      </form>
      <Link
        className="mt-6 block text-center text-sm text-emerald-900 underline underline-offset-4"
        to="/auth/signup"
      >
        New here? Create an account
      </Link>
    </>
  );
}
