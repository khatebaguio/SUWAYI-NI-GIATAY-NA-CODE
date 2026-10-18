import axios from "axios";

export const apiBaseUrl = import.meta.env.VITE_API_URL ?? "/api";
export const AUTH_TOKEN_KEY = "mise.authToken";

export const api = axios.create({
  baseURL: apiBaseUrl.replace(/\/$/, ""),
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  // Supports bearer-token APIs. Cookie-based Express sessions also work via withCredentials.
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function apiErrorMessage(error: unknown, fallback = "The request failed. Please try again.") {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { message?: unknown; error?: unknown } | undefined;
    if (typeof data?.message === "string") return data.message;
    if (typeof data?.error === "string") return data.error;
    if (error.code === "ERR_NETWORK") {
      return "Cannot connect to the API. Check that the Express server is running and VITE_API_URL is correct.";
    }
    if (error.response?.status === 401) return "Your session has expired. Please sign in again.";
  }
  return error instanceof Error ? error.message : fallback;
}

export default api;
