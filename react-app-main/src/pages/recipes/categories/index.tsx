import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Category, Recipe } from "../../../types";
import { getAllRecipesService } from "../../../services/recipe-service";
import { CATEGORIES, categorySlug } from "../../../lib/catalog";
import { Icon } from "../../../components/features/ui/icon";
import { RecipeGridSkeleton } from "../../../components/features/ui/skeleton";

const CATEGORY_BLURBS: Record<Category, string> = {
  Breakfast: "Slow mornings, warm stacks and first-coffee comfort.",
  Lunch: "Bright bowls, fresh breads and midday refuelling.",
  Dinner: "Slow braises, seared mains and table-worthy plates.",
  Dessert: "Bakes, tarts and sweet endings worth saving.",
  Drinks: "Shrubs, spritzes and something to raise a glass to.",
};

export function CategoriesPage() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [error, setError] = useState("");

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
          setError(err instanceof Error ? err.message : "Unable to load categories.");
          setRecipes([]);
        }
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const grouped = useMemo(() => {
    const map = new Map<Category, Recipe[]>();
    CATEGORIES.forEach((category) => map.set(category, []));
    (recipes ?? []).forEach((recipe) => {
      map.get(recipe.category)?.push(recipe);
    });
    return map;
  }, [recipes]);

  const coverFor = (category: Category) => {
    const list = grouped.get(category) ?? [];
    return list.find((recipe) => recipe.imageUrl)?.imageUrl ?? "";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-widest text-accent-light">Meal types</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Categories</h1>
        <p className="mt-2 text-sm text-mist">
          Explore the Recipe Book by the kind of meal you are craving.
        </p>
      </div>

      {error ? (
        <p role="alert" className="mb-6 rounded-xl border border-rose-700/40 bg-rose-700/15 p-4 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      {recipes === null ? (
        <RecipeGridSkeleton count={5} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => {
            const list = grouped.get(category) ?? [];
            const cover = coverFor(category);
            const href = `/recipes?category=${encodeURIComponent(category)}`;
            return (
              <Link
                key={category}
                to={href}
                className={`group relative flex min-h-56 flex-col justify-end overflow-hidden rounded-2xl border border-accent/20 bg-rb-900 p-5 transition hover:border-accent/50 cover-${categorySlug(category)}`}
              >
                {cover ? (
                  <img
                    src={cover}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover opacity-45 transition duration-500 group-hover:scale-105 group-hover:opacity-55"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-rb-950 via-rb-950/70 to-rb-950/20" />
                <div className="relative">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="font-serif text-2xl text-white">{category}</h2>
                    <span className="rounded-full bg-accent/20 px-2.5 py-1 text-xs font-semibold text-accent-light">
                      {list.length} {list.length === 1 ? "recipe" : "recipes"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-mist">{CATEGORY_BLURBS[category]}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-light">
                    View recipes
                    <Icon name="arrowRight" size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
