import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/use-auth";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AuthFormHeader } from "./auth-form-header";

export function SignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate(): string | null {
    if (!name.trim()) return "Please enter your full name.";
    if (!email.trim()) return "Please enter your email address.";
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (password !== confirm) return "Passwords do not match.";
    return null;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate("/user");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
      setLoading(false);
    }
  }

  return (
    <>
      <AuthFormHeader
        eyebrow="Get started"
        title="Create your account"
        subtitle="Start your recipe collection in seconds."
      />
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {error ? <p className="rounded-lg border border-red-500/20 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p> : null}
        <Input
          label="Full name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ava Moretti"
          required
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          hint="Use 8 or more characters."
          minLength={8}
          required
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Repeat your password"
          required
        />
        <Button variant="primary" size="lg" block disabled={loading} type="submit">
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-center text-sm text-emerald-950/65">
        Already have an account? <Link to="/auth/login" className="font-medium text-emerald-800 underline-offset-4 hover:underline">Sign in</Link>
      </p>
    </>
  );
}
