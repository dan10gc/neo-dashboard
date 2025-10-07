import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-left mb-12">
          <Skeleton className="h-10 w-96 mb-2" />
          <Skeleton className="h-6 w-80" />
          <Skeleton className="h-10 w-32 mt-4 rounded-lg" />
        </header>

        {/* Stats Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-800 p-6">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-8 w-20" />
            </Card>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="space-y-8 mb-12">
          <Card className="bg-zinc-900 border-zinc-800 p-6">
            <Skeleton className="h-6 w-64 mb-4" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </Card>
        </div>

        {/* Table Skeleton */}
        <Card className="bg-zinc-900 border-zinc-800 p-6">
          <Skeleton className="h-6 w-40 mb-4" />
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}