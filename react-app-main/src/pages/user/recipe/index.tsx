import { PageHeader } from "../../../components/common/page-header";
import { RecipeDetails } from "../../../components/features/recipe/recipe-details";

export function RecipePage() {
  return (
    <div className="main">
      <PageHeader compact backTo="/user" backLabel="My recipes" />
      <RecipeDetails />
    </div>
  );
}
