import { Card } from "./ui/card";

interface StatsCardProps {
  label: string;
  value: string | number;
  isHazard?: boolean;
}

/**
 * StatsCard component to display key statistics
 * @param {StatsCardProps} props
 * @returns A styled card component
 */
export const StatsCard = ({ label, value, isHazard = false }: StatsCardProps) => {
  return (
    <Card
      className={`bg-zinc-800/50 p-6 rounded-sm border-2 ${
        isHazard ? "border-red-800/50" : "border-zinc-700"
      }`}
    >
      <p className="text-zinc-300 font-bold text-xs uppercase tracking-wider mb-2">
        {label}
      </p>
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
