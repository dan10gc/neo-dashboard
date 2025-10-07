import type { ColumnDef } from "@tanstack/react-table";

interface NEO {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  diameter: number;
  velocity: number;
  miss_distance: number;
  close_approach_date: string;
}

export const columns: ColumnDef<NEO>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  { accessorKey: "diameter", header: "Diameter (m)" },
  {
    accessorKey: "velocity",
    header: "Velocity (km/h)",
  },
  {
    accessorKey: "miss_distance",
    header: "Miss Distance (km)",
  },
  {
    accessorKey: "close_approach_date",
    header: "Close Approach Date",
  },
  {
    accessorKey: "is_potentially_hazardous_asteroid",
    header: "Hazardous",
  },
];