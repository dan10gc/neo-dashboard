interface ThreatBadgeProps {
  totalHazardous: number;
  totalAsteroids: number;
}

export function ThreatBadge({ totalHazardous, totalAsteroids }: ThreatBadgeProps) {
  // Calculate threat level (1-5 scale, 5 = minimal threat)
  const hazardPercentage = totalAsteroids > 0 ? (totalHazardous / totalAsteroids) * 100 : 0;

  let conditionLevel: number;
  let conditionText: string;
  let badgeColor: string;
  let borderColor: string;

  if (hazardPercentage >= 20) {
    conditionLevel = 1;
    conditionText = "CRITICAL";
    badgeColor = "text-red-400";
    borderColor = "border-red-700/50";
  } else if (hazardPercentage >= 15) {
    conditionLevel = 2;
    conditionText = "ELEVATED";
    badgeColor = "text-yellow-400";
    borderColor = "border-yellow-700/50";
  } else if (hazardPercentage >= 10) {
    conditionLevel = 3;
    conditionText = "MODERATE";
    badgeColor = "text-yellow-400";
    borderColor = "border-yellow-700/50";
  } else if (hazardPercentage >= 5) {
    conditionLevel = 4;
    conditionText = "LOW";
    badgeColor = "text-green-400";
    borderColor = "border-green-700/50";
  } else {
    conditionLevel = 5;
    conditionText = "MINIMAL";
    badgeColor = "text-green-400";
    borderColor = "border-green-700/50";
  }

  return (
    <div className={`inline-block bg-zinc-800/50 px-4 py-2 rounded-sm border-2 ${borderColor} ${badgeColor} uppercase text-xs tracking-wider font-bold`}>
      <div className="flex items-center gap-2">
        <span>THREAT:</span>
        <span className="text-base">{conditionLevel}</span>
        <span>-</span>
        <span>{conditionText}</span>
        <span className="animate-pulse">●</span>
      </div>
    </div>
  );
}
