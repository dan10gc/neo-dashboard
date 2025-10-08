import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

interface ScatterData {
  name: string;
  diameter: number;
  velocity: number;
  hazardous: boolean;
}

interface SizeVelocityScatterProps {
  data?: ScatterData[];
}

export const SizeVelocityScatter = ({ data }: SizeVelocityScatterProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-zinc-500">
        No data available
      </div>
    );
  }

  // Split data by hazard status
  const safeAsteroids = data.filter((item) => !item.hazardous);
  const hazardousAsteroids = data.filter((item) => item.hazardous);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: ScatterData }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          style={{
            backgroundColor: "#27272a",
            border: "2px solid #52525b",
            borderRadius: "4px",
            padding: "8px 12px",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
        >
          <p style={{ color: "#e4e4e7", fontWeight: "bold", marginBottom: "4px" }}>
            {data.name}
          </p>
          <p style={{ color: "#38bdf8" }}>
            Diameter: {data.diameter.toLocaleString()} m
          </p>
          <p style={{ color: "#38bdf8" }}>
            Velocity: {data.velocity.toLocaleString()} km/h
          </p>
          <p
            style={{
              color: data.hazardous ? "#ef4444" : "#34d399",
              fontWeight: "bold",
              marginTop: "4px",
            }}
          >
            {data.hazardous ? "⚠️ HAZARDOUS" : "✓ SAFE"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={350}>
      <ScatterChart margin={{ top: 20, right: 30, bottom: 60, left: 80 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
        <XAxis
          type="number"
          dataKey="diameter"
          name="Diameter"
          unit=" m"
          stroke="#a1a1aa"
          style={{ fontSize: "12px", fontFamily: "monospace" }}
          label={{
            value: "Diameter (meters)",
            position: "bottom",
            offset: 40,
            style: { fill: "#a1a1aa", fontFamily: "monospace", fontSize: "12px" },
          }}
        />
        <YAxis
          type="number"
          dataKey="velocity"
          name="Velocity"
          unit=" km/h"
          stroke="#a1a1aa"
          style={{ fontSize: "12px", fontFamily: "monospace" }}
          label={{
            value: "Velocity (km/h)",
            angle: -90,
            position: "left",
            offset: 60,
            style: { fill: "#a1a1aa", fontFamily: "monospace", fontSize: "12px" },
          }}
        />
        <ZAxis range={[50, 400]} />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: "3 3" }} />
        <Legend
          wrapperStyle={{
            fontFamily: "monospace",
            fontSize: "12px",
            textTransform: "uppercase",
          }}
        />
        <Scatter
          name="Safe"
          data={safeAsteroids}
          fill="#38bdf8"
          fillOpacity={0.8}
        />
        <Scatter
          name="Hazardous"
          data={hazardousAsteroids}
          fill="#ef4444"
          fillOpacity={0.8}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};