import { ShieldAlert } from "lucide-react";

interface ThreatAssessmentProps {
  totalHazardous: number;
  totalAsteroids: number;
}

export function ThreatAssessment({ totalHazardous, totalAsteroids }: ThreatAssessmentProps) {
  // Calculate threat level (1-5 scale, 5 = minimal threat)
  // Based on percentage of hazardous asteroids
  const hazardPercentage = totalAsteroids > 0 ? (totalHazardous / totalAsteroids) * 100 : 0;

  let conditionLevel: number;
  let conditionText: string;
  let textColor: string;
  let borderColor: string;
  let bgColor: string;

  if (hazardPercentage >= 20) {
    conditionLevel = 1;
    conditionText = "CRITICAL";
    textColor = "text-red-400";
    borderColor = "border-red-700/50";
    bgColor = "bg-red-950/30";
  } else if (hazardPercentage >= 15) {
    conditionLevel = 2;
    conditionText = "ELEVATED";
    textColor = "text-yellow-400";
    borderColor = "border-yellow-700/50";
    bgColor = "bg-yellow-950/30";
  } else if (hazardPercentage >= 10) {
    conditionLevel = 3;
    conditionText = "MODERATE";
    textColor = "text-yellow-400";
    borderColor = "border-yellow-700/50";
    bgColor = "bg-yellow-950/30";
  } else if (hazardPercentage >= 5) {
    conditionLevel = 4;
    conditionText = "LOW";
    textColor = "text-green-400";
    borderColor = "border-green-700/50";
    bgColor = "bg-green-950/30";
  } else {
    conditionLevel = 5;
    conditionText = "MINIMAL";
    textColor = "text-green-400";
    borderColor = "border-green-700/50";
    bgColor = "bg-green-950/30";
  }

  return (
    <div className={`${bgColor} border-2 ${borderColor} p-6 rounded-sm`}>
      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6 items-center">
        {/* Left Column - Text Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>Threat Assessment</span>
          </div>
          <div className={`${textColor} font-bold text-2xl uppercase tracking-wide`}>
            {conditionText}
          </div>
          <div className={`flex items-center gap-2 ${textColor} font-mono text-sm`}>
            <span className="animate-pulse">●</span>
            <span>CONDITION {conditionLevel}</span>
          </div>
        </div>

        {/* Right Column - Large Number */}
        <div className="flex items-center justify-center">
          <div className={`${textColor} font-bold text-7xl leading-none`}>
            {conditionLevel}
          </div>
        </div>
      </div>

      {/* Bottom Row - Additional Info */}
      <div className="mt-4 pt-4 border-t border-zinc-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="text-zinc-500 font-mono">
            Scale: <span className="text-zinc-400">1 = Critical • 5 = Minimal</span>
          </div>
          <div className="text-zinc-400 font-mono">
            <span className={textColor}>{totalHazardous}</span> / {totalAsteroids} Hazardous
            <span className="text-zinc-500 ml-2">({hazardPercentage.toFixed(1)}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
