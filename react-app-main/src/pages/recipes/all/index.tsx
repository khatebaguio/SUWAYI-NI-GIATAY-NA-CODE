import { RecipeBrowser } from "../../../components/features/recipe/recipe-browser";

export function AllRecipesPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <RecipeBrowser
        title="All Recipes"
        subtitle="Browse every recipe shared across the Recipe Book."
        emptyTitle="No recipes yet"
        emptyDescription="Once cooks start adding dishes, they will appear here."
      />
    </section>
  );
}
