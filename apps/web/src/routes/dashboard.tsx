import { AlertCircle } from "lucide-react";
import { Card } from "../components/ui/card";
import { Dashboard } from "../features/dashboard/dashboard";
import { useNeoDataQuery } from "../hooks/useNeoNasaQuery";

export function DashboardRoute() {
  const { data, isLoading, error, refetch } = useNeoDataQuery();

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex items-center justify-center font-mono">
        <Card className="bg-zinc-800/50 border-2 border-red-800/50 p-8 max-w-lg rounded-sm">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h2 className="text-xl font-bold text-red-400 uppercase tracking-wider">
              Failed to Load Data
            </h2>
          </div>
          <p className="text-zinc-300 mb-4 text-sm">
            We couldn't fetch asteroid data from NASA's API. Please check your
            API key or try again later.
          </p>
          <p className="text-xs text-zinc-500 mb-4 font-mono">
            Error: {error.message}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-sm transition-colors uppercase text-xs tracking-wider font-bold"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Main Dashboard Container */}
      <div className="container mx-auto px-6 py-8">
        <Dashboard data={data!} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
}
