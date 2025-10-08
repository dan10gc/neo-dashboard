import { AsteroidTable } from "./components/asteroid-table";
import { ApproachBarChart } from "./components/approach-bar-chart";
import { SizeVelocityScatter } from "./components/size-velocity-scatter";
import { StatsCard } from "./components/stats-card";
import { Footer } from "./components/footer";
import { Card } from "./components/ui/card";
import { useNeoDataQuery } from "./hooks/useNeoNasaQuery";
import { DashboardSkeleton } from "./components/dashboard-skeleton";
import { AlertCircle } from "lucide-react";

function App() {
  const { data, isLoading, error, refetch } = useNeoDataQuery();

  if (isLoading) return <DashboardSkeleton />;

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
    <div className="min-h-screen bg-zinc-950 text-zinc-50 p-6 font-mono">
      <div className="max-w-7xl mx-auto">
        <header className="text-left mb-12">
          <h1 className="text-zinc-100 text-4xl font-bold mb-2 uppercase tracking-tight">
            Near Earth Objects Dashboard
          </h1>
          <p className="text-sky-400 text-sm uppercase tracking-wider">
            Real-time asteroid tracking powered by NASA API
          </p>
          <div className="mt-4 inline-block bg-zinc-800/50 px-4 py-2 rounded-sm border-2 border-zinc-700 text-sky-400 uppercase text-xs tracking-wider font-bold">
            📅 Last 7 Days
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            label="Total Asteroids"
            value={data?.totalAsteroids || 0}
          />
          <StatsCard
            label="Hazardous Asteroids"
            value={data?.totalHazardous || 0}
            isHazard
          />
          <StatsCard
            label="Largest Asteroid (m)"
            value={data?.largestAsteroid || "N/A"}
          />
          <StatsCard
            label="Closest Approach"
            value={data?.closestApproach || "N/A"}
          />
        </div>

        {/* Chart Sections */}
        <div className="space-y-8 mb-12">
          <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
            <h2 className="text-zinc-300 text-lg font-bold mb-4 uppercase tracking-wider">
              Close Approaches Over Time
            </h2>
            <ApproachBarChart data={data?.asteroidCountsByDate} />
          </Card>

          <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
            <h2 className="text-zinc-300 text-lg font-bold mb-4 uppercase tracking-wider">
              Size vs Velocity Distribution
            </h2>
            <SizeVelocityScatter data={data?.sizeVelocityData} />
          </Card>
        </div>

        {/* Table Section */}
        <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
          <h2 className="text-zinc-300 text-lg font-bold mb-4 uppercase tracking-wider">
            Asteroid Details
          </h2>

          <AsteroidTable data={data?.asteroidTableData || []} />
        </Card>

        <Footer />
      </div>
    </div>
  );
}

export default App;
