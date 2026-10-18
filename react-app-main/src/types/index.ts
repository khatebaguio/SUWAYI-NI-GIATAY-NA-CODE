export type Role = "USER" | "ADMIN";

export type Category = "Breakfast" | "Lunch" | "Dinner" | "Dessert" | "Drinks";

export type Difficulty = "Easy" | "Medium" | "Hard";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export type PublicUser = Omit<User, "password">;

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cuisine: string;
  category: Category;
  minutes: number;
  servings: number;
  difficulty: Difficulty;
  ingredients: string[];
  steps: string[];
  authorId: string;
  authorName: string;
  createdAt: string;
}

export type RecipePayload = Omit<
  Recipe,
  "id" | "authorId" | "authorName" | "createdAt"
>;
