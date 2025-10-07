import { AsteroidTable } from "./components/asteroid-table";
import { StatsCard } from "./components/stats-card";
import { Card } from "./components/ui/card";
import { useNeoDataQuery } from "./hooks/useNeoNasaQuery";

function App() {
  const { data, isLoading, error } = useNeoDataQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // TODO: Use data.near_earth_objects
  console.log(data);

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
          <StatsCard label="Total Asteroids" value={data?.totalAsteroids} />
          <StatsCard label="Hazardous Asteroids" value="5" isHazard />

          {/* Add 3 more Card components here */}
        </div>

        {/* Chart Sections */}
        <div className="space-y-8 mb-12">
          {/* Chart 1 */}
          <Card className="bg-zinc-900 border-zinc-800 p-6">
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
        <Card className="bg-zinc-900 border-zinc-800 p-6">
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
