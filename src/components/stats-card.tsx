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
      className={`bg-zinc-900 p-6 ${
        isHazard ? "border-red-900" : "border-zinc-600"
      }`}
    >
      <p className="text-zinc-50 font-bold text-sm uppercase tracking-wider mb-2">
        {label}
      </p>
      <p
        className={`text-4xl font-bold ${
          isHazard ? "text-red-400" : "text-cyan-400"
        }`}
      >
        {value}
      </p>
    </Card>
  );
};
