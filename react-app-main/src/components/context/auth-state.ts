import { createContext } from "react";
import type { PublicUser } from "../../types";

export interface AuthContextValue {
  user: PublicUser | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<PublicUser>;
  signup: (name: string, email: string, password: string) => Promise<PublicUser>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
