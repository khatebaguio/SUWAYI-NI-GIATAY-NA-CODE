import type { ReactNode } from "react";
import type { IconName } from "./icon";

interface EmptyStateProps {
  icon?: IconName;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-accent/25 bg-rb-900 px-6 py-16 text-center">
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-mist">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
