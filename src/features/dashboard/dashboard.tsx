import { Card } from "@/components/ui/card";
import { animated, useTrail } from "@react-spring/web";

import { CloseApproachAssessment } from "./components/close-approach-assessment";
import { NextCloseApproach } from "./components/next-close-approach/next-close-approach";
import { SurveillanceStats } from "./components/surveillance-stats";
import { ApproachBarChart } from "./components/approach-bar-chart";
import { SizeVelocityScatter } from "./components/size-velocity-scatter";
import { AsteroidTable } from "./components/asteroid-table/asteroid-table";
import { Header } from "./components/header";
import type { TransformedNeoData } from "@/hooks/useNeoNasaQuery";

interface DashboardProps {
  data: TransformedNeoData;
  isLoading: boolean;
  error: Error | null;
}

export const Dashboard = ({ data, isLoading, error }: DashboardProps) => {
  // Stagger animation for monitor sections (5 sections total)
  // Only animate when data is loaded (not loading and not error)
  const trail = useTrail(5, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: {
      opacity: !isLoading && !error ? 1 : 0,
      transform: !isLoading && !error ? "translateY(0px)" : "translateY(20px)",
    },
    config: { tension: 280, friction: 60 },
  });

  return (
    <>
      <Header dateRange={data?.dateRange} />

      {/* ACTIVE LAYOUT: Compact Threat + Next Approach + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Left Column - Threat & Next Approach */}
        <div className="lg:col-span-2 space-y-6">
          <animated.div style={trail[0]}>
            {data?.threatAssessment && (
              <CloseApproachAssessment assessment={data.threatAssessment} />
            )}
          </animated.div>
          <animated.div style={trail[1]}>
            <NextCloseApproach asteroidData={data?.nextApproaches || []} />
          </animated.div>
        </div>

        {/* Right Column - Surveillance Stats Sidebar */}
        <animated.div className="lg:col-span-1" style={trail[2]}>
          <SurveillanceStats
            totalAsteroids={data?.totalAsteroids || 0}
            totalHazardous={data?.totalHazardous || 0}
            largestAsteroidKm={data?.largestAsteroid || 0}
            closestApproachAu={data?.closestApproach || 0}
          />
        </animated.div>
      </div>

      {/* Chart Sections */}
      <div className="space-y-8 mb-12">
        <animated.div style={trail[3]}>
          <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
            <ApproachBarChart data={data?.asteroidCountsByDate} />
          </Card>
        </animated.div>

        <animated.div style={trail[3]}>
          <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
            <SizeVelocityScatter data={data?.sizeVelocityData} />
          </Card>
        </animated.div>
      </div>

      {/* Table Section */}
      <animated.div style={trail[4]}>
        <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
          <AsteroidTable data={data?.asteroidTableData || []} />
        </Card>
      </animated.div>
    </>
  );
};
