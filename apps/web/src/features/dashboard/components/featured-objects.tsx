import { useState } from "react";
import {
  Star,
  Sparkles,
  Orbit,
  AlertTriangle,
  Calendar,
  Gauge,
  Ruler,
  MapPin,
  ExternalLink,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import type { SpecialEvent } from "../../../types/special-events";
import { CarouselNavigation } from "./next-close-approach/carousel-navigation";

interface FeaturedObjectsProps {
  specialEvents: SpecialEvent[];
}

/**
 * Featured Objects carousel component
 * Showcases special astronomical events and interstellar objects
 * Designed for integration with real-time feed architecture
 */
export function FeaturedObjects({ specialEvents }: FeaturedObjectsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const events = specialEvents.filter((event) => event.isActive);
  const currentEvent = events[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  // Icon mapping
  const iconMap = {
    comet: Orbit,
    interstellar_object: Star,
    meteor_shower: Sparkles,
    unusual_neo: Orbit,
    mission_related: Orbit,
  };

  // Color schemes based on type and hazard status
  const getColorScheme = (event: SpecialEvent) => {
    if (event.isPotentiallyHazardous) {
      return {
        border: "border-yellow-500/50",
        bg: "bg-yellow-950/20",
        accent: "text-yellow-400",
        badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
        label: "text-yellow-100",
      };
    }

    if (event.type === "interstellar_object") {
      return {
        border: "border-purple-500/50",
        bg: "bg-purple-950/20",
        accent: "text-purple-400",
        badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
        label: "text-purple-100",
      };
    }

    if (event.type === "comet") {
      return {
        border: "border-cyan-500/50",
        bg: "bg-cyan-950/20",
        accent: "text-cyan-400",
        badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
        label: "text-cyan-100",
      };
    }

    return {
      border: "border-blue-500/50",
      bg: "bg-blue-950/20",
      accent: "text-blue-400",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      label: "text-blue-100",
    };
  };

  // Calculate countdown
  const getCountdown = (timestamp: number) => {
    const now = Date.now();
    const diff = timestamp - now;

    if (diff < 0) {
      return { isPast: true, text: "Event has passed" };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) {
      return {
        isPast: false,
        text: `${days} day${days !== 1 ? "s" : ""}, ${hours} hour${hours !== 1 ? "s" : ""}`,
      };
    }

    if (hours > 0) {
      return {
        isPast: false,
        text: `${hours} hour${hours !== 1 ? "s" : ""}, ${minutes} minute${minutes !== 1 ? "s" : ""}`,
      };
    }

    return { isPast: false, text: `${minutes} minute${minutes !== 1 ? "s" : ""}` };
  };

  // Format distance
  const formatDistance = (event: SpecialEvent) => {
    const { value, unit } = event.distance;
    if (unit === "AU") {
      return `${value.toFixed(2)} AU (${(value * 149.6).toFixed(1)}M km)`;
    }
    if (unit === "km") {
      return `${(value / 1_000_000).toFixed(2)}M km`;
    }
    return `${value.toFixed(1)} ${unit}`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (events.length === 0) {
    return (
      <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
        <h3 className="text-zinc-300 text-sm font-bold uppercase tracking-wider mb-4">
          Featured Objects
        </h3>
        <div className="text-center py-8 text-zinc-500">
          No special events available
        </div>
      </Card>
    );
  }

  const Icon = iconMap[currentEvent.type];
  const colors = getColorScheme(currentEvent);
  const countdown = getCountdown(currentEvent.eventTimestamp);

  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${colors.accent}`} />
          <h3 className="text-zinc-300 text-sm font-bold uppercase tracking-wider">
            Featured Objects
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">
            {currentIndex + 1} / {events.length}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className={`rounded-lg border-2 ${colors.border} ${colors.bg} p-5 mb-4`}>
        {/* Title and Badges */}
        <div className="mb-4">
          <h4 className={`text-2xl font-bold mb-2 ${colors.label}`}>
            {currentEvent.name}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`px-2 py-1 rounded text-xs font-semibold border uppercase ${colors.badge}`}
            >
              {currentEvent.type.replace("_", " ")}
            </span>
            <span
              className={`px-2 py-1 rounded text-xs font-semibold border uppercase ${colors.badge}`}
            >
              {currentEvent.origin.replace("_", " ")}
            </span>
            {currentEvent.isPotentiallyHazardous && (
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 uppercase">
                <AlertTriangle size={12} />
                Hazardous
              </span>
            )}
            <span
              className={`px-2 py-1 rounded text-xs font-semibold ${
                currentEvent.priority === "critical"
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : currentEvent.priority === "high"
                    ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
              } uppercase`}
            >
              {currentEvent.priority}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-300 text-sm leading-relaxed mb-5">
          {currentEvent.description}
        </p>

        {/* Key Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {/* Event Date */}
          <div className="flex items-start gap-3">
            <Calendar className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.accent}`} />
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wide">
                Event Date
              </div>
              <div className="text-sm text-zinc-200 font-semibold">
                {formatDate(currentEvent.eventDate)}
              </div>
            </div>
          </div>

          {/* Distance */}
          <div className="flex items-start gap-3">
            <MapPin className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.accent}`} />
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wide">
                Distance
              </div>
              <div className="text-sm text-zinc-200 font-semibold">
                {formatDistance(currentEvent)}
              </div>
            </div>
          </div>

          {/* Velocity */}
          {currentEvent.velocity && (
            <div className="flex items-start gap-3">
              <Gauge className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.accent}`} />
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wide">
                  Velocity
                </div>
                <div className="text-sm text-zinc-200 font-semibold">
                  {currentEvent.velocity.value.toLocaleString()}{" "}
                  {currentEvent.velocity.unit}
                </div>
              </div>
            </div>
          )}

          {/* Diameter */}
          {currentEvent.diameter && (
            <div className="flex items-start gap-3">
              <Ruler className={`w-5 h-5 mt-0.5 flex-shrink-0 ${colors.accent}`} />
              <div>
                <div className="text-xs text-zinc-500 uppercase tracking-wide">
                  Diameter
                </div>
                <div className="text-sm text-zinc-200 font-semibold">
                  {currentEvent.diameter.min.toFixed(1)} -{" "}
                  {currentEvent.diameter.max.toFixed(1)} {currentEvent.diameter.unit}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Countdown */}
        <div
          className={`
          p-4 rounded-lg border
          ${countdown.isPast ? "border-zinc-700 bg-zinc-800/50" : `${colors.border} ${colors.bg}`}
        `}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-zinc-500 uppercase tracking-wide mb-1">
                {countdown.isPast ? "Status" : "Time Until Event"}
              </div>
              <div
                className={`text-2xl font-bold ${countdown.isPast ? "text-zinc-500" : colors.label}`}
              >
                {countdown.text}
              </div>
            </div>
            {!countdown.isPast && currentEvent.priority === "critical" && (
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    currentEvent.isPotentiallyHazardous
                      ? "bg-yellow-400"
                      : "bg-purple-400"
                  } animate-pulse`}
                />
                <span className="text-xs text-zinc-400 uppercase">Live</span>
              </div>
            )}
          </div>
        </div>

        {/* Significance Note */}
        {currentEvent.metadata?.significance && (
          <div className="mt-4 p-3 rounded-lg bg-zinc-800/50 border border-zinc-700">
            <div className="text-xs text-zinc-500 uppercase tracking-wide mb-1">
              Scientific Significance
            </div>
            <p className="text-sm text-zinc-300 italic">
              {currentEvent.metadata.significance}
            </p>
          </div>
        )}

        {/* Reference Link */}
        {currentEvent.metadata?.referenceUrl && (
          <div className="mt-3">
            <a
              href={currentEvent.metadata.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1 text-xs ${colors.accent} hover:underline`}
            >
              <ExternalLink size={12} />
              View detailed data
            </a>
          </div>
        )}
      </div>

      {/* Carousel Navigation */}
      <CarouselNavigation
        onGoToIndex={setCurrentIndex}
        currentIndex={currentIndex}
        totalApproaches={events.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
