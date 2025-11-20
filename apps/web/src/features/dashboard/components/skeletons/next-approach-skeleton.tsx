import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NextApproachSkeleton() {
  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-zinc-700">
        <Skeleton className="h-4 w-48" />
      </div>

      {/* Asteroid Name */}
      <Skeleton className="h-6 w-56 mb-6" />

      {/* Details Grid */}
      <div className="space-y-4 mb-6">
        {/* Detail row 1 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Detail row 2 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Detail row 3 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
        {/* Detail row 4 */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* Countdown Section */}
      <div className="bg-zinc-900/50 p-4 rounded-sm border border-cyan-700/50 mb-6">
        <div className="flex items-center justify-center">
          <Skeleton className="h-16 w-48" />
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-2 w-2 rounded-full" />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t-2 border-zinc-700">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
    </Card>
  );
}
