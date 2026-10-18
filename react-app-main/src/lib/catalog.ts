import type { Category, Difficulty } from "../types";

export const CATEGORIES: Category[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Drinks",
];

export const CUISINES: string[] = [
  "American",
  "Italian",
  "French",
  "Japanese",
  "Chinese",
  "Thai",
  "Indian",
  "Mexican",
  "Mediterranean",
  "Middle Eastern",
];

export const DIFFICULTY_LEVEL: Record<Difficulty, number> = {
  Easy: 1,
  Medium: 2,
  Hard: 3,
};

export function categorySlug(category: Category) {
  return category.toLowerCase();
}

export function formatMinutes(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest ? `${hours}h ${rest}m` : `${hours}h`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatRelativeDate(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const days = Math.floor((now - then) / 86_400_000);

  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return weeks === 1 ? "Last week" : `${weeks} weeks ago`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return months === 1 ? "Last month" : `${months} months ago`;
  }
  return formatDate(iso);
}

export function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
