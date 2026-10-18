import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className, children }: CardProps) {
  return <article className={cn("border border-emerald-900/10 rounded-2xl overflow-hidden bg-[#f7f8f0] shadow-sm", className)}>{children}</article>;
}
