import type { ReactNode } from "react";
import type { IconName } from "./icon";
import { Icon } from "./icon";
import { cn } from "../../../lib/cn";

interface FieldProps {
  id?: string;
  label?: string;
  hint?: string;
  icon?: IconName;
  className?: string;
  children: ReactNode;
}

export function Field({ id, label, hint, icon, className, children }: FieldProps) {
  if (!label && !hint) {
    return <>{children}</>;
  }

  return (
    <label className={cn("block text-sm text-emerald-950/75", className)} htmlFor={id}>
      {label ? (
        <span className="mb-1 flex items-center gap-1.5">
          {icon ? <Icon name={icon} size={14} /> : null}
          {label}
        </span>
      ) : null}
      {children}
      {hint ? <span className="mt-1 block text-xs text-emerald-950/55">{hint}</span> : null}
    </label>
  );
}

export function Label({
  children,
  htmlFor,
  icon,
}: {
  children: ReactNode;
  htmlFor?: string;
  icon?: IconName;
}) {
  return (
    <label className="mb-1 block text-sm text-emerald-950/75" htmlFor={htmlFor}>
      {icon ? <Icon name={icon} size={14} /> : null}
      {children}
    </label>
  );
}
