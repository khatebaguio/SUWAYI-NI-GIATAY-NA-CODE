import type { Difficulty } from "../../types";

interface RecipeMetaProps {
  cuisine: string;
  minutes: number;
  difficulty: Difficulty;
}

export function RecipeMeta({ cuisine, minutes, difficulty }: RecipeMetaProps) {
  return (
    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
      <div>
        <dt className="text-xs text-emerald-950/55">Cuisine</dt>
        <dd className="mt-1 font-medium text-emerald-950">{cuisine}</dd>
      </div>
      <div>
        <dt className="text-xs text-emerald-950/55">Difficulty</dt>
        <dd className="mt-1 font-medium text-emerald-950">{difficulty}</dd>
      </div>
      <div>
        <dt className="text-xs text-emerald-950/55">Cook time</dt>
        <dd className="mt-1 font-medium text-emerald-950">{minutes} mins</dd>
      </div>
    </dl>
  );
}
