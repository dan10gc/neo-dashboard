import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { Footer } from "./footer";

// Mock PostHog
const mockPostHogCapture = vi.fn();
vi.mock("posthog-js/react", () => ({
  usePostHog: () => ({
    capture: mockPostHogCapture,
  }),
}));

// Mock useLocation from react-router
const mockUseLocation = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLocation: () => mockUseLocation(),
  };
});

describe("Footer", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    mockPostHogCapture.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderFooter = (pathname = "/") => {
    mockUseLocation.mockReturnValue({ pathname });
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  describe("Basic Footer Content", () => {
    it("should render footer with copyright information", () => {
      vi.setSystemTime(new Date("2024-10-10"));
      renderFooter();

      expect(screen.getByText(/Built by/i)).toBeInTheDocument();
      expect(screen.getByText(/Daniel Gonzalez/i)).toBeInTheDocument();
      expect(screen.getByText(/© 2024/i)).toBeInTheDocument();
    });

    it("should render NASA data attribution", () => {
      renderFooter();

      expect(screen.getByText(/Data provided by NASA's NeoWs API/i)).toBeInTheDocument();
    });

    it("should render personal website link with correct href", () => {
      renderFooter();

      const websiteLink = screen.getByRole("link", { name: /Daniel Gonzalez/i });
      expect(websiteLink).toBeInTheDocument();
      expect(websiteLink).toHaveAttribute("href", "https://danielgc.design");
      expect(websiteLink).toHaveAttribute("target", "_blank");
      expect(websiteLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render GitHub link with correct href", () => {
      renderFooter();

      const githubLink = screen.getByRole("link", { name: /View on GitHub/i });
      expect(githubLink).toBeInTheDocument();
      expect(githubLink).toHaveAttribute("href", "https://github.com/dan10gc/neo-dashboard");
      expect(githubLink).toHaveAttribute("target", "_blank");
      expect(githubLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("should render GitHub icon", () => {
      renderFooter();

      const githubLink = screen.getByRole("link", { name: /View on GitHub/i });
      const githubIcon = githubLink.querySelector("svg");
      expect(githubIcon).toBeInTheDocument();
    });

    it("should display dynamic year in copyright", () => {
      vi.setSystemTime(new Date("2025-10-10"));
      renderFooter();

      expect(screen.getByText(/© 2025/i)).toBeInTheDocument();
    });
  });

  describe("Navigation Links - Dashboard Page", () => {
    it("should show 'Understanding Alerts' link when on dashboard page", () => {
      renderFooter("/");

      const link = screen.getByRole("link", { name: /Understanding Alerts/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/close-approach-info");
    });

    it("should render BookOpen icon on dashboard page", () => {
      renderFooter("/");

      const link = screen.getByRole("link", { name: /Understanding Alerts/i });
      const icon = link.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should not show 'Back to Dashboard' link when on dashboard page", () => {
      renderFooter("/");

      expect(screen.queryByRole("link", { name: /Back to Dashboard/i })).not.toBeInTheDocument();
    });

    it("should track PostHog event when 'Understanding Alerts' is clicked", () => {
      renderFooter("/");

      const link = screen.getByRole("link", { name: /Understanding Alerts/i });
      fireEvent.click(link);

      expect(mockPostHogCapture).toHaveBeenCalledWith("understanding_alerts_clicked", {
        source: "footer",
        from_page: "dashboard",
      });
    });
  });

  describe("Navigation Links - Info Page", () => {
    it("should show 'Back to Dashboard' link when on info page", () => {
      renderFooter("/close-approach-info");

      const link = screen.getByRole("link", { name: /Back to Dashboard/i });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", "/");
    });

    it("should render Home icon on info page", () => {
      renderFooter("/close-approach-info");

      const link = screen.getByRole("link", { name: /Back to Dashboard/i });
      const icon = link.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    it("should not show 'Understanding Alerts' link when on info page", () => {
      renderFooter("/close-approach-info");

      expect(screen.queryByRole("link", { name: /Understanding Alerts/i })).not.toBeInTheDocument();
    });

    it("should track PostHog event when 'Back to Dashboard' is clicked", () => {
      renderFooter("/close-approach-info");

      const link = screen.getByRole("link", { name: /Back to Dashboard/i });
      fireEvent.click(link);

      expect(mockPostHogCapture).toHaveBeenCalledWith("back_to_dashboard_clicked", {
        source: "footer",
        from_page: "close_approach_info",
      });
    });
  });

  describe("Responsive Layout", () => {
    it("should render navigation section with proper styling", () => {
      renderFooter("/");

      const navSection = screen.getByRole("link", { name: /Understanding Alerts/i }).parentElement;
      expect(navSection).toHaveClass("border-b", "border-zinc-800");
    });

    it("should render footer info section", () => {
      renderFooter();

      expect(screen.getByText(/Built by/i).parentElement).toBeInTheDocument();
    });
  });
});
