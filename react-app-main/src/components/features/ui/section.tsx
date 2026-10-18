import type { ReactNode } from "react";

interface SectionProps {
  title: string;
  meta?: ReactNode;
  action?: ReactNode;
}

export function Section({ title, meta, action }: SectionProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {meta ? <p className="mt-1 text-sm text-emerald-950/60">{meta}</p> : null}
      </div>
      {action}
    </div>
  );
}
