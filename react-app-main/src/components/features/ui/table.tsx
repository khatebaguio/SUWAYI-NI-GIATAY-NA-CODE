
import type { ReactNode } from "react";
import { cn } from "../../../lib/cn";

export function TableWrap({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-x-auto rounded-2xl border border-[#68452F] bg-[#1D130E]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Table({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <table
      className={cn(
        "w-full text-left text-sm text-[#F5E6D3] [&_th]:px-4 [&_th]:py-3 [&_th]:font-semibold [&_th]:text-[#E5C6A5] [&_td]:px-4 [&_td]:py-4 [&_thead]:bg-[#302016] [&_tbody_tr]:border-t [&_tbody_tr]:border-[#68452F] [&_tbody_tr]:transition-colors [&_tbody_tr:hover]:bg-[#302016] sm:[&_th]:px-5 sm:[&_th]:py-4 sm:[&_td]:px-5",
        className,
      )}
    >
      {children}
    </table>
  );
}
