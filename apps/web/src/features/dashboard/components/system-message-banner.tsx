import { Satellite } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  "CONNECTING TO NASA NEO NETWORK",
  "SCANNING NEAR-EARTH OBJECT DATABASE",
  "COMPUTING ORBITAL TRAJECTORIES",
  "ANALYZING CLOSE APPROACH DATA",
  "SYSTEMS READY - DISPLAY ONLINE",
];

interface SystemMessageBannerProps {
  /** Whether the banner should be visible */
  isVisible: boolean;
}

export function SystemMessageBanner({ isVisible }: SystemMessageBannerProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      return;
    }

    // Cycle through messages every 500ms
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

  // Reset when visibility changes
  useEffect(() => {
    if (isVisible) {
      setCurrentMessageIndex(0);
    }
  }, [isVisible]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-zinc-900/95 border-b-2 border-cyan-700/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-4">
          {/* Icon */}
          <Satellite className="h-6 w-6 text-sky-400 animate-pulse flex-shrink-0" />

          {/* System Status */}
          <div className="flex-1">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-mono mb-1">
              System Status
            </div>
            <div className="font-mono text-cyan-400 text-sm tracking-wide">
              {messages[currentMessageIndex]}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex gap-1.5 items-center">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                  index <= currentMessageIndex
                    ? "bg-cyan-400"
                    : "bg-zinc-700"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Loading bar */}
        <div className="mt-3 h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-400 transition-all duration-500 ease-out"
            style={{
              width: `${((currentMessageIndex + 1) / messages.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
