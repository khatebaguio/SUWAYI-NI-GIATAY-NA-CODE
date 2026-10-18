import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import type { Recipe, RecipePayload } from "../../../types";
import {
  deleteRecipeService,
  getRecipeService,
  updateRecipeService,
} from "../../../services/recipe-service";
import {
  categorySlug,
  formatDate,
  formatMinutes,
  formatRelativeDate,
} from "../../../lib/catalog";
import { useFavorites } from "../../../lib/favorites";
import { Button } from "../ui/button";
import { EmptyState } from "../ui/empty-state";
import { Icon } from "../ui/icon";
import type { IconName } from "../ui/icon";
import { Modal } from "../ui/modal";
import { Spinner } from "../ui/spinner";
import { Tag } from "../ui/tag";
import { RecipeForm } from "./recipe-form";

export function RecipeDetails() {
  const { id } = useParams<string>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [busy, setBusy] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const { isFavorite, toggle } = useFavorites();
  const favorite = recipe ? isFavorite(recipe.id) : false;

  useEffect(() => {
    if (!id) return;
    const recipeId = id;
    let active = true;

    async function load() {
      try {
        const data = await getRecipeService(recipeId);
        if (!active) return;
        setRecipe(data);
        setChecked({});
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Unable to load recipe.");
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [id]);

  async function handleUpdate(payload: RecipePayload) {
    if (!id) return;
    const updated = await updateRecipeService(id, payload);
    setRecipe(updated);
    setImageFailed(false);
    setShowEdit(false);
  }

  async function handleDelete() {
    if (!id) return;
    setBusy(true);
    try {
      await deleteRecipeService(id);
      navigate("/user");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete recipe.");
      setBusy(false);
      setShowDelete(false);
    }
  }

  if (error && !recipe) {
    return (
      <EmptyState
        icon="image"
        title="Recipe unavailable"
        description={error}
        action={
          <Link className="btn btn-primary" to="/user">
            Back to your recipes
          </Link>
        }
      />
    );
  }

  if (!recipe) return <Spinner />;

  const showImage = recipe.imageUrl !== "" && !imageFailed;

  const facts: Array<{ label: string; value: string; icon: IconName }> = [
    { label: "Cuisine", value: recipe.cuisine, icon: "globe" },
    { label: "Meal type", value: recipe.category, icon: "utensils" },
    { label: "Cook time", value: formatMinutes(recipe.minutes), icon: "clock" },
    { label: "Servings", value: String(recipe.servings), icon: "users" },
    { label: "Difficulty", value: recipe.difficulty, icon: "flame" },
    { label: "Added", value: formatRelativeDate(recipe.createdAt), icon: "book" },
  ];

  return (
    <>
      <div className={`detail-media cover-${categorySlug(recipe.category)}`}>
        {showImage ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="card-placeholder">
            <Icon name="utensils" size={32} />
            <span className="card-placeholder-text">Photo coming soon</span>
          </span>
        )}
      </div>

      <section className="detail-head">
        <div className="detail-heading">
          <div>
            <Tag>{recipe.category}</Tag>
            <h1 className="detail-title">{recipe.title}</h1>
            <p className="detail-desc">{recipe.description}</p>
          </div>
          <div className="detail-actions-top">
            <Button
              variant="ghost"
              onClick={() => toggle(recipe.id)}
              aria-pressed={favorite}
              type="button"
            >
              <Icon name={favorite ? "heartFilled" : "heart"} size={15} />
              {favorite ? "Saved" : "Save"}
            </Button>
            <Button variant="ghost" onClick={() => setShowEdit(true)} type="button">
              <Icon name="pencil" size={15} />
              Edit
            </Button>
            <Button
              variant="dangerText"
              className="btn-quiet"
              onClick={() => setShowDelete(true)}
              type="button"
            >
              <Icon name="trash" size={15} />
              Delete
            </Button>
          </div>
        </div>

        <div className="detail-facts">
          {facts.map((fact) => (
            <div className="detail-fact" key={fact.label}>
              <span className="detail-fact-icon">
                <Icon name={fact.icon} size={15} />
              </span>
              <div>
                <div className="detail-fact-label">{fact.label}</div>
                <div className="detail-fact-value">{fact.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="detail-columns">
        <aside className="panel">
          <div className="panel-head">
            <h2 className="panel-title">Ingredients</h2>
            <span className="panel-count">{recipe.ingredients.length}</span>
          </div>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>
                <label className={checked[index] ? "ingredient checked" : "ingredient"}>
                  <input
                    type="checkbox"
                    checked={Boolean(checked[index])}
                    onChange={() =>
                      setChecked((current) => ({
                        ...current,
                        [index]: !current[index],
                      }))
                    }
                  />
                  <span className="ingredient-box" aria-hidden="true">
                    <Icon name="check" size={12} />
                  </span>
                  <span className="ingredient-text">{ingredient}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="panel-note">Tick ingredients off as you cook.</p>
        </aside>

        <section className="panel">
          <div className="panel-head">
            <h2 className="panel-title">Instructions</h2>
            <span className="panel-count">{recipe.steps.length} steps</span>
          </div>
          <ol className="step-list">
            {recipe.steps.map((step, index) => (
              <li key={`${step}-${index}`}>
                <span className="step-index">{index + 1}</span>
                <p className="step-text">{step}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="detail-footnote">
        {recipe.difficulty} · added {formatDate(recipe.createdAt)} · by {recipe.authorName}
      </p>

      {showEdit ? (
        <RecipeForm
          initial={recipe}
          onSubmit={handleUpdate}
          onClose={() => setShowEdit(false)}
        />
      ) : null}

      {showDelete ? (
        <Modal
          small
          title="Delete recipe?"
          subtitle={`“${recipe.title}” will be removed permanently.`}
          onClose={() => setShowDelete(false)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setShowDelete(false)} type="button">
                Keep it
              </Button>
              <Button variant="danger" onClick={handleDelete} disabled={busy} type="button">
                {busy ? "Deleting…" : "Delete"}
              </Button>
            </>
          }
        >
          <p className="muted">This action cannot be undone.</p>
        </Modal>
      ) : null}
    </>
  );
}
