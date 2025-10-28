import { useEffect, useState } from "react";

interface ApproachCounterProps {
  epochDate: number;
  isPast: boolean;
}

export const ApproachCounter = ({
  isPast,
  epochDate,
}: ApproachCounterProps) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (isPast) {
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const diff = epochDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setCountdown({ days, hours, minutes, seconds });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown()

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [epochDate, isPast]);

  return (
    <div
      className={`bg-zinc-900/50 p-4 rounded-sm border-2 ${
        isPast ? "border-zinc-700" : "border-green-700/50"
      }`}
    >
      <div className="text-xs text-zinc-500 uppercase tracking-wider mb-2 text-center">
        {isPast ? "Time Since Approach" : "Time Until Closest Approach"}
      </div>
      {isPast ? (
        <div className="text-center text-lg text-zinc-500 font-mono">
          Approach Occurred
        </div>
      ) : (
        <div className="text-center text-2xl font-bold text-green-400 font-mono">
          {countdown.days}d {countdown.hours}h {countdown.minutes}m{" "}
          {countdown.seconds}s
        </div>
      )}
    </div>
  );
};
