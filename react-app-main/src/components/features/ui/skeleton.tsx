import type { CSSProperties } from "react";
import { Table, TableWrap } from "./table";

export function Skeleton({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return <span className={`rb-pulse block rounded-lg bg-emerald-100 ${className ?? ""}`} style={style} />;
}

export function RecipeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-[#f7f8f0] shadow-sm" key={index}>
          <Skeleton style={{ height: 224 }} />
          <div className="flex flex-col gap-4 p-5">
            <Skeleton className="h-5" style={{ width: "70%" }} />
            <Skeleton className="h-5" style={{ width: "90%" }} />
            <Skeleton className="h-5" style={{ width: "55%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div aria-hidden="true">
      <TableWrap>
        <Table>
          <tbody>
            {Array.from({ length: rows }).map((_, index) => (
              <tr key={index}>
                <td>
                  <Skeleton className="h-12 w-12" />
                </td>
                <td colSpan={6}>
                  <Skeleton className="h-5" style={{ width: "40%" }} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrap>
    </div>
  );
}
