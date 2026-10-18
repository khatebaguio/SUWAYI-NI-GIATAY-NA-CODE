import type { SelectHTMLAttributes } from "react";
import { Field } from "./label";
import { cn } from "../../../lib/cn";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
}

export function Select({ label, hint, className, children, ...rest }: SelectProps) {
  return (
    <Field label={label} hint={hint} id={rest.id}>
      <select className={cn("w-full rounded-xl border border-emerald-900/15 bg-white/60 px-3 py-2.5 text-sm text-emerald-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15", className)} {...rest}>
        {children}
      </select>
    </Field>
  );
}
