import { Card } from "@/components/ui/card";
import type { NextApproachData } from "@/lib/transformers";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NextCloseApproachProps {
  asteroidData: NextApproachData[];
}

export function NextCloseApproach({ asteroidData }: NextCloseApproachProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdowns, setCountdowns] = useState<
    { days: number; hours: number; minutes: number; seconds: number }[]
  >([]);

  // Data is already filtered, sorted, and limited to 5 items by the hook
  const approaches = asteroidData;

  // Update all countdowns
  useEffect(() => {
    if (approaches.length === 0) return;

    const updateCountdowns = () => {
      const now = Date.now();
      const newCountdowns = approaches.map((approach) => {
        const diff = approach.epoch_date_close_approach - now;

        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          return { days, hours, minutes, seconds };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [approaches]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? approaches.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === approaches.length - 1 ? 0 : prev + 1));
  };

  if (approaches.length === 0) {
    return (
      <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
        <h3 className="text-zinc-300 text-sm font-bold uppercase tracking-wider mb-4">
          Next Close Approaches
        </h3>
        <div className="text-center py-8 text-zinc-500">
          No approach data available
        </div>
      </Card>
    );
  }

  const currentApproach = approaches[currentIndex];
  const currentCountdown = countdowns[currentIndex] || {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const isPast = currentApproach.epoch_date_close_approach < Date.now();

  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-zinc-300 text-sm font-bold uppercase tracking-wider">
            {isPast ? "Recent Approaches" : "Next Close Approaches"}
          </h3>
          <span className="text-xs text-zinc-500 font-mono">
            {currentIndex + 1} / {approaches.length}
          </span>
        </div>
        {currentApproach.is_potentially_hazardous_asteroid && (
          <span className="text-yellow-400 text-xs font-mono">⚠ PHA</span>
        )}
      </div>

      {/* Current Approach Content - Single Column, Inline Layout */}
      <div>
        {/* Asteroid Name */}
        <div className="mb-6">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2">
            Object Designation
          </div>
          <div className="text-2xl font-bold text-cyan-400 font-mono">
            {currentApproach.name}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {/* Approach Date - Inline */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Approach Date
            </div>
            <div className="text-sm font-mono text-zinc-300">
              {new Date(currentApproach.epoch_date_close_approach).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>

          {/* Miss Distance - Inline */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Miss Distance
            </div>
            <div className="text-right">
              <div className="text-sm font-mono text-zinc-300">
                {currentApproach.miss_distance_km.toLocaleString()} km
              </div>
              <div className="text-xs font-mono text-zinc-500">
                ({currentApproach.miss_distance_au.toFixed(4)} AU)
              </div>
            </div>
          </div>

          {/* Velocity - Inline */}
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-500 uppercase tracking-wider">
              Relative Velocity
            </div>
            <div className="text-sm font-mono text-zinc-300">
              {currentApproach.velocity.toLocaleString()} km/h
            </div>
          </div>
        </div>

        {/* Countdown Section */}
        <div
          className={`bg-zinc-900/50 p-4 rounded-sm border-2 ${
            isPast ? "border-zinc-700" : "border-green-700/50"
          }`}
        >
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2 text-center">
            {isPast ? "Time Since Approach" : "Time Until Closest Approach"}
          </div>
          {isPast ? (
            <div className="text-center text-lg text-zinc-500 font-mono">
              Approach Occurred
            </div>
          ) : (
            <div className="text-center text-2xl font-bold text-green-400 font-mono">
              {currentCountdown.days}d {currentCountdown.hours}h{" "}
              {currentCountdown.minutes}m {currentCountdown.seconds}s
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-6 pt-4 border-t border-zinc-700 flex items-center justify-between">
        {/* Carousel Indicators - Bottom Left */}
        <div className="flex gap-2">
          {approaches.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-cyan-400"
                  : "w-1.5 bg-zinc-600 hover:bg-zinc-500"
              }`}
              aria-label={`Go to approach ${index + 1}`}
            />
          ))}
        </div>

        {/* Arrow Navigation - Bottom Right */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevious}
            className="p-1 hover:bg-zinc-700 rounded transition-colors"
            aria-label="Previous approach"
          >
            <ChevronLeft className="w-5 h-5 text-zinc-400" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 hover:bg-zinc-700 rounded transition-colors"
            aria-label="Next approach"
          >
            <ChevronRight className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
      </div>
    </Card>
  );
}
