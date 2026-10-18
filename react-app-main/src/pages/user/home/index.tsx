import { RecipeCollection } from "../../../components/features/recipe/recipe-collection";

export function UserHomePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <section className="rb-hero" aria-label="Recipe Book introduction">
        <div className="rb-hero-content">
          <p className="text-xs uppercase tracking-widest text-accent-light">
            Your kitchen companion
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
            Recipe Book
          </h2>
          <p className="mt-3 max-w-xl text-sm text-mist sm:text-base">
            Keep your favorite meals in one place.
          </p>
        </div>
      </section>
      <div id="recipe-collection">
        <RecipeCollection />
      </div>
    </section>
  );
}
