import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface NEO {
  id: string;
  name: string;
  is_potentially_hazardous_asteroid: boolean;
  diameter: number;
  velocity: number;
  miss_distance_km: number;
  miss_distance_au: number;
  close_approach_date: string;
}

export const columns: ColumnDef<NEO>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "is_potentially_hazardous_asteroid",
    header: "Status",
    cell: ({ row }) => {
      const isHazardous = row.getValue("is_potentially_hazardous_asteroid");
      if (isHazardous) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="destructive"
                  className="bg-red-500/20 text-red-500 border-red-500/50 uppercase font-bold border-dotted"
                >
                  Hazardous
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                Potentially Hazardous Asteroid (PHA) - meets NASA criteria for
                close approach and size
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      return (
        <Badge
          variant="secondary"
          className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50 uppercase font-bold"
        >
          Safe
        </Badge>
      );
    },
  },
  {
    accessorKey: "diameter",
    header: "Diameter (m)",
    cell: ({ row }) => {
      const diameter = row.getValue("diameter") as number;
      return diameter.toLocaleString();
    },
  },
  {
    accessorKey: "velocity",
    header: "Velocity (km/h)",
    cell: ({ row }) => {
      const velocity = row.getValue("velocity") as number;
      return velocity.toLocaleString();
    },
  },
  {
    accessorKey: "miss_distance_au",
    header: "Miss Distance (AU)",
    cell: ({ row }) => {
      const au = row.getValue("miss_distance_au") as number;
      return au.toFixed(4);
    },
  },
  {
    accessorKey: "close_approach_date",
    header: "Close Approach Date",
  },
  
];
