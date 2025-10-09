import { Card } from "./ui/card";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface StatsCardProps {
  label: string;
  value: string | number;
  isHazard?: boolean;
  tooltip?: string;
}

/**
 * StatsCard component to display key statistics
 * @param {StatsCardProps} props
 * @returns A styled card component
 */
export const StatsCard = ({
  label,
  value,
  isHazard = false,
  tooltip,
}: StatsCardProps) => {
  return (
    <Card
      className={`bg-zinc-800/50 p-6 rounded-sm border-2 ${
        isHazard ? "border-red-800/50" : "border-zinc-700"
      }`}
    >
      <div className="flex items-center gap-2 mb-2">
        <p className="text-zinc-300 font-bold text-md uppercase tracking-wider">
          {label}
        </p>
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle
                  size={16}
                  className="text-zinc-400 hover:text-zinc-200 cursor-help transition-colors"
                  data-testid="tooltip-icon"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-sky-600 text-white border-2 border-sky-500">
                <p className="font-bold text-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <p
        className={`text-4xl font-bold ${
          isHazard ? "text-red-500" : "text-sky-400"
        }`}
      >
        {value}
      </p>
    </Card>
  );
};
