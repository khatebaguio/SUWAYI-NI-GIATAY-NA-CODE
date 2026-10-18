import { Link } from "react-router-dom";
import { Button } from "../../../components/features/ui/button";
import { RecipeBrowser } from "../../../components/features/recipe/recipe-browser";

export function FavoritesPage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <RecipeBrowser
        favoritesOnly
        showSearch={false}
        title="My Favorites"
        subtitle="The recipes you have saved for later."
        emptyTitle="No favorites yet"
        emptyDescription="Tap the heart on any recipe to keep it here."
        emptyAction={
          <Link to="/recipes">
            <Button type="button">Browse all recipes</Button>
          </Link>
        }
      />
    </section>
  );
}
