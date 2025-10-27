import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import { ChartScatter, Diameter, Gauge } from "lucide-react";
import type { SizeVelocityDataPoint } from "@/lib/transformers";
import { useSpring, animated } from "@react-spring/web";

// Recharts tooltip types
interface TooltipPayload {
  name: string;
  value: number;
  payload: SizeVelocityDataPoint;
  stroke?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
}

// Animated number component
function AnimatedNumber({
  value,
  duration = 1000,
}: {
  value: number;
  duration?: number;
}) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration },
  });

  return (
    <animated.span>
      {number.to((n) => Math.floor(n).toLocaleString())}
    </animated.span>
  );
}

interface SizeVelocityScatterProps {
  data?: SizeVelocityDataPoint[];
}

export const SizeVelocityScatter = ({ data }: SizeVelocityScatterProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-zinc-500">
        No data available
      </div>
    );
  }

  // Split data by hazard status
  const safeAsteroids = data.filter((item) => !item.hazardous);
  const hazardousAsteroids = data.filter((item) => item.hazardous);

  // Calculate statistics
  const largestAsteroid = data.reduce(
    (max, item) => (item.diameter > max.diameter ? item : max),
    data[0]
  );
  const fastestAsteroid = data.reduce(
    (max, item) => (item.velocity > max.velocity ? item : max),
    data[0]
  );

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      // Remove duplicates and group by unique asteroids
      const uniqueAsteroids = payload.reduce((acc, p) => {
        const key = p.payload.name;
        if (!acc.find((item) => item.payload.name === key)) {
          acc.push(p);
        }
        return acc;
      }, [] as TooltipPayload[]);

      // If multiple unique asteroids, show all of them
      if (uniqueAsteroids.length > 1) {
        return (
          <div className="bg-zinc-950 border-2 border-zinc-700 rounded-sm p-3 font-mono text-xs max-w-xs">
            <p className="text-zinc-400 text-[10px] mb-2 uppercase tracking-wider">
              Multiple Objects ({uniqueAsteroids.length})
            </p>
            <div className="space-y-3">
              {uniqueAsteroids.map((p, idx: number) => {
                const data = p.payload;
                const isHazardous = p.stroke === "#eab308";
                return (
                  <div
                    key={idx}
                    className="pb-3 border-b border-zinc-800 last:border-b-0 last:pb-0"
                  >
                    <p className="text-zinc-100 font-bold mb-1 uppercase tracking-wider text-[10px]">
                      {data.name}
                    </p>
                    <div className="space-y-0.5 text-[10px]">
                      <p className="text-cyan-400">
                        <span className="text-zinc-500">Diameter:</span>{" "}
                        {data.diameter.toLocaleString()} m
                      </p>
                      <p className="text-cyan-400">
                        <span className="text-zinc-500">Velocity:</span>{" "}
                        {data.velocity.toLocaleString()} km/h
                      </p>
                    </div>
                    <div
                      className={`mt-1 pt-1 border-t border-zinc-800 font-bold text-[10px] ${
                        isHazardous ? "text-yellow-400" : "text-green-400"
                      }`}
                    >
                      {isHazardous ? "⚠ HAZARDOUS" : "✓ NON-HAZARDOUS"}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      // Single asteroid
      const asteroidData = payload[0].payload;
      const strokeColor = payload[0].stroke;
      const isHazardous = strokeColor === "#eab308";

      return (
        <div className="bg-zinc-950 border-2 border-zinc-700 rounded-sm p-3 font-mono text-xs">
          <p className="text-zinc-100 font-bold mb-2 uppercase tracking-wider">
            {asteroidData.name}
          </p>
          <div className="space-y-1">
            <p className="text-cyan-400">
              <span className="text-zinc-500">Diameter:</span>{" "}
              {asteroidData.diameter.toLocaleString()} m
            </p>
            <p className="text-cyan-400">
              <span className="text-zinc-500">Velocity:</span>{" "}
              {asteroidData.velocity.toLocaleString()} km/h
            </p>
          </div>
          <div
            className={`mt-2 pt-2 border-t border-zinc-700 font-bold ${
              isHazardous ? "text-yellow-400" : "text-green-400"
            }`}
          >
            {isHazardous ? "⚠ HAZARDOUS" : "✓ NON-HAZARDOUS"}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-zinc-700">
        <ChartScatter className="h-5 w-5 text-cyan-400" />
        <h2 className="text-zinc-300 text-sm font-bold uppercase tracking-wider">
          Size vs Velocity Distribution
        </h2>
      </div>

      {/* Statistics Grid - Only Unique Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Largest */}
        <div className="bg-zinc-900/50 p-3 sm:p-4 rounded-sm border border-purple-700/50">
          <div className="flex items-center gap-1 mb-1">
            <Diameter className="h-3 w-3 text-purple-400" />
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Largest Object
            </div>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-400 font-mono break-words">
            <AnimatedNumber value={largestAsteroid.diameter} />
          </div>
          <div className="text-xs text-zinc-600 mt-1">meters diameter</div>
          <div
            className="text-xs text-zinc-500 mt-2 truncate"
            title={largestAsteroid.name}
          >
            {largestAsteroid.name}
          </div>
        </div>

        {/* Fastest */}
        <div className="bg-zinc-900/50 p-3 sm:p-4 rounded-sm border border-cyan-700/50">
          <div className="flex items-center gap-1 mb-1">
            <Gauge className="h-3 w-3 text-cyan-400" />
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Fastest Object
            </div>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-cyan-400 font-mono break-words">
            <AnimatedNumber value={fastestAsteroid.velocity} />
          </div>
          <div className="text-xs text-zinc-600 mt-1">km/h velocity</div>
          <div
            className="text-xs text-zinc-500 mt-2 truncate"
            title={fastestAsteroid.name}
          >
            {fastestAsteroid.name}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-zinc-900/30 p-2 sm:p-4 rounded-sm border border-zinc-700/50">
        <ResponsiveContainer width="100%" height={480}>
          <ScatterChart margin={{ top: 20, right: 10, bottom: 60, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
            <XAxis
              type="number"
              dataKey="diameter"
              name="Diameter"
              unit=" m"
              stroke="#71717a"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              tickLine={{ stroke: "#52525b" }}
              style={{ fontFamily: "monospace" }}
              label={{
                value: "DIAMETER (METERS)",
                position: "bottom",
                offset: 40,
                style: {
                  fill: "#a1a1aa",
                  fontFamily: "monospace",
                  fontSize: 11,
                  fontWeight: "bold",
                },
              }}
            />
            <YAxis
              type="number"
              dataKey="velocity"
              name="Velocity"
              unit=" km/h"
              stroke="#71717a"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              tickLine={{ stroke: "#52525b" }}
              style={{ fontFamily: "monospace" }}
              label={{
                value: "VELOCITY (KM/H)",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "#a1a1aa",
                  fontFamily: "monospace",
                  fontSize: 11,
                  fontWeight: "bold",
                },
              }}
            />
            <ZAxis range={[60, 500]} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3", stroke: "#52525b" }}
            />
            <Scatter
              name="Non-Hazardous"
              data={safeAsteroids}
              fill="#22c55e"
              fillOpacity={0.7}
              stroke="#16a34a"
              strokeWidth={1}
            />
            <Scatter
              name="Hazardous"
              data={hazardousAsteroids}
              fill="#facc15"
              fillOpacity={0.8}
              stroke="#eab308"
              strokeWidth={1}
            />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-zinc-700/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full border border-green-600"></div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
              Non-Hazardous
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-full border border-yellow-500"></div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
              Hazardous
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
