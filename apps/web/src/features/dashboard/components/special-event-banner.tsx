import { X, Sparkles, Star, Orbit, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import type { SpecialEvent } from "../../../types/special-events";

interface SpecialEventBannerProps {
  event: SpecialEvent;
  onDismiss?: () => void;
  isDismissible?: boolean;
  defaultExpanded?: boolean;
}

/**
 * Collapsible banner component for highlighting special astronomical events
 * Starts as a thin banner, expands to show full details on click
 * Designed for integration with real-time feed architecture
 */
export function SpecialEventBanner({
  event,
  onDismiss,
  isDismissible = true,
  defaultExpanded = false,
}: SpecialEventBannerProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isVisible) return null;

  // Icon mapping based on event type
  const iconMap = {
    comet: Orbit,
    interstellar: Star,
    meteor_shower: Sparkles,
    unusual_neo: Orbit,
    mission_related: Orbit,
  };

  const Icon = iconMap[event.type];

  // Color scheme based on priority and type
  const getColorClasses = () => {
    if (event.isPotentiallyHazardous) {
      return {
        border: "border-yellow-500/50",
        bg: "bg-yellow-950/20",
        icon: "text-yellow-400",
        text: "text-yellow-100",
        badge: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
      };
    }

    if (event.type === "interstellar") {
      return {
        border: "border-purple-500/50",
        bg: "bg-purple-950/20",
        icon: "text-purple-400",
        text: "text-purple-100",
        badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      };
    }

    if (event.type === "comet") {
      return {
        border: "border-cyan-500/50",
        bg: "bg-cyan-950/20",
        icon: "text-cyan-400",
        text: "text-cyan-100",
        badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
      };
    }

    // Default for other types
    return {
      border: "border-blue-500/50",
      bg: "bg-blue-950/20",
      icon: "text-blue-400",
      text: "text-blue-100",
      badge: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    };
  };

  const colors = getColorClasses();

  // Format distance with proper units
  const formatDistance = () => {
    const { value, unit } = event.distance;
    if (unit === "AU") {
      return `${value.toFixed(2)} AU`;
    }
    if (unit === "km") {
      return `${(value / 1_000_000).toFixed(2)}M km`;
    }
    return `${value.toFixed(1)} ${unit}`;
  };

  // Format event date
  const formatDate = () => {
    const date = new Date(event.eventDate);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Calculate days until event
  const daysUntil = Math.ceil(
    (event.eventTimestamp - Date.now()) / (1000 * 60 * 60 * 24)
  );

  const isPast = daysUntil < 0;
  const isToday = daysUntil === 0;

  // React Spring animation for smooth expand/collapse
  const contentAnimation = useSpring({
    maxHeight: isExpanded ? "1000px" : "0px",
    opacity: isExpanded ? 1 : 0,
    marginTop: isExpanded ? 16 : 0,
    config: { tension: 280, friction: 60 },
  });

  const chevronRotation = useSpring({
    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
    config: { tension: 300, friction: 25 },
  });

  const titleAnimation = useSpring({
    fontSize: isExpanded ? "1.125rem" : "0.875rem", // text-lg (18px) to text-sm (14px)
    config: { tension: 280, friction: 60 },
  });

  const iconAnimation = useSpring({
    width: isExpanded ? 28 : 20,
    height: isExpanded ? 28 : 20,
    config: { tension: 280, friction: 60 },
  });

  const badgeAnimation = useSpring({
    padding: isExpanded ? "0.125rem 0.5rem" : "0.125rem 0.375rem", // py-0.5 px-2 to py-0.5 px-1.5
    config: { tension: 280, friction: 60 },
  });

  // Determine if we should show the "new" pulse animation
  const shouldShowNewPulse = !isExpanded && (event.priority === "critical" || event.priority === "high");

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0%, 100% {
            opacity: 0.3;
            transform: translateX(-100%);
          }
          50% {
            opacity: 0.6;
            transform: translateX(100%);
          }
        }
      `}</style>
      <div
        className={`
          relative overflow-hidden rounded-lg border-2
          ${colors.border} ${colors.bg}
          backdrop-blur-sm
        `}
      >
      {/* Animated gradient border pulse for collapsed new events */}
      {shouldShowNewPulse && !isPast && (
        <div
          className="absolute inset-0 rounded-lg pointer-events-none animate-pulse"
          style={{
            background: `linear-gradient(90deg,
              transparent 0%,
              ${event.isPotentiallyHazardous ? "rgba(234, 179, 8, 0.15)" : "rgba(168, 85, 247, 0.15)"} 50%,
              transparent 100%)`,
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
      )}

      {/* Animated background pulse for expanded critical events */}
      {event.priority === "critical" && !isPast && isExpanded && (
        <div
          className="absolute inset-0 opacity-20 animate-pulse"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${
              event.isPotentiallyHazardous
                ? "rgb(234, 179, 8)"
                : "rgb(168, 85, 247)"
            } 0%, transparent 70%)`,
          }}
        />
      )}

      <div className="relative px-4 py-3">
        {/* Header Row - Always Visible */}
        <div className="flex items-center gap-3">
          <animated.div
            className={`flex-shrink-0 ${colors.icon}`}
            style={iconAnimation}
          >
            <Icon className="w-full h-full" />
          </animated.div>

          <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <animated.h3
                className={`font-bold ${colors.text}`}
                style={titleAnimation}
              >
                {event.name}
              </animated.h3>
              {event.isPotentiallyHazardous && (
                <animated.span
                  className="inline-flex items-center gap-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                  style={badgeAnimation}
                >
                  <AlertTriangle size={isExpanded ? 12 : 10} />
                  HAZARDOUS
                </animated.span>
              )}
              {!isExpanded && (
                <span className="text-xs text-zinc-400">
                  {isPast ? "Past Event" : isToday ? "Today!" : `${daysUntil} days`}
                </span>
              )}
            </div>

            {/* Expand/Collapse Button - Fixed Position */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={toggleExpanded}
                className={`flex items-center gap-2 p-1.5 rounded hover:bg-white/10 transition-colors ${colors.icon}`}
                aria-label={isExpanded ? "Collapse details" : "Expand details"}
              >
                {!isExpanded && (
                  <span className="text-xs text-zinc-500 hidden sm:inline">
                    Expand
                  </span>
                )}
                <animated.div style={chevronRotation}>
                  <ChevronDown className="w-4 h-4" />
                </animated.div>
              </button>

              {isDismissible && (
                <button
                  onClick={handleDismiss}
                  className={`
                    flex-shrink-0 p-1 rounded hover:bg-white/10
                    transition-colors ${colors.icon}
                  `}
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Expanded Content - Animated */}
        <animated.div style={contentAnimation} className="overflow-hidden">
            {/* Badges Row */}
            <div className="flex items-center gap-2 flex-wrap mb-3 ml-11">
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium border ${colors.badge}`}
              >
                {event.type.replace("_", " ").toUpperCase()}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium border ${colors.badge}`}
              >
                {event.origin.replace("_", " ").toUpperCase()}
              </span>
            </div>

            {/* Description */}
            <div className="ml-11">
              <p className="text-sm text-zinc-300 mb-4">{event.description}</p>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <span className="text-zinc-500 block">Distance</span>
                  <span className={`font-semibold ${colors.text}`}>
                    {formatDistance()}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 block">Event Date</span>
                  <span className={`font-semibold ${colors.text}`}>
                    {formatDate()}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 block">Time Until</span>
                  <span className={`font-semibold ${colors.text}`}>
                    {isPast
                      ? "Past Event"
                      : isToday
                        ? "Today!"
                        : `${daysUntil} days`}
                  </span>
                </div>

                {event.velocity && (
                  <div>
                    <span className="text-zinc-500 block">Velocity</span>
                    <span className={`font-semibold ${colors.text}`}>
                      {event.velocity.value.toLocaleString()}{" "}
                      {event.velocity.unit}
                    </span>
                  </div>
                )}

                {event.diameter && (
                  <div>
                    <span className="text-zinc-500 block">Diameter</span>
                    <span className={`font-semibold ${colors.text}`}>
                      {event.diameter.min.toFixed(1)}-
                      {event.diameter.max.toFixed(1)} {event.diameter.unit}
                    </span>
                  </div>
                )}
              </div>

              {/* Significance note if available */}
              {event.metadata?.significance && (
                <div className="mt-3 pt-3 border-t border-white/10">
                  <p className="text-xs text-zinc-400 italic">
                    {event.metadata.significance}
                  </p>
                </div>
              )}
            </div>
        </animated.div>
      </div>
    </div>
    </>
  );
}
