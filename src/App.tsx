import { AsteroidTable } from "./components/asteroid-table";
import { StatsCard } from "./components/stats-card";
import { Card } from "./components/ui/card";
import { useNeoDataQuery } from "./hooks/useNeoNasaQuery";
import { DashboardSkeleton } from "./components/dashboard-skeleton";
import { AlertCircle } from "lucide-react";

function App() {
  const { data, isLoading, error, refetch } = useNeoDataQuery();

  if (isLoading) return <DashboardSkeleton />;

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 flex items-center justify-center">
        <Card className="bg-zinc-900 border-red-900 p-8 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h2 className="text-2xl font-bold text-red-500">
              Failed to Load Data
            </h2>
          </div>
          <p className="text-zinc-300 mb-4">
            We couldn't fetch asteroid data from NASA's API. Please check your
            API key or try again later.
          </p>
          <p className="text-sm text-zinc-500 mb-4">
            Error: {error.message}
          </p>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </Card>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-left mb-12">
          <h1 className="text-zinc-50 text-4xl font-bold mb-2">
            Near Earth Objects Dashboard
          </h1>
          <p className="text-zinc-300 text-lg">
            Real-time asteroid tracking powered by NASA API
          </p>
          <div className="mt-4 inline-block bg-zinc-900 px-4 py-2 rounded-lg border border-cyan-900">
            📅 Last 7 Days
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard label="Total Asteroids" value={data?.totalAsteroids || 0} />
          <StatsCard
            label="Hazardous Asteroids"
            value={data?.totalHazardous || 0}
            isHazard
          />
          <StatsCard
            label="Largest Asteroid (m)"
            value={data?.largestAsteroid || "N/A"}
          />
          <StatsCard label="Closest Approach" value="76,000" />

          {/* Add 1 more Card components here */}
        </div>

        {/* Chart Sections */}
        <div className="space-y-8 mb-12">
          {/* Chart 1 */}
          <Card className="bg-zinc-900 border-zinc-600 p-6">
            <h2 className="text-zinc-50 text-xl font-semibold mb-4">
              Close Approaches Over Time
            </h2>
            <div className="h-64 bg-zinc-950 rounded-lg flex items-center justify-center border border-dashed border-zinc-800">
              <p className="text-zinc-500">📊 Chart goes here</p>
            </div>
          </Card>

          {/* Chart 2 */}
          {/* TODO: Add second chart */}
        </div>

        {/* Table */}
        <Card className="bg-zinc-900 border-zinc-600 p-6">
          <h2 className="text-zinc-50 text-xl font-semibold mb-4">
            Asteroid Details
          </h2>
          {/* TODO: Add table component */}
          <AsteroidTable />
        </Card>
      </div>
    </div>
  );
}

export default App;
