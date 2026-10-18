import { useState } from "react";
import { Link } from "react-router-dom";
import type { Recipe } from "../../../types";
import { RecipeMeta } from "../../common/recipe-meta";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Icon } from "../ui/icon";
import { Tag } from "../ui/tag";

interface RecipeCardProps {
  recipe: Recipe;
  onDelete?: (recipe: Recipe) => void;
  favorite?: boolean;
  onToggleFavorite?: (recipe: Recipe) => void;
}

export function RecipeCard({
  recipe,
  onDelete,
  favorite = false,
  onToggleFavorite,
}: RecipeCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = recipe.imageUrl !== "" && !imageFailed;
  const href = `/recipe/${recipe.id}`;

  return (
    <Card className="group flex h-full flex-col transition-shadow hover:shadow-lg hover:shadow-black/40">
      <div className="relative h-56 overflow-hidden bg-emerald-100">
        {showImage ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="flex h-full flex-col items-center justify-center gap-2 text-emerald-950/60">
            <Icon name="utensils" size={26} />
            <span className="text-sm">Photo coming soon</span>
          </span>
        )}

        {onToggleFavorite ? (
          <button
            type="button"
            onClick={() => onToggleFavorite(recipe)}
            aria-label={favorite ? `Remove ${recipe.title} from favorites` : `Save ${recipe.title} to favorites`}
            aria-pressed={favorite}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white shadow-lg backdrop-blur transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            style={{ background: "rgba(16,11,8,.72)", color: favorite ? "#d1a47d" : "#fff8f0" }}
          >
            <Icon name={favorite ? "heartFilled" : "heart"} size={17} />
          </button>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <h3 className="text-lg font-semibold tracking-tight text-emerald-950">
          <Link to={href}>{recipe.title}</Link>
        </h3>

        <RecipeMeta
          cuisine={recipe.cuisine}
          minutes={recipe.minutes}
          difficulty={recipe.difficulty}
        />

        <div className="flex flex-wrap gap-1.5">
          <Tag>{recipe.category}</Tag>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
          <Link to={href} className="w-full">
            <Button className="w-full" type="button">
              View
            </Button>
          </Link>
          {onDelete ? (
            <Button
              onClick={() => onDelete(recipe)}
              className="bg-rose-50 text-rose-700 hover:bg-rose-100"
              type="button"
            >
              Delete
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
