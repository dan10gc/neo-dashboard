import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SurveillanceStatsSkeleton() {
  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm h-full">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-zinc-700">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-4 w-40" />
      </div>

      {/* Stats Grid */}
      <div className="space-y-6">
        {/* Stat 1 */}
        <div>
          <Skeleton className="h-3 w-32 mb-2" />
          <Skeleton className="h-12 w-24 mb-1" />
          <Skeleton className="h-2 w-20" />
        </div>

        {/* Stat 2 */}
        <div>
          <Skeleton className="h-3 w-40 mb-2" />
          <Skeleton className="h-12 w-16 mb-1" />
          <Skeleton className="h-2 w-24" />
        </div>

        {/* Stat 3 */}
        <div>
          <Skeleton className="h-3 w-28 mb-2" />
          <Skeleton className="h-12 w-32 mb-1" />
          <Skeleton className="h-2 w-16" />
        </div>

        {/* Stat 4 */}
        <div>
          <Skeleton className="h-3 w-36 mb-2" />
          <Skeleton className="h-12 w-28 mb-1" />
          <Skeleton className="h-2 w-20" />
        </div>
      </div>

      {/* Date Range Section */}
      <div className="mt-8 pt-6 border-t-2 border-zinc-700">
        <Skeleton className="h-3 w-24 mb-2" />
        <Skeleton className="h-4 w-full" />
      </div>
    </Card>
  );
}
