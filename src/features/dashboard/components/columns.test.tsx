import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { columns } from "./columns";
import type { ColumnDef } from "@tanstack/react-table";

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

// Helper function to render a cell from column definition
const renderCell = (column: ColumnDef<NEO>, value: unknown, row: NEO) => {
  if (column.cell && typeof column.cell === "function") {
    // Type assertion is safe here as we're mocking the cell context for testing
    const cell = column.cell({
      getValue: () => value,
      row: {
        getValue: (key: string) => row[key as keyof NEO],
      },
    } as Parameters<typeof column.cell>[0]);
    return cell;
  }
  return value;
};

describe("Columns", () => {
  const mockNEO: NEO = {
    id: "123",
    name: "433 Eros",
    is_potentially_hazardous_asteroid: false,
    diameter: 16700,
    velocity: 24000,
    miss_distance_km: 22000000,
    miss_distance_au: 0.147,
    close_approach_date: "2024-10-15",
  };

  const hazardousNEO: NEO = {
    id: "456",
    name: "99942 Apophis",
    is_potentially_hazardous_asteroid: true,
    diameter: 370,
    velocity: 30000,
    miss_distance_km: 31000,
    miss_distance_au: 0.0002,
    close_approach_date: "2029-04-13",
  };

  it("should have correct number of columns", () => {
    expect(columns).toHaveLength(6);
  });

  it("should have name column with correct header", () => {
    const nameColumn = columns[0];
    expect("accessorKey" in nameColumn && nameColumn.accessorKey).toBe("name");
    expect(nameColumn.header).toBe("Name");
  });

  it("should have status column with correct header", () => {
    const statusColumn = columns[1];
    expect("accessorKey" in statusColumn && statusColumn.accessorKey).toBe("is_potentially_hazardous_asteroid");
    // Header is a function component with filter button, not a string
    expect(typeof statusColumn.header).toBe("function");
  });

  it("should have diameter column with correct header", () => {
    const diameterColumn = columns[2];
    expect("accessorKey" in diameterColumn && diameterColumn.accessorKey).toBe("diameter");
    expect(diameterColumn.header).toBe("Diameter (m)");
  });

  it("should format diameter with locale string", () => {
    const diameterColumn = columns[2];
    const result = renderCell(diameterColumn, mockNEO.diameter, mockNEO);

    render(<div>{result}</div>);
    expect(screen.getByText("16,700")).toBeInTheDocument();
  });

  it("should have velocity column with correct header", () => {
    const velocityColumn = columns[3];
    expect("accessorKey" in velocityColumn && velocityColumn.accessorKey).toBe("velocity");
    expect(velocityColumn.header).toBe("Velocity (km/h)");
  });

  it("should format velocity with locale string", () => {
    const velocityColumn = columns[3];
    const result = renderCell(velocityColumn, mockNEO.velocity, mockNEO);

    render(<div>{result}</div>);
    expect(screen.getByText("24,000")).toBeInTheDocument();
  });

  it("should have miss distance column with correct header", () => {
    const missDistanceColumn = columns[4];
    expect("accessorKey" in missDistanceColumn && missDistanceColumn.accessorKey).toBe("miss_distance_au");
    expect(missDistanceColumn.header).toBe("Miss Distance (AU)");
  });

  it("should format miss distance to 4 decimal places", () => {
    const missDistanceColumn = columns[4];
    const result = renderCell(missDistanceColumn, mockNEO.miss_distance_au, mockNEO);

    render(<div>{result}</div>);
    expect(screen.getByText("0.1470")).toBeInTheDocument();
  });

  it("should have close approach date column with correct header", () => {
    const dateColumn = columns[5];
    expect("accessorKey" in dateColumn && dateColumn.accessorKey).toBe("close_approach_date");
    expect(dateColumn.header).toBe("Close Approach Date");
  });

  it("should render Safe badge for non-hazardous asteroids", () => {
    const statusColumn = columns[1];
    const result = renderCell(
      statusColumn,
      mockNEO.is_potentially_hazardous_asteroid,
      mockNEO
    );

    render(<div>{result}</div>);
    const badge = screen.getByText("✓ Safe");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-green-500/20", "text-green-400", "border-green-500/50");
  });

  it("should render PHA badge for hazardous asteroids", () => {
    const statusColumn = columns[1];
    const result = renderCell(
      statusColumn,
      hazardousNEO.is_potentially_hazardous_asteroid,
      hazardousNEO
    );

    render(<div>{result}</div>);
    const badge = screen.getByText("⚠ PHA");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("bg-yellow-500/20", "text-yellow-400", "border-yellow-500/50");
  });

  it("should format small diameter numbers correctly", () => {
    const smallDiameterNEO = { ...mockNEO, diameter: 150 };
    const diameterColumn = columns[2];
    const result = renderCell(diameterColumn, smallDiameterNEO.diameter, smallDiameterNEO);

    render(<div>{result}</div>);
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("should format large velocity numbers correctly", () => {
    const fastNEO = { ...mockNEO, velocity: 100000 };
    const velocityColumn = columns[3];
    const result = renderCell(velocityColumn, fastNEO.velocity, fastNEO);

    render(<div>{result}</div>);
    expect(screen.getByText("100,000")).toBeInTheDocument();
  });

  it("should format very small AU distances correctly", () => {
    const closeNEO = { ...mockNEO, miss_distance_au: 0.0001 };
    const missDistanceColumn = columns[4];
    const result = renderCell(missDistanceColumn, closeNEO.miss_distance_au, closeNEO);

    render(<div>{result}</div>);
    expect(screen.getByText("0.0001")).toBeInTheDocument();
  });
});
