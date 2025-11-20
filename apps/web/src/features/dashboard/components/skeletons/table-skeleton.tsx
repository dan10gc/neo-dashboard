import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-zinc-700">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Filter/Search area */}
        <Skeleton className="h-8 w-48" />
      </div>

      {/* Table Header Row */}
      <div className="grid grid-cols-6 gap-4 mb-4 pb-3 border-b border-zinc-700">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-3 w-16" />
      </div>

      {/* Table Rows */}
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-6 gap-4 py-3 border-b border-zinc-800"
            style={{
              // Stagger animation for realism
              animationDelay: `${index * 50}ms`,
            }}
          >
            {/* Name column - wider */}
            <Skeleton className="h-4 w-full" />
            {/* Hazard badge column */}
            <Skeleton className="h-4 w-12" />
            {/* Size column */}
            <Skeleton className="h-4 w-16" />
            {/* Velocity column */}
            <Skeleton className="h-4 w-20" />
            {/* Distance column */}
            <Skeleton className="h-4 w-24" />
            {/* Date column */}
            <Skeleton className="h-4 w-20" />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-zinc-700">
        <Skeleton className="h-3 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </Card>
  );
}
