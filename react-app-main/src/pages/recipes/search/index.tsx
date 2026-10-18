import { Link } from "react-router-dom";
import { Button } from "../../../components/features/ui/button";
import { RecipeBrowser } from "../../../components/features/recipe/recipe-browser";

export function SearchPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <RecipeBrowser
        title="Search"
        subtitle="Find a dish by name, cuisine, cook or ingredient."
        emptyTitle="No recipes found"
        emptyDescription="Try a different search term or clear the meal type filter."
        emptyAction={
          <Link to="/recipes">
            <Button type="button">Browse all recipes</Button>
          </Link>
        }
      />
    </section>
  );
}
