export const STORAGE_KEYS = {
  users: "mise.users",
  session: "mise.session",
  recipes: "mise.recipes.v2",
} as const;

export function read<T>(key: string, fallback: T): T {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function write(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function delay(ms = 380) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function uid() {
  return crypto.randomUUID();
}
