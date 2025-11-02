import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselNavigationProps {
  currentIndex: number;
  totalApproaches: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoToIndex: (index: number) => void;
}
export const CarouselNavigation = ({
  currentIndex,
  totalApproaches,
  onNext,
  onPrevious,
  onGoToIndex,
}: CarouselNavigationProps) => {
  return (
    <div className="mt-6 pt-4 border-t border-zinc-700 flex items-center justify-between">
      {/* Carousel Indicators - Bottom Left */}
      <div className="flex gap-2">
        {Array.from({ length: totalApproaches }, (_, index) => (
          <button
            key={index}
            onClick={() => onGoToIndex(index)}
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
          onClick={onPrevious}
          className="p-1 hover:bg-zinc-700 rounded transition-colors"
          aria-label="Previous approach"
        >
          <ChevronLeft className="w-5 h-5 text-zinc-400" />
        </button>
        <button
          onClick={onNext}
          className="p-1 hover:bg-zinc-700 rounded transition-colors"
          aria-label="Next approach"
        >
          <ChevronRight className="w-5 h-5 text-zinc-400" />
        </button>
      </div>
    </div>
  );
};
