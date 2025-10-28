interface ApproachHeaderProps {
  currentIndex: number;
  isPast: boolean;
  totalApproaches: number;
  isPotentiallyHazardous: boolean;
}

export const ApproachHeader = ({
  currentIndex,
  isPast,
  totalApproaches,
  isPotentiallyHazardous,
}: ApproachHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <h3 className="text-zinc-300 text-sm font-bold uppercase tracking-wider">
          {isPast ? "Recent Approaches" : "Next Close Approaches"}
        </h3>
        <span className="text-xs text-zinc-500 font-mono">
          {currentIndex + 1} / {totalApproaches}
        </span>
      </div>
      {isPotentiallyHazardous && (
        <span className="text-yellow-400 text-xs font-mono">⚠ PHA</span>
      )}
    </div>
  );
};
