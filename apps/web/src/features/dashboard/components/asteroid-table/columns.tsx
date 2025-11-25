import type { ColumnDef } from "@tanstack/react-table";
import { Filter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-2">
          <span>Status</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const currentValue = column.getFilterValue();
              if (currentValue === undefined) {
                column.setFilterValue(true);
              } else if (currentValue === true) {
                column.setFilterValue(false);
              } else {
                column.setFilterValue(undefined);
              }
            }}
            className={`p-1 rounded transition-colors ${
              column.getFilterValue() === true
                ? "text-yellow-400 bg-yellow-700/30"
                : column.getFilterValue() === false
                ? "text-green-400 bg-green-700/30"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
            title="Click to filter: All → Hazardous → Safe → All"
          >
            <Filter className="h-3 w-3" />
          </button>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      if (value === undefined) return true;
      return row.getValue(id) === value;
    },
    cell: ({ row }) => {
      const isHazardous = row.getValue("is_potentially_hazardous_asteroid");
      if (isHazardous) {
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="destructive"
                  className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50 uppercase font-bold border font-mono text-xs tracking-wider"
                >
                  ⚠ PHA
                </Badge>
              </TooltipTrigger>
              <TooltipContent className="bg-zinc-900 border-2 border-yellow-700/50 text-zinc-100 font-mono text-xs">
                <div className="font-bold text-yellow-400 mb-1">Potentially Hazardous Asteroid</div>
                <div>Meets NASA criteria for close approach and size threshold</div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      }
      return (
        <Badge
          variant="secondary"
          className="bg-green-500/20 text-green-400 border-green-500/50 uppercase font-bold font-mono text-xs tracking-wider"
        >
          ✓ Safe
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
