import { useState } from "react";

import { Card } from "@/components/ui/card";

import { ApproachCounter } from "./approach-counter";
import { ApproachHeader } from "./approach-header";
import { ApproachDetail } from "./approach-detail";
import { CarouselNavigation } from "./carousel-navigation";
import type { NextApproachData } from "@/lib/transformers/transformers";
import { trackEvent } from "@/lib/analytics";

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
    setCurrentIndex((prev) => {
      const newIndex = prev === 0 ? approaches.length - 1 : prev - 1;
      trackEvent("carousel_navigation", {
        direction: "previous",
        from_position: prev,
        to_position: newIndex,
      });
      return newIndex;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev === approaches.length - 1 ? 0 : prev + 1;
      trackEvent("carousel_navigation", {
        direction: "next",
        from_position: prev,
        to_position: newIndex,
      });
      return newIndex;
    });
  };

  const handleGoToIndex = (index: number) => {
    trackEvent("carousel_navigation", {
      direction: "jump",
      from_position: currentIndex,
      to_position: index,
    });
    setCurrentIndex(index);
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
        totalApproaches={approaches.length}
        isPotentiallyHazardous={
          currentApproach.is_potentially_hazardous_asteroid
        }
      />

      {/* Current Approach Content - Single Column, Inline Layout */}
      <>
        <ApproachDetail currentApproach={currentApproach} />

        {/* Countdown Section */}
        <ApproachCounter
          isPast={isPast}
          epochDate={currentApproach.epoch_date_close_approach}
        />
      </>

      {/* Bottom Navigation */}
      <CarouselNavigation
        onGoToIndex={handleGoToIndex}
        currentIndex={currentIndex}
        totalApproaches={approaches.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
