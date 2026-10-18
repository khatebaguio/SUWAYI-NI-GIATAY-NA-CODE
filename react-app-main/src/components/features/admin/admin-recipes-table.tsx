import { Link } from "react-router-dom";
import type { Recipe } from "../../../types";
import { Icon } from "../ui/icon";
import { Table, TableWrap } from "../ui/table";
import { Tag } from "../ui/tag";

interface AdminRecipesTableProps {
  recipes: Recipe[];
  loading?: boolean;
  query?: string;
  failedImages: Record<string, boolean>;
  onImageError: (id: string) => void;
}

export function AdminRecipesTable({
  recipes,
  loading,
  query,
  failedImages,
  onImageError,
}: AdminRecipesTableProps) {
  const emptyMessage =
    query && query.trim()
      ? "No recipes match your search."
      : "No recipes have been created yet.";

  function renderThumb(recipe: Recipe, size: string) {
    const showImage = recipe.imageUrl !== "" && !failedImages[recipe.id];
    return showImage ? (
      <img
        src={recipe.imageUrl}
        alt=""
        loading="lazy"
        className={`${size} shrink-0 rounded-lg object-cover`}
        onError={() => onImageError(recipe.id)}
      />
    ) : (
      <span
        className={`${size} flex shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-900`}
      >
        <Icon name="utensils" size={18} />
      </span>
    );
  }

  return (
    <>
      {/* Phones: stacked cards so every field stays readable without sideways scrolling. */}
      <ul className="grid gap-4 md:hidden">
        {!loading && recipes.length === 0 ? (
          <li className="rounded-2xl border border-[#68452F] bg-[#1D130E] px-5 py-6 text-center text-sm text-[#F5E6D3]/70">
            {emptyMessage}
          </li>
        ) : null}
        {recipes.map((recipe) => (
          <li
            key={recipe.id}
            className="rounded-2xl border border-[#68452F] bg-[#1D130E] p-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              {renderThumb(recipe, "h-14 w-14")}
              <div className="min-w-0 flex-1">
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="block truncate font-medium text-[#F5E6D3]"
                >
                  {recipe.title}
                </Link>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <Tag>{recipe.difficulty}</Tag>
                  <span className="text-xs text-[#E5C6A5]">{recipe.category}</span>
                </div>
              </div>
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[#68452F] pt-3 text-sm">
              <div>
                <dt className="text-xs text-[#a99a8b]">Cuisine</dt>
                <dd className="mt-0.5 text-[#F5E6D3]">{recipe.cuisine}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#a99a8b]">Meal type</dt>
                <dd className="mt-0.5 text-[#F5E6D3]">{recipe.category}</dd>
              </div>
              <div>
                <dt className="text-xs text-[#a99a8b]">Cook time</dt>
                <dd className="mt-0.5 text-[#F5E6D3]">{recipe.minutes} mins</dd>
              </div>
              <div className="min-w-0">
                <dt className="text-xs text-[#a99a8b]">Owner</dt>
                <dd className="mt-0.5 truncate text-[#F5E6D3]">
                  {recipe.authorName || "Unnamed user"}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      {/* Tablet & desktop: full table. */}
      <div className="hidden md:block">
        <TableWrap>
          <Table>
            <caption className="sr-only">Recipes from all users</caption>
            <thead>
              <tr>
                <th scope="col">Recipe</th>
                <th scope="col">Cuisine</th>
                <th scope="col">Meal type</th>
                <th scope="col">Difficulty</th>
                <th scope="col">Cook time</th>
                <th scope="col" className="hidden lg:table-cell">Owner ID</th>
                <th scope="col">Owner Name</th>
              </tr>
            </thead>
            <tbody>
              {!loading && recipes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    {emptyMessage}
                  </td>
                </tr>
              ) : null}
              {recipes.map((recipe) => (
                <tr key={recipe.id}>
                  <td>
                    <div className="flex min-w-40 items-center gap-3 sm:min-w-48">
                      {renderThumb(recipe, "h-12 w-12")}
                      <Link
                        to={`/recipe/${recipe.id}`}
                        className="font-medium text-emerald-950"
                      >
                        {recipe.title}
                      </Link>
                    </div>
                  </td>
                  <td>{recipe.cuisine}</td>
                  <td>{recipe.category}</td>
                  <td>
                    <Tag>{recipe.difficulty}</Tag>
                  </td>
                  <td>{recipe.minutes} mins</td>
                  <td className="hidden font-mono text-xs lg:table-cell">{recipe.authorId}</td>
                  <td>{recipe.authorName || "Unnamed user"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrap>
      </div>
    </>
  );
}
