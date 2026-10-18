import type { Recipe, RecipePayload } from "../types";
import api, { apiErrorMessage } from "../lib/axios";

type RecipeResponse = Recipe | { recipe?: Recipe; data?: Recipe | { recipe?: Recipe } };
type RecipeListResponse = Recipe[] | { recipes?: Recipe[]; data?: Recipe[] };

function unwrapRecipe(response: RecipeResponse): Recipe {
  const outer = response as { recipe?: Recipe; data?: Recipe | { recipe?: Recipe } };
  const nested = outer.data;
  const recipe = outer.recipe ??
    (nested && typeof nested === "object" && "recipe" in nested ? nested.recipe : nested);
  if (!recipe || typeof recipe !== "object" || !("id" in recipe) || !("title" in recipe)) {
    throw new Error("The API response did not include a valid recipe.");
  }
  return normalizeRecipe(recipe as Recipe);
}

function unwrapRecipes(response: RecipeListResponse): Recipe[] {
  const outer = response as { recipes?: Recipe[]; data?: Recipe[] };
  const recipes = Array.isArray(response) ? response : outer.recipes ?? outer.data;
  if (!Array.isArray(recipes)) throw new Error("The API response did not include a recipes list.");
  return recipes.map((recipe) => normalizeRecipe(recipe));
}

function normalizeRecipe(recipe: Recipe): Recipe {
  return {
    ...recipe,
    imageUrl: typeof recipe.imageUrl === "string" ? recipe.imageUrl : "",
    cuisine: typeof recipe.cuisine === "string" && recipe.cuisine ? recipe.cuisine : "—",
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    steps: Array.isArray(recipe.steps) ? recipe.steps : [],
  };
}

async function request<T>(work: () => Promise<T>, fallback: string): Promise<T> {
  try {
    return await work();
  } catch (error) {
    throw new Error(apiErrorMessage(error, fallback));
  }
}

// GET /recipes/mine returns recipes owned by the signed-in user.
export function getRecipesService(): Promise<Recipe[]> {
  return request(async () => unwrapRecipes((await api.get<RecipeListResponse>("/recipes/mine")).data), "Unable to load your recipes.");
}

// GET /recipes/:id enforces ownership/administrator access on the server.
export function getRecipeService(id: string): Promise<Recipe> {
  return request(async () => unwrapRecipe((await api.get<RecipeResponse>(`/recipes/${encodeURIComponent(id)}`)).data), "Unable to load this recipe.");
}

// POST /recipes creates a recipe for the authenticated user.
export function createRecipeService(payload: RecipePayload): Promise<Recipe> {
  return request(async () => unwrapRecipe((await api.post<RecipeResponse>("/recipes", payload)).data), "Unable to create the recipe.");
}

// PUT /recipes/:id updates a recipe; server must check ownership/role.
export function updateRecipeService(id: string, payload: RecipePayload): Promise<Recipe> {
  return request(async () => unwrapRecipe((await api.put<RecipeResponse>(`/recipes/${encodeURIComponent(id)}`, payload)).data), "Unable to update the recipe.");
}

// DELETE /recipes/:id removes a recipe; server must check ownership/role.
export async function deleteRecipeService(id: string): Promise<void> {
  await request(async () => { await api.delete(`/recipes/${encodeURIComponent(id)}`); }, "Unable to delete the recipe.");
}

// GET /recipes returns the recipes visible to the signed-in user.
export function getAllRecipesService(): Promise<Recipe[]> {
  return request(async () => unwrapRecipes((await api.get<RecipeListResponse>("/recipes")).data), "Unable to load recipes.");
}
