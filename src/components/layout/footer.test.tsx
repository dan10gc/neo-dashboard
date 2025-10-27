import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./footer";

describe("Footer", () => {
  beforeEach(() => {
    vi.useFakeTimers();    
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should render footer with copyright information", () => {
    vi.setSystemTime(new Date("2024-10-10"));
    render(<Footer />);

    expect(screen.getByText(/Built by/i)).toBeInTheDocument();
    expect(screen.getByText(/Daniel Gonzalez/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2024/i)).toBeInTheDocument();
  });

  it("should render NASA data attribution", () => {
    render(<Footer />);

    expect(screen.getByText(/Data provided by NASA's NeoWs API/i)).toBeInTheDocument();
  });

  it("should render personal website link with correct href", () => {
    render(<Footer />);

    const websiteLink = screen.getByRole("link", { name: /Daniel Gonzalez/i });
    expect(websiteLink).toBeInTheDocument();
    expect(websiteLink).toHaveAttribute("href", "https://danielgc.design");
    expect(websiteLink).toHaveAttribute("target", "_blank");
    expect(websiteLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render GitHub link with correct href", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /View on GitHub/i });
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute("href", "https://github.com/dan10gc/neo-dashboard");
    expect(githubLink).toHaveAttribute("target", "_blank");
    expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("should render GitHub icon", () => {
    render(<Footer />);

    const githubLink = screen.getByRole("link", { name: /View on GitHub/i });
    const githubIcon = githubLink.querySelector('svg');
    expect(githubIcon).toBeInTheDocument();
  });

  it("should display dynamic year in copyright", () => {
    vi.setSystemTime(new Date("2025-10-10"));
    render(<Footer />);

    expect(screen.getByText(/© 2025/i)).toBeInTheDocument();
  });
});