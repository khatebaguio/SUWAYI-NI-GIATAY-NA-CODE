import { useSyncExternalStore } from "react";
import { read, write } from "./storage";

const STORAGE_KEY = "mise.favorites.v1";
const EMPTY: string[] = [];

let favorites = read<string[]>(STORAGE_KEY, []).filter(
  (id): id is string => typeof id === "string",
);
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return favorites;
}

function getServerSnapshot() {
  return EMPTY;
}

function persist(next: string[]) {
  favorites = next;
  write(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

export function toggleFavorite(id: string) {
  const next = favorites.includes(id)
    ? favorites.filter((favorite) => favorite !== id)
    : [...favorites, id];
  persist(next);
  return next.includes(id);
}

export function clearFavorites() {
  persist([]);
}

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    favorites: ids,
    isFavorite: (id: string) => ids.includes(id),
    toggle: toggleFavorite,
  };
}
