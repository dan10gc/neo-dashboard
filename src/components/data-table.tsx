import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import { X } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const DataTable = <TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  const hasActiveFilters = columnFilters.length > 0;
  const filteredRowCount = table.getFilteredRowModel().rows.length;
  const totalRowCount = table.getCoreRowModel().rows.length;

  return (
    <div className="space-y-4">
      {/* Filter Status Bar */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between bg-cyan-950/30 border border-cyan-700/50 p-3 rounded-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider font-bold">
              Active Filters:
            </span>
            <span className="text-xs text-zinc-400 font-mono">
              Showing {filteredRowCount} of {totalRowCount} objects
            </span>
          </div>
          <button
            onClick={() => table.resetColumnFilters()}
            className="flex items-center gap-1 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-sm text-xs text-zinc-300 font-mono uppercase tracking-wider transition-colors"
          >
            <X className="h-3 w-3" />
            Clear Filters
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-sm">
        <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
    </div>
  );
};
