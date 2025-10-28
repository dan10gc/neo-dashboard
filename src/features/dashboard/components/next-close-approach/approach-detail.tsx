interface ApproachDetailProps {
  currentApproach: {
    name: string;
    epoch_date_close_approach: number;
    miss_distance_km: number;
    miss_distance_au: number;
    velocity: number;
  };
}

export const ApproachDetail = ({ currentApproach }: ApproachDetailProps) => {
  return (
    <>
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
            {new Date(
              currentApproach.epoch_date_close_approach
            ).toLocaleDateString("en-US", {
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
    </>
  );
};
