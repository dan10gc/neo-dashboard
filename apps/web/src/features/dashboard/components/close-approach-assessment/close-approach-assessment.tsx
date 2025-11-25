import { animated, useSpring } from "@react-spring/web";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { usePostHog } from "posthog-js/react";
import { useMemo } from "react";
import { Link } from "react-router";

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

export function CloseApproachAssessment({
  assessment,
}: CloseApproachAssessmentProps) {
  const posthog = usePostHog();

  const { totalScore, closeApproachLevel, totalHazardous } = assessment;

  const styles = useMemo(
    () =>
      THREAT_LEVEL_STYLES[
        closeApproachLevel as keyof typeof THREAT_LEVEL_STYLES
      ],
    [closeApproachLevel]
  );
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

  const handleOnClickLearnMore = () => {
    posthog?.capture("close_approach_learn_more_clicked", {
      alert_level: closeApproachLevel,
      alert_score: totalScore,
      total_hazardous: totalHazardous,
      source: "close_approach_assessment_card",
    });
  };

  return (
    <animated.div
      className={`${bgColor} border-2 ${borderColor} p-6 rounded-sm`}
      style={{
        borderColor: springs.borderOpacity.to(
          (opacity) => `rgba(${borderRgb}, ${opacity})`
        ),
      }}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between">
        {/* Left Column - Text Info */}
        <div>
          <div className="flex items-center gap-2 text-xs text-zinc-500 uppercase tracking-wider">
            <ShieldAlert className="h-4 w-4" />
            <span>Close Approach Alert</span>
          </div>
          <div
            className={`${textColor} font-bold text-2xl uppercase tracking-wide`}
          >
            {closeApproachLevel}
          </div>
          <div
            className={`flex items-center gap-2 ${textColor} font-mono text-sm`}
          >
            <span className="animate-pulse">●</span>
            <span>Based on Proximity</span>
          </div>
        </div>

        {/* Right Column - Proximity Score */}
        <div className="flex items-center justify-center mr-2">
          <div className={`${textColor} font-bold text-7xl leading-none`}>
            {totalScore}
          </div>
        </div>
      </div>

      {/* Alert Info Row */}
      <div className="mt-4 pt-4 border-zinc-700/50">
        <div className="flex items-center justify-between text-sm">
          <div className="text-zinc-500 font-mono">
            <span className="text-zinc-400">
              Alert based on closest PHA approach distance
            </span>
          </div>
          <div className="text-zinc-400 font-mono">
            Alert Score: <span className={textColor}>{totalScore}</span>/5
          </div>
        </div>
      </div>

      {/* Learn More Link */}
      <div className="mt-4 pt-4 border-t border-zinc-700/50">
        <Link
          to="/close-approach-info"
          onClick={handleOnClickLearnMore}
          className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-blue-400 transition-colors font-mono group"
        >
          <span>Learn more about alert levels</span>
          <ArrowRight className="h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </animated.div>
  );
}
