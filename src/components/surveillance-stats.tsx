import { Card } from "./ui/card";
import { Orbit, AlertTriangle, Circle, Target } from "lucide-react";

interface SurveillanceStatsProps {
  totalAsteroids: number;
  totalHazardous: number;
  largestAsteroid: string;
  closestApproach: string;
}

export function SurveillanceStats({
  totalAsteroids,
  totalHazardous,
  largestAsteroid,
  closestApproach,
}: SurveillanceStatsProps) {
  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="mb-6 pb-4 border-b-2 border-zinc-700">
          <h3 className="text-zinc-300 text-sm font-bold uppercase tracking-wider text-center">
            Quick Surveillance Stats
          </h3>
        </div>

        {/* Stats Grid */}
        <div className="flex-1 space-y-6">
          {/* Objects Tracked */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Orbit className="h-4 w-4 text-cyan-400" />
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                Objects Tracked
              </div>
            </div>
            <div className="text-4xl font-bold text-cyan-400 font-mono">
              {totalAsteroids}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-700"></div>

          {/* Potentially Hazardous */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                Potentially Hazardous
              </div>
            </div>
            <div className="text-4xl font-bold text-yellow-400 font-mono">
              {totalHazardous}
            </div>
            <div className="mt-2 text-xs text-zinc-600">
              ({((totalHazardous / totalAsteroids) * 100).toFixed(1)}% of total)
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-700"></div>

          {/* Largest Object */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Circle className="h-4 w-4 text-purple-400" />
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                Largest Object
              </div>
            </div>
            <div className="text-3xl font-bold text-purple-400 font-mono">
              {largestAsteroid}
            </div>
            <div className="mt-1 text-xs text-zinc-600">
              max diameter
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-zinc-700"></div>

          {/* Closest Approach */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="h-4 w-4 text-green-400" />
              <div className="text-xs text-zinc-500 uppercase tracking-wider">
                Closest Approach
              </div>
            </div>
            <div className="text-3xl font-bold text-green-400 font-mono">
              {closestApproach}
            </div>
            <div className="mt-1 text-xs text-zinc-600">
              astronomical units
            </div>
          </div>
        </div>

        {/* System Status Footer */}
        <div className="mt-6 pt-4 border-t-2 border-zinc-700">
          <div className="bg-zinc-900/50 px-4 py-3 rounded-sm border border-green-700/50 text-center">
            <div className="flex items-center justify-center gap-2 text-green-400 font-mono text-sm font-bold">
              <span className="animate-pulse">●</span>
              <span>ALL SYSTEMS NOMINAL</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
