import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

export function Tag({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-900", className)}>
      {children}
    </span>
  );
}

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
}

export function Chip({ active, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={cn(
        "cursor-pointer rounded-full border border-emerald-900/20 px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-emerald-900 text-amber-50 hover:bg-emerald-950"
          : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
