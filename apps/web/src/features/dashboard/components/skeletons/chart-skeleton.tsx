import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface ChartSkeletonProps {
  /** Title for the chart section */
  title?: string;
  /** Show stats boxes above the chart */
  showStats?: boolean;
  /** Number of stat boxes to show */
  statCount?: number;
}

export function ChartSkeleton({
  showStats = true,
  statCount = 2
}: ChartSkeletonProps) {
  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-zinc-700">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Stats Boxes (optional) */}
      {showStats && (
        <div className="mb-6 flex flex-wrap gap-4">
          {Array.from({ length: statCount }).map((_, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 p-4 rounded-sm border border-zinc-700/50 inline-block"
            >
              <Skeleton className="h-3 w-32 mb-1" />
              <Skeleton className="h-10 w-20 mb-1" />
              <Skeleton className="h-2 w-24" />
            </div>
          ))}
        </div>
      )}

      {/* Info Notice (optional - for peak activity, etc.) */}
      <Skeleton className="h-12 w-full mb-6 rounded-sm" />

      {/* Chart Area */}
      <div className="bg-zinc-900/30 p-4 rounded-sm border border-zinc-700/50">
        {/* Chart placeholder with grid lines suggestion */}
        <div className="h-[400px] flex items-end justify-around gap-2 px-4">
          {/* Simulated bar chart or scatter points */}
          {Array.from({ length: 7 }).map((_, index) => (
            <Skeleton
              key={index}
              className="w-full"
              style={{
                height: `${Math.random() * 60 + 40}%`,
              }}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-zinc-700/50">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-24" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-3 rounded-sm" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>
    </Card>
  );
}
