import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../../lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "ghost"
  | "quiet"
  | "danger"
  | "dangerText"
  | "onDark"
  | "icon";

export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  children: ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-emerald-900 text-amber-50 hover:bg-emerald-950",
  secondary: "border border-emerald-900/20 bg-emerald-50 text-emerald-900 hover:bg-emerald-100",
  tertiary: "text-emerald-800 hover:text-emerald-950",
  ghost: "text-emerald-900 hover:bg-emerald-50",
  quiet: "text-emerald-900 hover:bg-emerald-50",
  danger: "bg-rose-50 text-rose-700 hover:bg-rose-100",
  dangerText: "text-rose-700 hover:bg-rose-50",
  onDark: "bg-white/90 text-emerald-950 hover:bg-white",
  icon: "p-2 hover:bg-emerald-50",
};

export function Button({
  variant = "primary",
  size = "md",
  block,
  className,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={cn(
        "cursor-pointer rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:opacity-60",
        variantClass[variant],
        size === "lg" && "px-5 py-3 text-base",
        size === "sm" && "px-3 py-1.5 text-xs",
        block && "w-full",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
