import { AlertCircle, AlertTriangle, Satellite } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Dashboard } from "../features/dashboard/dashboard";
import { useNeoDataQuery } from "../hooks/useNeoNasaQuery";

export function DashboardRoute() {
  const { data, isLoading, error, refetch } = useNeoDataQuery();

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex items-center justify-center font-mono">
        <Card className="bg-zinc-800/50 border-2 border-red-800/50 p-8 max-w-lg rounded-sm">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="h-10 w-10 text-red-500 shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-red-400 uppercase tracking-wider">
                Data Fetch Failed
              </h2>
              <p className="text-xs text-red-500/70 uppercase tracking-wide mt-0.5">
                API Connection Error
              </p>
            </div>
          </div>
          <div className="mb-6 p-4 bg-zinc-900/50 border-l-4 border-red-700 rounded-sm">
            <p className="text-zinc-300 text-sm leading-relaxed mb-2">
              Unable to retrieve asteroid data from NASA's NEO API. This could
              be due to network issues, API rate limits, or invalid credentials.
            </p>
            <p className="text-xs text-zinc-500 font-mono mt-3">
              Error: {error?.message}
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-sm transition-colors uppercase text-xs tracking-wider font-bold border-2 border-red-700"
            >
              Retry Connection
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // No data state (fetch succeeded but returned null/undefined)
  if (!isLoading && !data) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex items-center justify-center font-mono">
        <Card className="bg-zinc-800/50 border-2 border-yellow-800/50 p-8 max-w-lg rounded-sm">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-10 w-10 text-yellow-500 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-yellow-400 uppercase tracking-wider">
                No Data Available
              </h2>
              <p className="text-xs text-yellow-500/70 uppercase tracking-wide mt-0.5">
                Empty Response Received
              </p>
            </div>
          </div>
          <div className="mb-6 p-4 bg-zinc-900/50 border-l-4 border-yellow-700 rounded-sm">
            <p className="text-zinc-300 text-sm leading-relaxed">
              The API request completed successfully, but no asteroid data was
              returned. This may indicate no objects are approaching Earth in
              the monitored timeframe, or the API is experiencing issues.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-sm transition-colors uppercase text-xs tracking-wider font-bold border-2 border-yellow-700"
            >
              <Satellite className="h-4 w-4" />
              Rescan System
            </button>
          </div>
          <div className="mt-6 pt-4 border-t-2 border-zinc-700">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              <span className="text-yellow-500">●</span> System Status: STANDBY
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Main Dashboard Container */}
      <div className="container mx-auto px-6 py-8">
        <Dashboard data={data} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
}
