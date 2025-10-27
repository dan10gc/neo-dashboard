import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Calendar } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";

// Animated decimal number component (for averages)
function AnimatedDecimal({ value, decimals = 1, duration = 1000 }: { value: number; decimals?: number; duration?: number }) {
  const { number } = useSpring({
    from: { number: 0 },
    to: { number: value },
    config: { duration },
  });

  return <animated.span>{number.to((n) => n.toFixed(decimals))}</animated.span>;
}

interface ChartData {
  date: string;
  hazardous: number;
  safe: number;
  total: number;
}

interface ApproachBarChartProps {
  data?: ChartData[];
}

export const ApproachBarChart = ({ data }: ApproachBarChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-zinc-500">
        No data available
      </div>
    );
  }

  // Calculate statistics
  const avgPerDay = data.reduce((sum, item) => sum + item.total, 0) / data.length;
  const peakDay = data.reduce((max, item) => (item.total > max.total ? item : max), data[0]);

  // Format date to show just month/day
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const formattedData = data.map((item) => ({
    ...item,
    dateFormatted: formatDate(item.date),
  }));

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-zinc-700">
        <Calendar className="h-5 w-5 text-cyan-400" />
        <h2 className="text-zinc-300 text-sm font-bold uppercase tracking-wider">
          Close Approaches Over Time
        </h2>
      </div>

      {/* Statistics Grid - Only Unique Metric */}
      <div className="mb-6">
        <div className="bg-zinc-900/50 p-4 rounded-sm border border-cyan-700/50 inline-block">
          <div className="text-xs text-zinc-500 uppercase tracking-wider mb-1">
            Average Approaches Per Day
          </div>
          <div className="text-3xl font-bold text-cyan-400 font-mono">
            <AnimatedDecimal value={avgPerDay} decimals={1} />
          </div>
          <div className="text-xs text-zinc-600 mt-1">
            across {data.length} day{data.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Peak Activity Notice */}
      <div className="bg-cyan-950/30 border border-cyan-700/50 p-3 rounded-sm mb-6">
        <div className="flex items-start gap-2">
          <div className="text-cyan-400 text-xs font-mono">
            <span className="font-bold uppercase tracking-wider">Peak Activity:</span>{" "}
            {formatDate(peakDay.date)} with {peakDay.total} approaches
            {peakDay.hazardous > 0 && (
              <span className="text-yellow-400"> ({peakDay.hazardous} hazardous)</span>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-zinc-900/30 p-4 rounded-sm border border-zinc-700/50">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={formattedData} barGap={0}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
            <XAxis
              dataKey="dateFormatted"
              stroke="#71717a"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              tickLine={{ stroke: "#52525b" }}
              style={{ fontFamily: "monospace" }}
            />
            <YAxis
              stroke="#71717a"
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
              tickLine={{ stroke: "#52525b" }}
              style={{ fontFamily: "monospace" }}
              label={{
                value: "Approaches",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#a1a1aa", fontSize: 11, fontFamily: "monospace" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#18181b",
                border: "2px solid #3f3f46",
                borderRadius: "2px",
                fontFamily: "monospace",
                fontSize: "11px",
              }}
              labelStyle={{
                color: "#e4e4e7",
                fontWeight: "bold",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
              itemStyle={{ color: "#e4e4e7", padding: "2px 0" }}
              cursor={{ fill: "#27272a" }}
            />
            <Bar
              dataKey="safe"
              fill="#22c55e"
              name="Non-Hazardous"
              radius={[0, 0, 0, 0]}
              stackId="a"
            />
            <Bar
              dataKey="hazardous"
              fill="#facc15"
              name="Hazardous"
              radius={[2, 2, 0, 0]}
              stackId="a"
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-zinc-700/50">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
              Non-Hazardous
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-mono">
              Hazardous
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};