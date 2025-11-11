import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";

interface ApproachHeaderProps {
  currentIndex: number;
  totalApproaches: number;
  isPotentiallyHazardous: boolean;
}

export const ApproachHeader = ({
  currentIndex,
  totalApproaches,
  isPotentiallyHazardous,
}: ApproachHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <h3 className="text-zinc-300 text-sm font-bold uppercase tracking-wider">
          Close Approaches
        </h3>
        <span className="text-xs text-zinc-500 font-mono">
          {currentIndex + 1} / {totalApproaches}
        </span>
      </div>
      {isPotentiallyHazardous && (
        <Badge
          variant="outline"
          className="border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
        >
          <AlertTriangle className="h-3 w-3" />
          PHA
        </Badge>
      )}
    </div>
  );
};
