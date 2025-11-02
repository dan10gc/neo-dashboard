import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatsCard } from "./stats-card";
import userEvent from "@testing-library/user-event";
import { Orbit } from "lucide-react";

describe("StatsCard", () => {
  it("should render label and value", () => {
    render(<StatsCard label="Total Asteroids" value={42} />);

    expect(screen.getByText("Total Asteroids")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });

  it("should render string values", () => {
    render(<StatsCard label="Closest Approach" value="N/A" />);

    expect(screen.getByText("Closest Approach")).toBeInTheDocument();
    expect(screen.getByText("N/A")).toBeInTheDocument();
  });

  it("should apply hazard styling when isHazard is true", () => {
    render(<StatsCard label="Hazardous" value={5} isHazard />);

    const valueElement = screen.getByText("5");
    expect(valueElement).toHaveClass("text-red-500");
  });

  it("should apply default styling when isHazard is false", () => {
    render(<StatsCard label="Total" value={10} />);

    const valueElement = screen.getByText("10");
    expect(valueElement).toHaveClass("text-sky-400");
  });

  it("should render tooltip icon when tooltip prop is provided", () => {
    render(
      <StatsCard
        label="Potentially Hazardous"
        value={3}
        tooltip="Asteroids classified as potentially hazardous by NASA"
      />
    );

    const tooltipIcon = screen.getByTestId("tooltip-icon");
    expect(tooltipIcon).toBeInTheDocument();
  });

  it("should not render tooltip icon when tooltip prop is not provided", () => {
    render(<StatsCard label="Total Asteroids" value={42} />);

    expect(screen.queryByTestId("tooltip-icon")).not.toBeInTheDocument();
  });

  it("should display tooltip content on hover", async () => {
    const user = userEvent.setup();

    render(
      <StatsCard
        label="Potentially Hazardous"
        value={3}
        tooltip="Asteroids classified as potentially hazardous by NASA"
      />
    );

    const tooltipIcon = screen.getByTestId("tooltip-icon");

    // Tooltip should not be visible initially
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();

    // Hover over the tooltip icon
    await user.hover(tooltipIcon);

    // Check if tooltip appears
    const tooltip = await screen.findByRole("tooltip");
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent(
      "Asteroids classified as potentially hazardous by NASA"
    );
  });

  it("should render with zero value", () => {
    render(<StatsCard label="Hazardous" value={0} isHazard />);

    expect(screen.getByText("Hazardous")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should uppercase the label", () => {
    render(<StatsCard label="total asteroids" value={100} />);

    const labelElement = screen.getByText("total asteroids");
    expect(labelElement).toHaveClass("uppercase");
  });

  it("should render with an icon when icon prop is provided", () => {
    render(<StatsCard label="Objects Tracked" value={42} icon={Orbit} />);

    expect(screen.getByText("Objects Tracked")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();

    // Icon should be rendered (lucide-react icons render as svg)
    const container = screen.getByText("Objects Tracked").parentElement;
    const svg = container?.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should not render icon when icon prop is not provided", () => {
    render(<StatsCard label="Total Asteroids" value={42} />);

    const container = screen.getByText("Total Asteroids").parentElement;
    const svg = container?.querySelector("svg");
    expect(svg).not.toBeInTheDocument();
  });

  it("should apply hazard color to icon when isHazard is true", () => {
    render(<StatsCard label="Hazardous" value={5} isHazard icon={Orbit} />);

    const container = screen.getByText("Hazardous").parentElement;
    const svg = container?.querySelector("svg");
    expect(svg).toHaveClass("text-red-400");
  });

  it("should apply default color to icon when isHazard is false", () => {
    render(<StatsCard label="Total" value={10} icon={Orbit} />);

    const container = screen.getByText("Total").parentElement;
    const svg = container?.querySelector("svg");
    expect(svg).toHaveClass("text-sky-400");
  });
});
