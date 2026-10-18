import { useEffect, useMemo, useState } from "react";
import type { Recipe, RecipePayload } from "../../../types";
import {
  createRecipeService,
  deleteRecipeService,
  getRecipesService,
} from "../../../services/recipe-service";
import { CATEGORIES } from "../../../lib/catalog";
import { useFavorites } from "../../../lib/favorites";
import { Button } from "../ui/button";
import { EmptyState } from "../ui/empty-state";
import { Modal } from "../ui/modal";
import { RecipeGridSkeleton } from "../ui/skeleton";
import { Chip } from "../ui/tag";
import { RecipeCard } from "./recipe-card";
import { RecipeForm } from "./recipe-form";

export function RecipeCollection() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Recipe | null>(null);
  const [busy, setBusy] = useState(false);
  const { isFavorite, toggle } = useFavorites();

  useEffect(() => {
    let active = true;

    async function loadRecipes() {
      try {
        const data = await getRecipesService();
        if (active) setRecipes(data);
      } catch {
        if (active) setError("Unable to load your recipes. Please try again.");
      }
    }

    loadRecipes();
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(() => {
    if (!recipes) return [];
    return recipes.filter((recipe) => !category || recipe.category === category);
  }, [recipes, category]);

  async function handleCreate(payload: RecipePayload) {
    setError("");
    const created = await createRecipeService(payload);
    setRecipes((current) => [created, ...(current ?? [])]);
    setShowCreate(false);
  }

  async function handleConfirmDelete() {
    if (!pendingDelete) return;
    setError("");
    setBusy(true);
    try {
      await deleteRecipeService(pendingDelete.id);
      setRecipes((current) => (current ?? []).filter((r) => r.id !== pendingDelete.id));
      setPendingDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete recipe.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by meal type">
          <Chip active={category === null} onClick={() => setCategory(null)}>
            All
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              active={category === c}
              onClick={() => setCategory(category === c ? null : c)}
            >
              {c}
            </Chip>
          ))}
        </div>
        <Button onClick={() => { setError(""); setShowCreate(true); }} type="button">
          Add Recipe
        </Button>
      </div>

      {error ? (
        <p role="alert" className="mb-4 rounded-xl border border-[#8b493b] bg-[#321d17] px-4 py-3 text-sm text-[#ffc0b8]">{error}</p>
      ) : null}

      {recipes === null ? (
        <RecipeGridSkeleton />
      ) : visible.length === 0 ? (
        recipes.length === 0 ? (
          <EmptyState
            title="A fresh page for your favorites"
            description="Save a family classic or something new you want to try."
            action={
              <Button onClick={() => setShowCreate(true)} type="button">
                Add your first recipe
              </Button>
            }
          />
        ) : (
          <EmptyState
            title="No recipes found"
            description="Try a different meal type filter."
          />
        )
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onDelete={setPendingDelete}
              favorite={isFavorite(recipe.id)}
              onToggleFavorite={(target) => toggle(target.id)}
            />
          ))}
        </div>
      )}

      {showCreate ? (
        <RecipeForm onSubmit={handleCreate} onClose={() => setShowCreate(false)} />
      ) : null}

      {pendingDelete ? (
        <Modal
          small
          title="Delete recipe?"
          subtitle={`“${pendingDelete.title}” will be removed permanently.`}
          onClose={() => setPendingDelete(null)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setPendingDelete(null)} type="button">
                Keep it
              </Button>
              <Button
                variant="danger"
                onClick={handleConfirmDelete}
                disabled={busy}
                type="button"
              >
                {busy ? "Deleting…" : "Delete"}
              </Button>
            </>
          }
        >
          <p className="text-sm text-emerald-950/65">This action cannot be undone.</p>
        </Modal>
      ) : null}
    </>
  );
}
