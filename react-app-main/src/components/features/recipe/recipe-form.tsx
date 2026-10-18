import { useState } from "react";
import type { FormEvent } from "react";
import type { Category, Difficulty, Recipe, RecipePayload } from "../../../types";
import { CATEGORIES, CUISINES } from "../../../lib/catalog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Modal } from "../ui/modal";
import { Select } from "../ui/select";
import { Textarea } from "../ui/textarea";

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

interface RecipeFormProps {
  initial?: Recipe;
  onSubmit: (payload: RecipePayload) => Promise<void>;
  onClose: () => void;
}

export function RecipeForm({ initial, onSubmit, onClose }: RecipeFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [imageUrl, setImageUrl] = useState(initial?.imageUrl ?? "");
  const [cuisine, setCuisine] = useState(initial?.cuisine ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? "Dinner");
  const [minutes, setMinutes] = useState(String(initial?.minutes ?? 30));
  const [servings, setServings] = useState(String(initial?.servings ?? 2));
  const [difficulty, setDifficulty] = useState<Difficulty>(initial?.difficulty ?? "Easy");
  const [ingredients, setIngredients] = useState(initial?.ingredients.join("\n") ?? "");
  const [steps, setSteps] = useState(initial?.steps.join("\n") ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [previewFailed, setPreviewFailed] = useState(false);

  function handleImageChange(value: string) {
    setImageUrl(value);
    setPreviewFailed(false);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const ingredientList = ingredients
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    const stepList = steps
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!title.trim()) return setError("Give your recipe a name.");
    if (ingredientList.length === 0) return setError("Add at least one ingredient.");
    if (stepList.length === 0) return setError("Add at least one instruction.");

    setSaving(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        cuisine: cuisine.trim() || "—",
        category,
        minutes: Math.max(1, Number(minutes) || 1),
        servings: Math.max(1, Number(servings) || 1),
        difficulty,
        ingredients: ingredientList,
        steps: stepList,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  return (
    <Modal title={initial ? "Update Recipe" : "Add Recipe"} onClose={onClose}>
      <form className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <Input
            label="Name"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Charred Corn & Basil Bowl"
          />
        </div>
        <div>
          <Input
            label="Cuisine"
            type="text"
            list="cuisine-options"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            placeholder="e.g. Italian"
          />
          <datalist id="cuisine-options">
            {CUISINES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </div>
        <div>
          <Select
            label="Difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
          >
            {DIFFICULTIES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Input
            label="Cook Time (minutes)"
            type="number"
            min={1}
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          />
        </div>
        <div>
          <Select
            label="Meal Type"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Input
            label="Servings"
            type="number"
            min={1}
            value={servings}
            onChange={(e) => setServings(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            label="Short description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One appetizing sentence about the dish."
          />
        </div>
        <div className="sm:col-span-2">
          <Input
            label="Image URL"
            type="url"
            value={imageUrl}
            onChange={(e) => handleImageChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          {imageUrl.trim() && !previewFailed ? (
            <img
              className="mt-2 w-full rounded-xl border border-emerald-900/10 object-cover"
              style={{ maxHeight: 192 }}
              src={imageUrl.trim()}
              alt="Recipe preview"
              onError={() => setPreviewFailed(true)}
            />
          ) : null}
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Ingredients (one per line)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={4}
            placeholder={"One ingredient per line, e.g.\n250g ricotta\n3 eggs"}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            label="Instructions (one per line)"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows={4}
            placeholder={"One step per line, e.g.\nWhisk ricotta until smooth.\nCook 2 minutes per side."}
          />
        </div>
        {error ? (
          <p role="alert" className="text-sm text-red-600 sm:col-span-2">
            {error}
          </p>
        ) : null}
        <Button type="submit" disabled={saving} className="w-full sm:col-span-2">
          {saving ? "Saving…" : initial ? "Save Changes" : "Add Recipe"}
        </Button>
      </form>
    </Modal>
  );
}
