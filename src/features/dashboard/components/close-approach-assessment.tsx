import { ShieldAlert, ChevronDown, ChevronUp, Info, ArrowRight } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { usePostHog } from "posthog-js/react";
import type { CloseApproachAssessment } from "@/lib/transformers";

interface CloseApproachAssessmentProps {
  assessment: CloseApproachAssessment;
}

// Close Approach Alert level styles (Option 1 - Final implementation)
const THREAT_LEVEL_STYLES = {
  NOTEWORTHY: {
    textColor: "text-orange-400",
    borderColor: "border-orange-700/50",
    bgColor: "bg-orange-950/30",
    borderRgb: "194, 65, 12",
  },
  NOTABLE: {
    textColor: "text-yellow-400",
    borderColor: "border-yellow-700/50",
    bgColor: "bg-yellow-950/30",
    borderRgb: "161, 98, 7",
  },
  TRACKED: {
    textColor: "text-blue-400",
    borderColor: "border-blue-700/50",
    bgColor: "bg-blue-950/30",
    borderRgb: "29, 78, 216",
  },
  ROUTINE: {
    textColor: "text-green-400",
    borderColor: "border-green-700/50",
    bgColor: "bg-green-950/30",
    borderRgb: "21, 128, 61",
  },
};

export function CloseApproachAssessment({ assessment }: CloseApproachAssessmentProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const posthog = usePostHog();

  const { totalScore, closeApproachLevel, factors, totalHazardous, totalAsteroids, hazardPercentage } = assessment;

  const styles = useMemo(() => THREAT_LEVEL_STYLES[closeApproachLevel as keyof typeof THREAT_LEVEL_STYLES], [closeApproachLevel]);
  const { textColor, borderColor, bgColor, borderRgb } = styles;

  // Pulse animation - pulse for alert scores 3-5 (higher concern)
  const springs = useSpring({
    from: { borderOpacity: 0.5 },
    to: async (next) => {
      // Pulse for alert scores 3, 4, 5 (NOTABLE and NOTEWORTHY)
      if (totalScore >= 3) {
        while (true) {
          await next({ borderOpacity: 1 });
          await next({ borderOpacity: 0.5 });
        }
      } else {
        // No animation for scores 0, 1, 2 (No PHAs, ROUTINE, TRACKED)
        await next({ borderOpacity: 0.5 });
      }
    },
    config: { tension: 180, friction: 12 },
  });

  return (
    <animated.div
      className={`${bgColor} border-2 ${borderColor} p-6 rounded-sm`}
      style={{
        borderColor: springs.borderOpacity.to(opacity => `rgba(${borderRgb}, ${opacity})`)
      }}
    >
      {/* Header Row */}
      <div className="grid grid-cols-2 gap-6 items-center">
        {/* Left Column - Text Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>Close Approach Alert</span>
          </div>
          <div className={`${textColor} font-bold text-2xl uppercase tracking-wide`}>
            {closeApproachLevel}
          </div>
          <div className={`flex items-center gap-2 ${textColor} font-mono text-sm`}>
            <span className="animate-pulse">●</span>
            <span>Based on Proximity</span>
          </div>
        </div>

        {/* Right Column - Proximity Score */}
        <div className="flex items-center justify-center">
          <div className={`${textColor} font-bold text-7xl leading-none`}>
            {totalScore}
          </div>
        </div>
      </div>

      {/* Alert Info Row */}
      <div className="mt-4 pt-4 border-t border-zinc-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="text-zinc-500 font-mono">
            <span className="text-zinc-400">Alert based on closest PHA approach distance</span>
          </div>
          <div className="text-zinc-400 font-mono">
            Alert Score: <span className={textColor}>{totalScore}</span>/5
          </div>
        </div>
      </div>

      {/* Expandable Contributing Factors */}
      <div className="mt-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between text-sm text-zinc-400 hover:text-zinc-300 transition-colors py-2"
        >
          <span className="font-mono">Contributing Factors:</span>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </div>
        </button>

        {/* Factors - Hidden by default, shown when expanded */}
        {isExpanded && (
          <div className="space-y-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
            {totalHazardous === 0 ? (
              /* No PHAs detected - show special message */
              <div className="bg-zinc-800/30 p-4 rounded-lg border border-zinc-700/50 text-center">
                <p className="text-sm text-zinc-400">
                  No potentially hazardous asteroids detected in the next 7 days.
                </p>
                <p className="text-xs text-zinc-500 mt-2">
                  All {totalAsteroids} detected asteroids are classified as safe.
                </p>
              </div>
            ) : (
              /* PHAs exist - show proximity */
              <>
                {factors.map((factor) => {
                  const percentage = (factor.score / 5) * 100; // 0-5 scale converted to percentage

                  return (
                    <div key={factor.name} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-400 font-mono">
                          {factor.name}
                        </span>
                        <span className="text-zinc-500">{factor.displayValue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${textColor} bg-current transition-all duration-500`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-zinc-500 font-mono w-8 text-right">
                          {factor.score}/5
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Summary */}
                <div className="pt-3 border-t border-zinc-700/50 text-xs text-zinc-500">
                  <span className={textColor}>{totalHazardous}</span> of {totalAsteroids} asteroids are potentially hazardous ({hazardPercentage.toFixed(1)}%)
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Learn More Link */}
      <div className="mt-4 pt-4 border-t border-zinc-700/50">
        <Link
          to="/close-approach-info"
          onClick={() => {
            posthog?.capture('close_approach_learn_more_clicked', {
              alert_level: closeApproachLevel,
              alert_score: totalScore,
              total_hazardous: totalHazardous,
              source: 'close_approach_assessment_card'
            });
          }}
          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-blue-400 transition-colors font-mono group"
        >
          <span>Learn more about alert levels</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </animated.div>
  );
}
