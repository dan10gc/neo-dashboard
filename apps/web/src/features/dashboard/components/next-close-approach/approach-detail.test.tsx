import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ApproachDetail } from "./approach-detail";

describe("ApproachDetail", () => {
  const createMockApproach = (overrides = {}) => ({
    name: "2023 AB1",
    epoch_date_close_approach: new Date("2024-03-15T12:00:00Z").getTime(),
    miss_distance_km: 7500000,
    miss_distance_au: 0.0501,
    velocity: 45000,
    ...overrides,
  });

  describe("Basic Rendering", () => {
    it("should render the asteroid name", () => {
      const approach = createMockApproach();
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("2023 AB1")).toBeInTheDocument();
    });

    it("should render the Object Designation label", () => {
      const approach = createMockApproach();
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("Object Designation")).toBeInTheDocument();
    });

    it("should render the Approach Date label", () => {
      const approach = createMockApproach();
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("Approach Date")).toBeInTheDocument();
    });

    it("should render the Miss Distance label", () => {
      const approach = createMockApproach();
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("Miss Distance")).toBeInTheDocument();
    });

    it("should render the Relative Velocity label", () => {
      const approach = createMockApproach();
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("Relative Velocity")).toBeInTheDocument();
    });
  });

  describe("Date Formatting", () => {
    it("should format the approach date using toLocaleDateString", () => {
      const timestamp = new Date("2024-03-15T12:00:00Z").getTime();
      const approach = createMockApproach({
        epoch_date_close_approach: timestamp,
      });
      render(<ApproachDetail currentApproach={approach} />);

      // Create the expected date string using the same method as the component
      const expectedDate = new Date(timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });

    it("should format dates with correct locale options", () => {
      const timestamp = new Date("2024-06-20T12:00:00Z").getTime();
      const approach = createMockApproach({
        epoch_date_close_approach: timestamp,
      });
      render(<ApproachDetail currentApproach={approach} />);

      const expectedDate = new Date(timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });

    it("should handle different dates consistently", () => {
      const timestamp = new Date("2025-12-15T12:00:00Z").getTime();
      const approach = createMockApproach({
        epoch_date_close_approach: timestamp,
      });
      render(<ApproachDetail currentApproach={approach} />);

      const expectedDate = new Date(timestamp).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      expect(screen.getByText(expectedDate)).toBeInTheDocument();
    });
  });

  describe("Distance Formatting", () => {
    it("should format miss distance in kilometers with commas", () => {
      const approach = createMockApproach({
        miss_distance_km: 7500000,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("7,500,000 km")).toBeInTheDocument();
    });

    it("should format miss distance in AU to 4 decimal places", () => {
      const approach = createMockApproach({
        miss_distance_au: 0.0501,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("(0.0501 AU)")).toBeInTheDocument();
    });

    it("should handle large distances correctly", () => {
      const approach = createMockApproach({
        miss_distance_km: 75000000,
        miss_distance_au: 0.5012,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("75,000,000 km")).toBeInTheDocument();
      expect(screen.getByText("(0.5012 AU)")).toBeInTheDocument();
    });

    it("should handle small distances correctly", () => {
      const approach = createMockApproach({
        miss_distance_km: 100000,
        miss_distance_au: 0.0007,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("100,000 km")).toBeInTheDocument();
      expect(screen.getByText("(0.0007 AU)")).toBeInTheDocument();
    });
  });

  describe("Velocity Formatting", () => {
    it("should format velocity with commas", () => {
      const approach = createMockApproach({
        velocity: 45000,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("45,000 km/h")).toBeInTheDocument();
    });

    it("should handle large velocities", () => {
      const approach = createMockApproach({
        velocity: 120000,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("120,000 km/h")).toBeInTheDocument();
    });

    it("should handle small velocities", () => {
      const approach = createMockApproach({
        velocity: 5000,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("5,000 km/h")).toBeInTheDocument();
    });

    it("should handle velocities without thousands separator", () => {
      const approach = createMockApproach({
        velocity: 999,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("999 km/h")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should render asteroid name with correct styling", () => {
      const approach = createMockApproach({ name: "TEST-123" });
      render(<ApproachDetail currentApproach={approach} />);

      const name = screen.getByText("TEST-123");
      expect(name).toHaveClass("text-2xl", "font-bold", "text-cyan-400", "font-mono");
    });

    it("should have proper spacing between sections", () => {
      const approach = createMockApproach();
      const { container } = render(<ApproachDetail currentApproach={approach} />);

      // Check for mb-6 on the name section
      const nameSection = container.querySelector(".mb-6");
      expect(nameSection).toBeInTheDocument();

      // Check for space-y-3 on the details section
      const detailsSection = container.querySelector(".space-y-3");
      expect(detailsSection).toBeInTheDocument();
    });

    it("should use inline layout for details", () => {
      const approach = createMockApproach();
      const { container } = render(<ApproachDetail currentApproach={approach} />);

      const inlineLayouts = container.querySelectorAll(".flex.items-center.justify-between");
      expect(inlineLayouts.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero values", () => {
      const approach = createMockApproach({
        miss_distance_km: 0,
        miss_distance_au: 0,
        velocity: 0,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("0 km")).toBeInTheDocument();
      expect(screen.getByText("(0.0000 AU)")).toBeInTheDocument();
      expect(screen.getByText("0 km/h")).toBeInTheDocument();
    });

    it("should handle very long asteroid names", () => {
      const approach = createMockApproach({
        name: "2024 VERYLONGASTEROIDNAME123456",
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("2024 VERYLONGASTEROIDNAME123456")).toBeInTheDocument();
    });

    it("should handle decimal velocity values", () => {
      const approach = createMockApproach({
        velocity: 45678.9,
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("45,678.9 km/h")).toBeInTheDocument();
    });

    it("should handle very precise AU values", () => {
      const approach = createMockApproach({
        miss_distance_au: 0.123456789,
      });
      render(<ApproachDetail currentApproach={approach} />);

      // Should be rounded to 4 decimal places
      expect(screen.getByText("(0.1235 AU)")).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should render all labels in uppercase", () => {
      const approach = createMockApproach();
      const { container } = render(<ApproachDetail currentApproach={approach} />);

      const labels = container.querySelectorAll(".uppercase");
      expect(labels.length).toBeGreaterThan(0);
    });

    it("should have proper text hierarchy", () => {
      const approach = createMockApproach();
      render(<ApproachDetail currentApproach={approach} />);

      // Asteroid name should be larger than other text
      const name = screen.getByText(approach.name);
      expect(name).toHaveClass("text-2xl");
    });
  });

  describe("Different Asteroid Names", () => {
    it("should render numbered asteroid correctly", () => {
      const approach = createMockApproach({
        name: "(99942) Apophis",
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("(99942) Apophis")).toBeInTheDocument();
    });

    it("should render designation-only asteroid correctly", () => {
      const approach = createMockApproach({
        name: "2024 QX1",
      });
      render(<ApproachDetail currentApproach={approach} />);

      expect(screen.getByText("2024 QX1")).toBeInTheDocument();
    });
  });
});
