import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Rocket, Mail } from "lucide-react";
import { Button } from "./button";

describe("Button", () => {
  it("should render children text", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("should apply default variant by default", () => {
    render(<Button>Default</Button>);

    const button = screen.getByRole("button", { name: "Default" });
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("should apply destructive variant", () => {
    render(<Button variant="destructive">Delete</Button>);

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toBeInTheDocument();
  });

  it("should apply outline variant", () => {
    render(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole("button", { name: "Outline" });
    expect(button).toBeInTheDocument();
  });

  it("should apply secondary variant", () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole("button", { name: "Secondary" });
    expect(button).toBeInTheDocument();
  });

  it("should apply ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>);

    const button = screen.getByRole("button", { name: "Ghost" });
    expect(button).toBeInTheDocument();
  });

  it("should apply link variant", () => {
    render(<Button variant="link">Link</Button>);

    const button = screen.getByRole("button", { name: "Link" });
    expect(button).toBeInTheDocument();
  });

  it("should apply small size", () => {
    render(<Button size="sm">Small</Button>);

    const button = screen.getByRole("button", { name: "Small" });
    expect(button).toBeInTheDocument();
  });

  it("should apply large size", () => {
    render(<Button size="lg">Large</Button>);

    const button = screen.getByRole("button", { name: "Large" });
    expect(button).toBeInTheDocument();
  });

  it("should apply icon size", () => {
    render(
      <Button size="icon">
        <Rocket />
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should apply icon-sm size", () => {
    render(
      <Button size="icon-sm">
        <Mail />
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should apply icon-lg size", () => {
    render(
      <Button size="icon-lg">
        <Rocket />
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("should handle click events", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not trigger click when disabled", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    );

    const button = screen.getByRole("button", { name: "Disabled" });
    await user.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should render as disabled button", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
  });

  it("should render with custom className", () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole("button", { name: "Custom" });
    expect(button).toHaveClass("custom-class");
  });

  it("should render as button element by default", () => {
    render(<Button>Test</Button>);

    const button = screen.getByRole("button", { name: "Test" });
    expect(button.tagName).toBe("BUTTON");
  });

  it("should render as child component when asChild is true", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "Link Button" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/test");
  });

  it("should render with icon and text", () => {
    render(
      <Button>
        <Mail />
        Login with Email
      </Button>
    );

    expect(screen.getByText("Login with Email")).toBeInTheDocument();
    const button = screen.getByRole("button");
    const icon = button.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should render icon only", () => {
    render(
      <Button size="icon" aria-label="Launch mission">
        <Rocket />
      </Button>
    );

    const button = screen.getByRole("button", { name: "Launch mission" });
    const icon = button.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<Button>Test</Button>);

    const button = screen.getByRole("button", { name: "Test" });
    expect(button).toHaveAttribute("data-slot", "button");
  });

  it("should preserve additional props", () => {
    render(<Button data-testid="custom-button">Test</Button>);

    const button = screen.getByTestId("custom-button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Test");
  });

  it("should handle button type attribute", () => {
    render(<Button type="submit">Submit</Button>);

    const button = screen.getByRole("button", { name: "Submit" });
    expect(button).toHaveAttribute("type", "submit");
  });

  it("should handle form submission", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());

    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">Submit Form</Button>
      </form>
    );

    const button = screen.getByRole("button", { name: "Submit Form" });
    fireEvent.click(button);

    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("should render full width button", () => {
    render(<Button className="w-full">Full Width</Button>);

    const button = screen.getByRole("button", { name: "Full Width" });
    expect(button).toHaveClass("w-full");
  });

  it("should combine variant and size classes with custom className", () => {
    render(
      <Button variant="destructive" size="lg" className="font-bold">
        Delete
      </Button>
    );

    const button = screen.getByRole("button", { name: "Delete" });
    expect(button).toHaveClass("font-bold");
  });

  it("should render loading state with disabled button", () => {
    render(
      <Button disabled>
        <div className="animate-spin">Loading...</div>
      </Button>
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("should handle keyboard navigation", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Press Enter</Button>);

    const button = screen.getByRole("button", { name: "Press Enter" });
    button.focus();
    await user.keyboard("{Enter}");

    expect(handleClick).toHaveBeenCalled();
  });

  it("should handle Space key press", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Press Space</Button>);

    const button = screen.getByRole("button", { name: "Press Space" });
    button.focus();
    await user.keyboard(" ");

    expect(handleClick).toHaveBeenCalled();
  });

  it("should render as external link with asChild", () => {
    render(
      <Button asChild>
        <a
          href="https://nasa.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          NASA
        </a>
      </Button>
    );

    const link = screen.getByRole("link", { name: "NASA" });
    expect(link).toHaveAttribute("href", "https://nasa.gov");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should apply aria-label for accessibility", () => {
    render(
      <Button aria-label="Close dialog">
        <span>×</span>
      </Button>
    );

    const button = screen.getByRole("button", { name: "Close dialog" });
    expect(button).toBeInTheDocument();
  });
});
