import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { PublicUser } from "../../types";
import {
  loginService,
  logoutService,
  sessionService,
  signupService,
} from "../../services/auth-service";
import { AuthContext } from "./auth-state";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    async function restoreSession() {
      try {
        const current = await sessionService();
        if (active) setUser(current);
      } catch {
        if (active) setUser(null);
      } finally {
        if (active) setReady(true);
      }
    }

    restoreSession();

    return () => {
      active = false;
    };
  }, []);

  async function login(email: string, password: string) {
    const signedIn = await loginService(email, password);
    setUser(signedIn);
    return signedIn;
  }

  async function signup(name: string, email: string, password: string) {
    const created = await signupService(name, email, password);
    setUser(created);
    return created;
  }

  async function logout() {
    await logoutService();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, ready, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
