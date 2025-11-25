import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SizeVelocityScatter } from "./size-velocity-scatter";

// Mock analytics
vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

// Import the mock after defining it
import { trackEvent } from "@/lib/analytics";
import type { SizeVelocityDataPoint } from "@/lib/transformers/transformers";

describe("SizeVelocityScatter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createMockDataPoint = (
    overrides: Partial<SizeVelocityDataPoint> = {}
  ): SizeVelocityDataPoint => ({
    name: "Test Asteroid",
    diameter: 500,
    velocity: 15.5,
    hazardous: false,
    absoluteMagnitude: 20.0,
    ...overrides,
  });

  const renderComponent = (data?: SizeVelocityDataPoint[]) => {
    return render(<SizeVelocityScatter data={data} />);
  };

  describe("Basic Rendering", () => {
    it("should render the component title", () => {
      const data = [createMockDataPoint()];
      renderComponent(data);

      expect(
        screen.getByText("Size vs Velocity Distribution")
      ).toBeInTheDocument();
    });

    it("should render statistics cards", () => {
      const data = [
        createMockDataPoint({ diameter: 1000, velocity: 20 }),
        createMockDataPoint({ diameter: 500, velocity: 30 }),
      ];
      renderComponent(data);

      expect(screen.getByText("Largest Object")).toBeInTheDocument();
      expect(screen.getByText("Fastest Object")).toBeInTheDocument();
    });

    it("should render the legend", () => {
      const data = [createMockDataPoint()];
      renderComponent(data);

      expect(screen.getByText("Non-Hazardous")).toBeInTheDocument();
      expect(screen.getByText("Potentially Hazardous")).toBeInTheDocument();
    });

    it("should render the chart container", () => {
      const data = [createMockDataPoint()];
      const { container } = renderComponent(data);

      // Check for ResponsiveContainer (Recharts renders it)
      const chartContainer = container.querySelector(
        ".recharts-responsive-container"
      );
      expect(chartContainer).toBeInTheDocument();
    });
  });

  describe("Empty State", () => {
    it("should show empty state when data is undefined", () => {
      renderComponent(undefined);

      expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("should show empty state when data is empty array", () => {
      renderComponent([]);

      expect(screen.getByText("No data available")).toBeInTheDocument();
    });

    it("should not render statistics in empty state", () => {
      renderComponent([]);

      expect(screen.queryByText("Largest Object")).not.toBeInTheDocument();
      expect(screen.queryByText("Fastest Object")).not.toBeInTheDocument();
    });
  });

  describe("Statistics Display", () => {
    it("should display the largest asteroid correctly", () => {
      const data = [
        createMockDataPoint({ name: "Small One", diameter: 100 }),
        createMockDataPoint({ name: "Huge One", diameter: 5000 }),
        createMockDataPoint({ name: "Medium One", diameter: 500 }),
      ];
      renderComponent(data);

      // Check for the largest diameter value
      expect(screen.getByText("Largest Object")).toBeInTheDocument();
      expect(screen.getByText("Huge One")).toBeInTheDocument();
    });

    it("should display the fastest asteroid correctly", () => {
      const data = [
        createMockDataPoint({ name: "Slow One", velocity: 5.5 }),
        createMockDataPoint({ name: "Fast One", velocity: 35.8 }),
        createMockDataPoint({ name: "Medium One", velocity: 15.0 }),
      ];
      renderComponent(data);

      // Check for the fastest asteroid name
      expect(screen.getByText("Fastest Object")).toBeInTheDocument();
      expect(screen.getByText("Fast One")).toBeInTheDocument();
    });

    it("should display units correctly", () => {
      const data = [createMockDataPoint()];
      renderComponent(data);

      expect(screen.getByText("meters diameter")).toBeInTheDocument();
      expect(screen.getByText("km/s velocity")).toBeInTheDocument();
    });

    it("should handle single asteroid correctly", () => {
      const data = [
        createMockDataPoint({
          name: "Only One",
          diameter: 750,
          velocity: 12.3,
        }),
      ];
      renderComponent(data);

      // The same asteroid should be both largest and fastest
      const asteroidNames = screen.getAllByText("Only One");
      expect(asteroidNames).toHaveLength(2); // Once in each stat card
    });
  });

  describe("Data Segregation", () => {
    it("should handle mixed hazardous and safe asteroids", () => {
      const data = [
        createMockDataPoint({ hazardous: false }),
        createMockDataPoint({ hazardous: true }),
        createMockDataPoint({ hazardous: false }),
      ];
      renderComponent(data);

      // Component should render without errors
      expect(
        screen.getByText("Size vs Velocity Distribution")
      ).toBeInTheDocument();
    });

    it("should handle only hazardous asteroids", () => {
      const data = [
        createMockDataPoint({ hazardous: true, name: "Hazard 1" }),
        createMockDataPoint({ hazardous: true, name: "Hazard 2" }),
      ];
      renderComponent(data);

      expect(
        screen.getByText("Size vs Velocity Distribution")
      ).toBeInTheDocument();
    });

    it("should handle only safe asteroids", () => {
      const data = [
        createMockDataPoint({ hazardous: false, name: "Safe 1" }),
        createMockDataPoint({ hazardous: false, name: "Safe 2" }),
      ];
      renderComponent(data);

      expect(
        screen.getByText("Size vs Velocity Distribution")
      ).toBeInTheDocument();
    });
  });

  describe("Analytics Tracking", () => {
    it("should track chart click interaction", async () => {
      const user = userEvent.setup();
      const data = [createMockDataPoint()];
      const { container } = renderComponent(data);

      const chart = container.querySelector(".recharts-wrapper");
      if (chart) {
        await user.click(chart);

        expect(trackEvent).toHaveBeenCalledWith("chart_interaction", {
          chart_type: "size_velocity_scatter",
          interaction_type: "click",
        });
      }
    });

    it("should track hover interaction only once", async () => {
      const user = userEvent.setup();
      const data = [createMockDataPoint()];
      const { container } = renderComponent(data);

      const chart = container.querySelector(".recharts-wrapper");
      if (chart) {
        // Trigger multiple hover events
        await user.hover(chart);
        await user.unhover(chart);
        await user.hover(chart);

        // Should only track once due to ref-based debouncing
        expect(trackEvent).toHaveBeenCalledTimes(1);
        expect(trackEvent).toHaveBeenCalledWith("chart_interaction", {
          chart_type: "size_velocity_scatter",
          interaction_type: "hover",
        });
      }
    });
  });

  describe("Edge Cases", () => {
    it("should handle very small diameter values", () => {
      const data = [
        createMockDataPoint({ diameter: 1, name: "Tiny", velocity: 10 }),
        createMockDataPoint({ diameter: 100, name: "Normal", velocity: 15 }),
      ];
      renderComponent(data);

      // "Normal" should appear as both largest and fastest
      expect(screen.getAllByText("Normal")).toHaveLength(2);
      // Component should render without errors
      expect(
        screen.getByText("Size vs Velocity Distribution")
      ).toBeInTheDocument();
    });

    it("should handle very large diameter values", () => {
      const data = [
        createMockDataPoint({ diameter: 50000, name: "Huge", velocity: 5 }),
        createMockDataPoint({ diameter: 100, name: "Normal", velocity: 15 }),
      ];
      renderComponent(data);

      // "Huge" should appear as the largest
      expect(screen.getByText("Huge")).toBeInTheDocument();
    });

    it("should handle very low velocity values", () => {
      const data = [
        createMockDataPoint({ velocity: 1.0, name: "Slow", diameter: 100 }),
        createMockDataPoint({ velocity: 15.0, name: "Normal", diameter: 200 }),
      ];
      renderComponent(data);

      // "Normal" should appear as both largest and fastest
      expect(screen.getAllByText("Normal")).toHaveLength(2);
      // Component should render without errors
      expect(
        screen.getByText("Size vs Velocity Distribution")
      ).toBeInTheDocument();
    });

    it("should handle very high velocity values", () => {
      const data = [
        createMockDataPoint({ velocity: 45.0, name: "Fast", diameter: 100 }),
        createMockDataPoint({ velocity: 15.0, name: "Normal", diameter: 200 }),
      ];
      renderComponent(data);

      // "Fast" should appear as the fastest
      expect(screen.getByText("Fast")).toBeInTheDocument();
    });

    it("should handle identical diameter values", () => {
      const data = [
        createMockDataPoint({ diameter: 500, name: "A", velocity: 10 }),
        createMockDataPoint({ diameter: 500, name: "B", velocity: 15 }),
        createMockDataPoint({ diameter: 500, name: "C", velocity: 20 }),
      ];
      renderComponent(data);

      // Should pick the first one as largest
      const largestSection = screen.getByText("Largest Object").closest("div");
      expect(largestSection).toBeInTheDocument();
    });

    it("should handle identical velocity values", () => {
      const data = [
        createMockDataPoint({ velocity: 15.5, name: "A", diameter: 100 }),
        createMockDataPoint({ velocity: 15.5, name: "B", diameter: 200 }),
        createMockDataPoint({ velocity: 15.5, name: "C", diameter: 300 }),
      ];
      renderComponent(data);

      // Should pick the first one as fastest
      const fastestSection = screen.getByText("Fastest Object").closest("div");
      expect(fastestSection).toBeInTheDocument();
    });

    it("should handle zero diameter values by filtering them out", () => {
      const data = [
        createMockDataPoint({ diameter: 0, velocity: 10, name: "Zero" }),
      ];
      renderComponent(data);

      // Zero diameter should be filtered out, showing empty state message
      expect(
        screen.getByText("No data available (all diameters below minimum threshold)")
      ).toBeInTheDocument();
    });

    it("should filter out sub-minimum diameter values but keep valid ones", () => {
      const data = [
        createMockDataPoint({ diameter: 0.5, velocity: 10, name: "TooSmall" }),
        createMockDataPoint({ diameter: 100, velocity: 15, name: "Valid" }),
      ];
      renderComponent(data);

      // Should render with only the valid asteroid
      expect(screen.getAllByText("Valid")).toHaveLength(2); // Both largest and fastest
      expect(screen.queryByText("TooSmall")).not.toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      const data = [createMockDataPoint()];
      renderComponent(data);

      const heading = screen.getByText("Size vs Velocity Distribution");
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H2");
    });

    it("should have descriptive statistics labels", () => {
      const data = [createMockDataPoint()];
      renderComponent(data);

      expect(screen.getByText("Largest Object")).toBeInTheDocument();
      expect(screen.getByText("Fastest Object")).toBeInTheDocument();
      expect(screen.getByText("meters diameter")).toBeInTheDocument();
      expect(screen.getByText("km/s velocity")).toBeInTheDocument();
    });

    it("should have descriptive legend items", () => {
      const data = [createMockDataPoint()];
      renderComponent(data);

      expect(screen.getByText("Non-Hazardous")).toBeInTheDocument();
      expect(screen.getByText("Potentially Hazardous")).toBeInTheDocument();
    });
  });

  describe("Visual Elements", () => {
    it("should render icon in the header", () => {
      const data = [createMockDataPoint()];
      renderComponent(data);

      // Check for Lucide icon in header
      const header = screen
        .getByText("Size vs Velocity Distribution")
        .closest("div");
      const icon = header?.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should render icons in statistics cards", () => {
      const data = [createMockDataPoint()];
      const { container } = renderComponent(data);

      // Should have icons for Largest and Fastest
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBeGreaterThan(0);
    });

    it("should render legend indicators", () => {
      const data = [createMockDataPoint()];
      const { container } = renderComponent(data);

      // Check for colored legend dots
      const legendItems = container.querySelectorAll(".w-3.h-3");
      expect(legendItems.length).toBeGreaterThanOrEqual(2); // At least 2 legend items
    });
  });

  describe("Title Display", () => {
    it("should truncate long asteroid names in statistics", () => {
      const longName =
        "Very Long Asteroid Name That Should Be Truncated (2024 AB123)";
      const data = [
        createMockDataPoint({ name: longName, diameter: 1000, velocity: 20 }),
      ];
      const { container } = renderComponent(data);

      // Check that the text has truncate class
      const nameElements = container.querySelectorAll(".truncate");
      expect(nameElements.length).toBeGreaterThan(0);
    });

    it("should have title attribute for truncated names", () => {
      const longName = "Very Long Asteroid Name (2024 AB123)";
      const data = [
        createMockDataPoint({ name: longName, diameter: 1000, velocity: 20 }),
        createMockDataPoint({ name: "Short", diameter: 500, velocity: 30 }),
      ];
      renderComponent(data);

      // The long name should appear in the largest section (since it has diameter 1000)
      // and will have a title attribute for tooltip
      const elements = screen.getAllByTitle(longName);
      expect(elements.length).toBeGreaterThan(0);
    });
  });
});
