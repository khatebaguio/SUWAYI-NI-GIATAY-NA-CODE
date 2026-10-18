import { useEffect, useMemo, useState } from "react";
import type { Recipe } from "../../../types";
import { getAllRecipesService } from "../../../services/recipe-service";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TableSkeleton } from "../ui/skeleton";
import { AdminRecipesTable } from "./admin-recipes-table";

export function AdminRecipes() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [reloadToken, setReloadToken] = useState(0);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const recipeData = await getAllRecipesService();
        if (!active) return;
        setRecipes(recipeData);
        setError("");
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load recipes.");
        setRecipes([]);
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [reloadToken]);

  function handleRefresh() {
    setRecipes(null);
    setFailedImages({});
    setReloadToken((token) => token + 1);
  }

  function markImageFailed(id: string) {
    setFailedImages((current) => ({ ...current, [id]: true }));
  }

  const visible = useMemo(() => {
    if (!recipes) return [];
    const q = query.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.authorName.toLowerCase().includes(q) ||
        r.cuisine.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q),
    );
  }, [recipes, query]);

  return (
    <section aria-label="All recipes">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="md:shrink-0">
          {recipes === null
            ? "Loading recipes…"
            : `${recipes.length} recipes across all users`}
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:flex-1 md:justify-end">
          <Input
            className="sm:min-w-0 sm:flex-1 sm:max-w-md"
            placeholder="Search by recipe, cook, cuisine or meal type…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search recipes"
          />
          <Button
            variant="secondary"
            disabled={recipes === null}
            onClick={handleRefresh}
            type="button"
            className="w-full shrink-0 sm:w-auto"
          >
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mb-4 rounded-xl bg-rose-50 p-4 text-rose-700">
          {error}
        </p>
      ) : null}

      {recipes === null ? (
        <TableSkeleton />
      ) : (
        <AdminRecipesTable
          recipes={visible}
          loading={false}
          query={query}
          failedImages={failedImages}
          onImageError={markImageFailed}
        />
      )}
    </section>
  );
}
