import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { animated, useTrail, useSpring } from "@react-spring/web";
import { useEffect } from "react";

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
import { trackEvent } from "@/lib/analytics";
import {
  CloseApproachAssessmentSkeleton,
  NextApproachSkeleton,
  SurveillanceStatsSkeleton,
  ChartSkeleton,
  TableSkeleton,
} from "./components/skeletons";

interface DashboardProps {
  data: TransformedNeoData;
  isLoading: boolean;
  error: Error | null;
}

export const Dashboard = ({ data, isLoading, error }: DashboardProps) => {
  // connect to SSE stream for real-time updates

  const { status } = useSpecialEventsSSE();

  // Track dashboard view on mount
  useEffect(() => {
    const isFirstVisit = !localStorage.getItem('has_visited_dashboard');
    if (isFirstVisit) {
      localStorage.setItem('has_visited_dashboard', 'true');
    }

    trackEvent('dashboard_viewed', {
      is_first_visit: isFirstVisit,
    });
  }, []);
  // Query special events from React Query cache (populated by SSE)
  const { data: specialEventsData, isError} = useQuery<
    { activeEvents: SpecialEvent[]; total: number },
    Error,
    { topEvent: SpecialEvent | undefined; activeEvents: SpecialEvent[] }
  >({
    queryKey: ["special-events"],
    queryFn: async () => {
      // Fallback: fetch from API if cache is empty
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}/api/events/active`);
      if (!response.ok) throw new Error("Failed to fetch events");
      return response.json(); // Returns { activeEvents: SpecialEvent[], total: number }
    },
    staleTime: Infinity, // SSE keeps it fresh
    gcTime: 10 * 60 * 1000, // 10 minutes
    select: (data) => {
      const activeEvents = data.activeEvents; 
      const topEvent = [...activeEvents].sort((a, b) => {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })[0];
      return { topEvent, activeEvents };
    },
  });

  // Stagger animation for monitor sections (5 sections total)
  // Skip animation for skeletons (instant), only animate real content
  const trail = useTrail(5, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: {
      opacity: 1,
      transform: "translateY(0px)",
    },
    immediate: isLoading, // Skip animation when loading (show skeletons instantly)
    config: { tension: 280, friction: 60 },
  });

  // Slide-in animation for special event banner (from top)
  const bannerAnimation = useSpring({
    from: { transform: "translateY(-100%)", opacity: 0 },
    to: {
      transform: specialEventsData?.topEvent && !isLoading ? "translateY(0%)" : "translateY(-100%)",
      opacity: specialEventsData?.topEvent && !isLoading ? 1 : 0,
    },
    config: { tension: 220, friction: 30 },
  });

  return (
    <>
      {/* Special Event Banner - Slides in from top when available */}
      {specialEventsData?.topEvent && !isLoading && (
        <animated.div style={bannerAnimation} className="mb-6">
          <SpecialEventBanner event={specialEventsData.topEvent} />
        </animated.div>
      )}

      {/* Header with connection status integrated into LIVE badge */}
      <Header
        dateRange={data?.dateRange}
        isConnected={status.isConnected}
        reconnectAttempts={status.reconnectAttempts}
      />

      {/* ACTIVE LAYOUT: Compact Threat + Next Approach + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Left Column - Threat & Next Approach */}
        <div className="lg:col-span-2 space-y-6">
          <animated.div style={trail[0]}>
            {isLoading ? (
              <CloseApproachAssessmentSkeleton />
            ) : (
              data?.threatAssessment && (
                <CloseApproachAssessment assessment={data.threatAssessment} />
              )
            )}
          </animated.div>
          <animated.div style={trail[1]}>
            {isLoading ? (
              <NextApproachSkeleton />
            ) : (
              <NextCloseApproach asteroidData={data?.nextApproaches || []} />
            )}
          </animated.div>
        </div>

        {/* Right Column - Surveillance Stats Sidebar */}
        <animated.div className="lg:col-span-1" style={trail[2]}>
          {isLoading ? (
            <SurveillanceStatsSkeleton />
          ) : (
            <SurveillanceStats
              totalAsteroids={data?.totalAsteroids || 0}
              totalHazardous={data?.totalHazardous || 0}
              largestAsteroidKm={data?.largestAsteroid || 0}
              closestApproachAu={data?.closestApproach || 0}
            />
          )}
        </animated.div>
      </div>

      {/* Chart Sections */}
      <div className="space-y-8 mb-12">
        <animated.div style={trail[3]}>
          {isLoading ? (
            <ChartSkeleton title="Close Approaches Over Time" showStats={true} statCount={2} />
          ) : (
            <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
              <ApproachBarChart data={data?.asteroidCountsByDate} />
            </Card>
          )}
        </animated.div>

        <animated.div style={trail[3]}>
          {isLoading ? (
            <ChartSkeleton title="Size vs Velocity Distribution" showStats={true} statCount={2} />
          ) : (
            <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
              <SizeVelocityScatter data={data?.sizeVelocityData} />
            </Card>
          )}
        </animated.div>
      </div>

      {/* Table Section */}
      <animated.div style={trail[4]}>
        {isLoading ? (
          <TableSkeleton />
        ) : (
          <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
            <AsteroidTable data={data?.asteroidTableData || []} />
          </Card>
        )}
      </animated.div>
    </>
  );
};
