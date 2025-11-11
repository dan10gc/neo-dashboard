import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ApproachHeader } from "./approach-header";

describe("ApproachHeader", () => {
  const defaultProps = {
    currentIndex: 0,
    totalApproaches: 5,
    isPotentiallyHazardous: false,
  };

  describe("Basic Rendering", () => {
    it("should render the header title", () => {
      render(<ApproachHeader {...defaultProps} />);

      expect(screen.getByText("Close Approaches")).toBeInTheDocument();
    });

    it("should render the current index and total approaches", () => {
      render(<ApproachHeader {...defaultProps} currentIndex={2} totalApproaches={5} />);

      expect(screen.getByText("3 / 5")).toBeInTheDocument();
    });

    it("should display correct index for first item", () => {
      render(<ApproachHeader {...defaultProps} currentIndex={0} totalApproaches={10} />);

      expect(screen.getByText("1 / 10")).toBeInTheDocument();
    });

    it("should display correct index for last item", () => {
      render(<ApproachHeader {...defaultProps} currentIndex={4} totalApproaches={5} />);

      expect(screen.getByText("5 / 5")).toBeInTheDocument();
    });
  });

  describe("PHA Badge", () => {
    it("should not render PHA badge when not potentially hazardous", () => {
      render(<ApproachHeader {...defaultProps} isPotentiallyHazardous={false} />);

      expect(screen.queryByText("PHA")).not.toBeInTheDocument();
    });

    it("should render PHA badge when potentially hazardous", () => {
      render(<ApproachHeader {...defaultProps} isPotentiallyHazardous={true} />);

      expect(screen.getByText("PHA")).toBeInTheDocument();
    });

    it("should render PHA badge with correct styling", () => {
      render(
        <ApproachHeader {...defaultProps} isPotentiallyHazardous={true} />
      );

      const badge = screen.getByText("PHA").closest("span");
      expect(badge).toHaveClass(
        "border-yellow-500/50",
        "bg-yellow-500/10",
        "text-yellow-400"
      );
    });

    it("should render AlertTriangle icon in PHA badge", () => {
      render(
        <ApproachHeader {...defaultProps} isPotentiallyHazardous={true} />
      );

      const badge = screen.getByText("PHA").closest("span");
      const icon = badge?.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });
  });

  describe("Layout", () => {
    it("should have proper flex layout structure", () => {
      const { container } = render(<ApproachHeader {...defaultProps} />);

      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass("flex", "items-center", "justify-between");
    });

    it("should render title and counter in the same group", () => {
      const { container } = render(<ApproachHeader {...defaultProps} />);

      const leftGroup = container.querySelector(".flex.items-center.gap-3");
      expect(leftGroup).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper heading structure", () => {
      render(<ApproachHeader {...defaultProps} />);

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveTextContent("Close Approaches");
    });
  });

  describe("Edge Cases", () => {
    it("should handle single approach correctly", () => {
      render(<ApproachHeader {...defaultProps} currentIndex={0} totalApproaches={1} />);

      expect(screen.getByText("1 / 1")).toBeInTheDocument();
    });

    it("should handle large number of approaches", () => {
      render(<ApproachHeader {...defaultProps} currentIndex={99} totalApproaches={100} />);

      expect(screen.getByText("100 / 100")).toBeInTheDocument();
    });

    it("should render title and PHA badge simultaneously", () => {
      render(
        <ApproachHeader
          {...defaultProps}
          isPotentiallyHazardous={true}
        />
      );

      expect(screen.getByText("Close Approaches")).toBeInTheDocument();
      expect(screen.getByText("PHA")).toBeInTheDocument();
    });
  });

  describe("Styling", () => {
    it("should apply correct text styling to title", () => {
      render(<ApproachHeader {...defaultProps} />);

      const heading = screen.getByRole("heading", { level: 3 });
      expect(heading).toHaveClass(
        "text-zinc-300",
        "text-sm",
        "font-bold",
        "uppercase",
        "tracking-wider"
      );
    });

    it("should apply correct styling to counter", () => {
      render(<ApproachHeader {...defaultProps} />);

      const counter = screen.getByText("1 / 5");
      expect(counter).toHaveClass("text-xs", "text-zinc-500", "font-mono");
    });
  });
});
