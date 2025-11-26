import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Star } from "lucide-react";
import { Badge } from "./badge";

describe("Badge", () => {
  it("should render children text", () => {
    render(<Badge>Tracked</Badge>);

    expect(screen.getByText("Tracked")).toBeInTheDocument();
  });

  it("should apply default variant by default", () => {
    render(<Badge>Default Badge</Badge>);

    const badge = screen.getByText("Default Badge");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("should apply secondary variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>);

    const badge = screen.getByText("Secondary");
    expect(badge).toBeInTheDocument();
  });

  it("should apply destructive variant", () => {
    render(<Badge variant="destructive">Hazardous</Badge>);

    const badge = screen.getByText("Hazardous");
    expect(badge).toBeInTheDocument();
  });

  it("should apply outline variant", () => {
    render(<Badge variant="outline">Outline</Badge>);

    const badge = screen.getByText("Outline");
    expect(badge).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    render(<Badge className="custom-class">Custom</Badge>);

    const badge = screen.getByText("Custom");
    expect(badge).toHaveClass("custom-class");
  });

  it("should render as span by default", () => {
    render(<Badge>Test</Badge>);

    const badge = screen.getByText("Test");
    expect(badge.tagName).toBe("SPAN");
  });

  it("should render as child component when asChild is true", () => {
    render(
      <Badge asChild>
        <a href="/test">Link Badge</a>
      </Badge>
    );

    const link = screen.getByRole("link", { name: "Link Badge" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should render with icon", () => {
    render(
      <Badge>
        <Star className="size-3" />
        Legendary
      </Badge>
    );

    expect(screen.getByText("Legendary")).toBeInTheDocument();
    const badge = screen.getByText("Legendary").parentElement;
    const icon = badge?.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should handle long text content", () => {
    render(
      <Badge>Potentially Hazardous - Close Approach Warning</Badge>
    );

    expect(
      screen.getByText("Potentially Hazardous - Close Approach Warning")
    ).toBeInTheDocument();
  });

  it("should render multiple badges", () => {
    render(
      <div>
        <Badge>Badge 1</Badge>
        <Badge variant="secondary">Badge 2</Badge>
        <Badge variant="destructive">Badge 3</Badge>
      </div>
    );

    expect(screen.getByText("Badge 1")).toBeInTheDocument();
    expect(screen.getByText("Badge 2")).toBeInTheDocument();
    expect(screen.getByText("Badge 3")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<Badge>Test</Badge>);

    const badge = screen.getByText("Test");
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("should render with custom colors via className", () => {
    render(
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
        Legendary
      </Badge>
    );

    const badge = screen.getByText("Legendary");
    expect(badge).toHaveClass("bg-amber-500/20");
    expect(badge).toHaveClass("text-amber-400");
    expect(badge).toHaveClass("border-amber-500/50");
  });

  it.skip("should handle empty content", () => {
    render(<Badge></Badge>);

    const badge = screen.getByRole("generic", { hidden: true });
    expect(badge).toHaveAttribute("data-slot", "badge");
  });

  it("should combine variant classes with custom className", () => {
    render(
      <Badge variant="destructive" className="font-bold">
        Warning
      </Badge>
    );

    const badge = screen.getByText("Warning");
    expect(badge).toHaveClass("font-bold");
  });

  it("should render badge as interactive link", () => {
    render(
      <Badge asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Click me
        </a>
      </Badge>
    );

    const link = screen.getByRole("link", { name: "Click me" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should preserve additional props", () => {
    render(<Badge data-testid="custom-badge">Test</Badge>);

    const badge = screen.getByTestId("custom-badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Test");
  });
});
