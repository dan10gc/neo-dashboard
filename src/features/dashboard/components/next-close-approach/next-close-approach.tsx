import { Card } from "@/components/ui/card";
import type { NextApproachData } from "@/lib/transformers";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ApproachCounter } from "./approach-counter";
import { ApproachHeader } from "./approach-header";
import { ApproachDetail } from "./approach-detail";

interface NextCloseApproachProps {
  asteroidData: NextApproachData[];
}

export function NextCloseApproach({ asteroidData }: NextCloseApproachProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Data is already filtered, sorted, and limited to 5 items by the hook
  const approaches = asteroidData;
  const currentApproach = approaches[currentIndex];
  const isPast = currentApproach.epoch_date_close_approach < Date.now();

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

  return (
    <Card className="bg-zinc-800/50 border-2 border-zinc-700 p-6 rounded-sm">
      {/* Header */}
      <ApproachHeader
        currentIndex={currentIndex}
        isPast={isPast}
        totalApproaches={approaches.length}
        isPotentiallyHazardous={
          currentApproach.is_potentially_hazardous_asteroid
        }
      />

      {/* Current Approach Content - Single Column, Inline Layout */}
      <div>
        <ApproachDetail currentApproach={currentApproach} />

        {/* Countdown Section */}
        <ApproachCounter
          isPast={isPast}
          epochDate={currentApproach.epoch_date_close_approach}
        />
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
