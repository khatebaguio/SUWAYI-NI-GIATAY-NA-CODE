import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import type { Recipe } from "../../../types";
import { getAllRecipesService } from "../../../services/recipe-service";
import { CATEGORIES } from "../../../lib/catalog";
import { useFavorites } from "../../../lib/favorites";
import { EmptyState } from "../ui/empty-state";
import { Icon } from "../ui/icon";
import { RecipeGridSkeleton } from "../ui/skeleton";
import { Chip } from "../ui/tag";
import { RecipeCard } from "./recipe-card";

interface RecipeBrowserProps {
  favoritesOnly?: boolean;
  showSearch?: boolean;
  showCategories?: boolean;
  title?: string;
  subtitle?: string;
  emptyTitle: string;
  emptyDescription: string;
  emptyAction?: ReactNode;
}

export function RecipeBrowser({
  favoritesOnly = false,
  showSearch = true,
  showCategories = true,
  title,
  subtitle,
  emptyTitle,
  emptyDescription,
  emptyAction,
}: RecipeBrowserProps) {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites, isFavorite, toggle } = useFavorites();

  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const data = await getAllRecipesService();
        if (active) {
          setRecipes(data);
          setError("");
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load recipes.");
          setRecipes([]);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const visible = useMemo(() => {
    if (!recipes) return [];
    const q = query.trim().toLowerCase();
    return recipes.filter((recipe) => {
      if (favoritesOnly && !favorites.includes(recipe.id)) return false;
      const matchesQuery =
        !q ||
        recipe.title.toLowerCase().includes(q) ||
        recipe.description.toLowerCase().includes(q) ||
        recipe.cuisine.toLowerCase().includes(q) ||
        recipe.authorName.toLowerCase().includes(q) ||
        recipe.ingredients.some((item) => item.toLowerCase().includes(q));
      const matchesCategory = !category || recipe.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [recipes, query, category, favoritesOnly, favorites]);

  function updateParams(next: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams);
    Object.entries(next).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    setSearchParams(params, { replace: true });
  }

  function handleSearchChange(value: string) {
    updateParams({ q: value.trim() ? value : null });
  }

  function handleCategory(next: string | null) {
    updateParams({ category: next });
  }

  const heading = title ? (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-mist">{subtitle}</p> : null}
    </div>
  ) : null;

  const toolbar = (
    <div className="mb-6 flex flex-col gap-4">
      {showSearch ? (
        <div className="relative w-full max-w-xl">
          <Icon
            name="search"
            size={17}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mist"
          />
          <input
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Search by name, cuisine, cook or ingredient…"
            aria-label="Search recipes"
            className="w-full rounded-full border border-accent/25 bg-rb-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-mist/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
          />
        </div>
      ) : null}

      {showCategories ? (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by meal type">
          <Chip active={!category} onClick={() => handleCategory(null)}>
            All
          </Chip>
          {CATEGORIES.map((c) => (
            <Chip
              key={c}
              active={category === c}
              onClick={() => handleCategory(category === c ? null : c)}
            >
              {c}
            </Chip>
          ))}
        </div>
      ) : null}
    </div>
  );

  const body =
    error && recipes === null ? (
      <p role="alert" className="rounded-xl border border-rose-700/40 bg-rose-700/15 p-4 text-sm text-rose-700">
        {error}
      </p>
    ) : recipes === null ? (
      <RecipeGridSkeleton />
    ) : visible.length === 0 ? (
      <EmptyState
        icon="search"
        title={emptyTitle}
        description={emptyDescription}
        action={emptyAction}
      />
    ) : (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            favorite={isFavorite(recipe.id)}
            onToggleFavorite={(target) => toggle(target.id)}
          />
        ))}
      </div>
    );

  return (
    <>
      {heading}
      {toolbar}
      <p className="mb-4 text-sm text-mist">
        {recipes === null
          ? "Loading recipes…"
          : `${visible.length} ${visible.length === 1 ? "recipe" : "recipes"}${
              category ? ` in ${category}` : ""
            }${query ? ` matching “${query}”` : ""}`}
      </p>
      {body}
    </>
  );
}
