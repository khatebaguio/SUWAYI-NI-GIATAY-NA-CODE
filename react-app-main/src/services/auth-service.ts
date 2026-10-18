import type { PublicUser } from "../types";
import api, { AUTH_TOKEN_KEY, apiErrorMessage } from "../lib/axios";

type AuthResponse = {
  user?: PublicUser;
  data?: PublicUser | { user?: PublicUser };
  token?: string;
  accessToken?: string;
};

function extractUser(response: AuthResponse): PublicUser {
  const direct = response as unknown as Record<string, unknown>;
  if (typeof direct.id === "string" && typeof direct.email === "string") {
    return response as unknown as PublicUser;
  }
  const nested = response.data;
  const user = response.user ?? (nested && "user" in nested ? nested.user : nested);
  if (!user || typeof user !== "object" || !("id" in user) || !("email" in user)) {
    throw new Error("The API response did not include a valid user.");
  }
  return user as PublicUser;
}

function saveToken(response: AuthResponse) {
  const token = response.token ?? response.accessToken;
  if (token) localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function getCurrentUserId(): string | null {
  // Identity comes from the API session, not a locally fabricated user record.
  return null;
}

export function requireCurrentUser(): never {
  throw new Error("This action requires an authenticated API request.");
}

export async function loginService(email: string, password: string): Promise<PublicUser> {
  try {
    const { data } = await api.post<AuthResponse>("/auth/login", { email: email.trim(), password });
    saveToken(data);
    return extractUser(data);
  } catch (error) {
    throw new Error(apiErrorMessage(error, "Unable to sign in."));
  }
}

export async function signupService(name: string, email: string, password: string): Promise<PublicUser> {
  try {
    const { data } = await api.post<AuthResponse>("/auth/signup", {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    });
    saveToken(data);
    return extractUser(data);
  } catch (error) {
    throw new Error(apiErrorMessage(error, "Unable to create your account."));
  }
}

export async function sessionService(): Promise<PublicUser | null> {
  try {
    const { data } = await api.get<AuthResponse | PublicUser>("/auth/me");
    const response = data as AuthResponse;
    return extractUser(response);
  } catch (error) {
    if ((error as { response?: { status?: number } })?.response?.status === 401) return null;
    throw new Error(apiErrorMessage(error, "Unable to restore your session."));
  }
}

export async function logoutService(): Promise<void> {
  try {
    await api.post("/auth/logout");
  } catch {
    // Always clear the local token; the server may already have expired the session.
  }
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

export async function getUsersService(): Promise<PublicUser[]> {
  try {
    const { data } = await api.get<PublicUser[] | { users?: PublicUser[]; data?: PublicUser[] }>("/users");
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.users)) return data.users;
    if (Array.isArray(data.data)) return data.data;
    throw new Error("The API response did not include a users list.");
  } catch (error) {
    throw new Error(apiErrorMessage(error, "Unable to load users."));
  }
}
