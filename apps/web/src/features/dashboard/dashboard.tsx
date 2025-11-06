import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { animated, useTrail } from "@react-spring/web";

import { CloseApproachAssessment } from "./components/close-approach-assessment/close-approach-assessment";
import { NextCloseApproach } from "./components/next-close-approach/next-close-approach";
import { SurveillanceStats } from "./components/surveillance-stats";
import { ApproachBarChart } from "./components/approach-bar-chart";
import { SizeVelocityScatter } from "./components/size-velocity-scatter";
import { AsteroidTable } from "./components/asteroid-table/asteroid-table";
import { Header } from "./components/header";
import type { TransformedNeoData } from "@/hooks/useNeoNasaQuery";
import { useSpecialEventsSSE } from "@/hooks/useSpecialEventsSSE";
import type { SpecialEvent } from "@/types/special-events";
import { SpecialEventBanner } from "./components/special-event-banner/special-event-banner";

interface DashboardProps {
  data: TransformedNeoData;
  isLoading: boolean;
  error: Error | null;
}

export const Dashboard = ({ data, isLoading, error }: DashboardProps) => {
  // connect to SSE stream for real-time updates

  const { status } = useSpecialEventsSSE();
  // Query special events from React Query cache (populated by SSE)
  const {
    data: specialEventsData,
  } = useQuery<SpecialEvent[], Error, { topEvent: SpecialEvent | undefined, activeEvents: SpecialEvent[]}>({
    queryKey: ["special-events"],
    queryFn: async () => {
      // Fallback: fetch from API if cache is empty
      const apiUrl =
        import.meta.env.VITE_API_URL || "http://localhost:3001/api";
      const response = await fetch(`${apiUrl}/events/active`);
      if (!response.ok) throw new Error("Failed to fetch events");
      const result = await response.json();
      return result.events;
    },
    staleTime: Infinity, // SSE keeps it fresh
    gcTime: 10 * 60 * 1000, // 10 minutes
    select: (events) => {
      const activeEvents = events.filter((e) => e.isActive);
      const topEvent = activeEvents.sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })[0];
      return { topEvent, activeEvents };
    },
  });

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
      {/* Special Event Banner - Shows above everything */}
      {specialEventsData?.topEvent && (
        <div className="mb-6">
          <SpecialEventBanner event={specialEventsData?.topEvent} />
        </div>
      )}

      {/* Connection Status Indicator */}
      {!status.isConnected && (
        <div className="mb-6 bg-yellow-900/20 border border-yellow-500/50 rounded-sm p-3 text-sm text-yellow-200">
          ⚠️ Real-time updates disconnected. Showing cached data.
          {status.reconnectAttempts > 0 && (
            <span className="ml-2">
              (Reconnect attempt {status.reconnectAttempts})
            </span>
          )}
        </div>
      )}
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
