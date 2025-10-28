import { useState } from "react";

import { Card } from "@/components/ui/card";
import type { NextApproachData } from "@/lib/transformers";

import { ApproachCounter } from "./approach-counter";
import { ApproachHeader } from "./approach-header";
import { ApproachDetail } from "./approach-detail";
import { CarouselNavigation } from "./carousel-navigation";

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
      <CarouselNavigation
        onGoToIndex={setCurrentIndex}
        currentIndex={currentIndex}
        totalApproaches={approaches.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
