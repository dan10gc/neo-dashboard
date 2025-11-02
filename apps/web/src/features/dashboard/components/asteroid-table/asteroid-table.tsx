import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import type { AsteroidTableRow } from "@/lib/transformers/transformers";

import { Database } from "lucide-react";

export const AsteroidTable = ({ data }: { data: AsteroidTableRow[] }) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b-2 border-zinc-700">
        <Database className="h-5 w-5 text-cyan-400" />
        <h2 className="text-zinc-300 text-sm font-bold uppercase tracking-wider">
          Asteroid Catalog
        </h2>
        <span className="text-xs text-zinc-500 font-mono ml-auto">
          {data.length} OBJECTS
        </span>
      </div>

      {/* Table */}
      <DataTable columns={columns} data={data} />
    </div>
  );
};
