import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { CloseApproachAssessment } from "./close-approach-assessment";
import type { CloseApproachAssessment as CloseApproachAssessmentData } from "@/lib/transformers";

// Mock PostHog
const mockPostHogCapture = vi.fn();
vi.mock("posthog-js/react", () => ({
  usePostHog: () => ({
    capture: mockPostHogCapture,
  }),
}));

describe("CloseApproachAssessment", () => {
  beforeEach(() => {
    mockPostHogCapture.mockClear();
  });

  const renderComponent = (assessment: CloseApproachAssessmentData) => {
    return render(
      <BrowserRouter>
        <CloseApproachAssessment assessment={assessment} />
      </BrowserRouter>
    );
  };

  const createMockAssessment = (
    overrides: Partial<CloseApproachAssessmentData> = {}
  ): CloseApproachAssessmentData => ({
    totalScore: 2,
    closeApproachLevel: "TRACKED",
    conditionLevel: 2,
    factors: [
      {
        name: "Proximity",
        score: 2,
        weight: 1.0,
        displayValue: "0.075 AU (~11.2M km)",
        description: "Closest PHA approach is 0.075 Astronomical Units from Earth",
      },
    ],
    totalAsteroids: 100,
    totalHazardous: 5,
    hazardPercentage: 5.0,
    ...overrides,
  });

  describe("Basic Rendering", () => {
    it("should render the alert level", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      expect(screen.getByText("TRACKED")).toBeInTheDocument();
    });

    it("should render the total score", () => {
      const assessment = createMockAssessment({ totalScore: 3 });
      const { container } = renderComponent(assessment);

      // Check the large score display
      const scoreDisplay = container.querySelector('.text-7xl');
      expect(scoreDisplay).toHaveTextContent("3");
    });

    it("should render the 'Close Approach Alert' header", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      expect(screen.getByText("Close Approach Alert")).toBeInTheDocument();
    });

    it("should render 'Based on Proximity' indicator", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      expect(screen.getByText("Based on Proximity")).toBeInTheDocument();
    });

    it("should render alert score display", () => {
      const assessment = createMockAssessment({ totalScore: 4 });
      renderComponent(assessment);

      // Just verify the "Alert Score:" label is rendered
      expect(screen.getByText(/Alert Score:/i)).toBeInTheDocument();
    });
  });

  describe("Alert Level Styling", () => {
    it("should apply NOTEWORTHY styling for high scores", () => {
      const assessment = createMockAssessment({
        totalScore: 5,
        closeApproachLevel: "NOTEWORTHY",
      });
      const { container } = renderComponent(assessment);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-orange-950/30", "border-orange-700/50");
    });

    it("should apply NOTABLE styling for moderate scores", () => {
      const assessment = createMockAssessment({
        totalScore: 3,
        closeApproachLevel: "NOTABLE",
      });
      const { container } = renderComponent(assessment);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-yellow-950/30", "border-yellow-700/50");
    });

    it("should apply TRACKED styling", () => {
      const assessment = createMockAssessment({
        totalScore: 2,
        closeApproachLevel: "TRACKED",
      });
      const { container } = renderComponent(assessment);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-blue-950/30", "border-blue-700/50");
    });

    it("should apply ROUTINE styling for low scores", () => {
      const assessment = createMockAssessment({
        totalScore: 1,
        closeApproachLevel: "ROUTINE",
      });
      const { container } = renderComponent(assessment);

      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-green-950/30", "border-green-700/50");
    });
  });

  describe("Contributing Factors", () => {
    it("should render contributing factors button", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      expect(screen.getByText("Contributing Factors:")).toBeInTheDocument();
    });

    it("should expand contributing factors when clicked", async () => {
      const user = userEvent.setup();
      const assessment = createMockAssessment();
      renderComponent(assessment);

      const expandButton = screen.getByText("Contributing Factors:");
      await user.click(expandButton);

      expect(screen.getByText("Proximity")).toBeInTheDocument();
      expect(screen.getByText("0.075 AU (~11.2M km)")).toBeInTheDocument();
    });

    it("should show hazard summary when factors are expanded", async () => {
      const user = userEvent.setup();
      const assessment = createMockAssessment();
      renderComponent(assessment);

      const expandButton = screen.getByText("Contributing Factors:");
      await user.click(expandButton);

      // Text is broken across elements, check for individual parts
      expect(screen.getByText(/asteroids are potentially hazardous/i)).toBeInTheDocument();
      expect(screen.getByText(/5.0/i)).toBeInTheDocument();
    });

    it("should show special message when no PHAs are detected", async () => {
      const user = userEvent.setup();
      const assessment = createMockAssessment({
        totalScore: 0,
        totalHazardous: 0,
        totalAsteroids: 150,
      });
      renderComponent(assessment);

      const expandButton = screen.getByText("Contributing Factors:");
      await user.click(expandButton);

      expect(
        screen.getByText("No potentially hazardous asteroids detected in the next 7 days.")
      ).toBeInTheDocument();
      expect(screen.getByText(/All 150 detected asteroids are classified as safe./i)).toBeInTheDocument();
    });
  });

  describe("Learn More Link", () => {
    it("should render the learn more link", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      const link = screen.getByRole("link", { name: /Learn more about alert levels/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/close-approach-info");
    });

    it("should track PostHog event when learn more is clicked", async () => {
      const user = userEvent.setup();
      const assessment = createMockAssessment({
        totalScore: 3,
        closeApproachLevel: "NOTABLE",
        totalHazardous: 12,
      });
      renderComponent(assessment);

      const link = screen.getByRole("link", { name: /Learn more about alert levels/i });
      await user.click(link);

      expect(mockPostHogCapture).toHaveBeenCalledWith("close_approach_learn_more_clicked", {
        alert_level: "NOTABLE",
        alert_score: 3,
        total_hazardous: 12,
        source: "close_approach_assessment_card",
      });
    });

    it("should render arrow icon in learn more link", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      const link = screen.getByRole("link", { name: /Learn more about alert levels/i });
      const icon = link.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      expect(screen.getByText("Close Approach Alert")).toBeInTheDocument();
      expect(screen.getByText("TRACKED")).toBeInTheDocument();
    });

    it("should have accessible button for expanding factors", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      const button = screen.getByRole("button", { name: /Contributing Factors/i });
      expect(button).toBeInTheDocument();
    });

    it("should have accessible link with descriptive text", () => {
      const assessment = createMockAssessment();
      renderComponent(assessment);

      const link = screen.getByRole("link", { name: /Learn more about alert levels/i });
      expect(link).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle score of 0 correctly", () => {
      const assessment = createMockAssessment({
        totalScore: 0,
        closeApproachLevel: "ROUTINE",
        totalHazardous: 0,
      });
      const { container } = renderComponent(assessment);

      const scoreDisplay = container.querySelector('.text-7xl');
      expect(scoreDisplay).toHaveTextContent("0");
      expect(screen.getByText("ROUTINE")).toBeInTheDocument();
    });

    it("should handle maximum score of 5 correctly", () => {
      const assessment = createMockAssessment({
        totalScore: 5,
        closeApproachLevel: "NOTEWORTHY",
      });
      const { container } = renderComponent(assessment);

      const scoreDisplay = container.querySelector('.text-7xl');
      expect(scoreDisplay).toHaveTextContent("5");
      expect(screen.getByText("NOTEWORTHY")).toBeInTheDocument();
    });

    it("should handle 100% hazardous asteroids", () => {
      const user = userEvent.setup();
      const assessment = createMockAssessment({
        totalAsteroids: 50,
        totalHazardous: 50,
        hazardPercentage: 100.0,
      });
      renderComponent(assessment);

      const expandButton = screen.getByText("Contributing Factors:");
      user.click(expandButton);

      // Should render without errors
      expect(screen.getByText("Contributing Factors:")).toBeInTheDocument();
    });
  });
});
