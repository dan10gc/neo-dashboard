import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
        <XAxis
          dataKey="dateFormatted"
          stroke="#a1a1aa"
          style={{ fontSize: "12px", fontFamily: "monospace" }}
        />
        <YAxis
          stroke="#a1a1aa"
          style={{ fontSize: "12px", fontFamily: "monospace" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "#27272a",
            border: "2px solid #52525b",
            borderRadius: "4px",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
          labelStyle={{ color: "#e4e4e7", fontWeight: "bold" }}
          itemStyle={{ color: "#e4e4e7" }}
        />
        <Legend
          wrapperStyle={{
            fontFamily: "monospace",
            fontSize: "12px",
            textTransform: "uppercase",
          }}
        />
        <Bar dataKey="safe" fill="#38bdf8" name="Safe" radius={[4, 4, 0, 0]} />
        <Bar
          dataKey="hazardous"
          fill="#ef4444"
          name="Hazardous"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};