import type { TextareaHTMLAttributes } from "react";
import type { IconName } from "./icon";
import { Field } from "./label";
import { cn } from "../../../lib/cn";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  icon?: IconName;
}

export function Textarea({ label, hint, icon, className, ...rest }: TextareaProps) {
  return (
    <Field label={label} hint={hint} icon={icon} id={rest.id}>
      <textarea className={cn("w-full rounded-xl border border-emerald-900/15 bg-white/60 px-3 py-2.5 text-sm text-emerald-950 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/15", className)} {...rest} />
    </Field>
  );
}
