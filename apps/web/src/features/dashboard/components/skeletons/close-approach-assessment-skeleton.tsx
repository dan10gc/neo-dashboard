import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CloseApproachAssessmentSkeleton() {
  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
      {/* Title */}
      <Skeleton className="h-4 w-48 mb-6" />

      {/* Alert Level and Score */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1">
          {/* Alert level text */}
          <Skeleton className="h-8 w-32 mb-2" />
          {/* Description line 1 */}
          <Skeleton className="h-3 w-full max-w-md mb-2" />
          {/* Description line 2 */}
          <Skeleton className="h-3 w-3/4 max-w-xs" />
        </div>

        {/* Score circle */}
        <div className="flex items-center justify-center">
          <Skeleton className="h-20 w-20 rounded-full" />
        </div>
      </div>

      {/* Bottom section - Learn More link area */}
      <div className="pt-4 border-t-2 border-zinc-700">
        <Skeleton className="h-3 w-40" />
      </div>
    </Card>
  );
}
