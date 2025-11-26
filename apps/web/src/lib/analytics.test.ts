import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { trackEvent } from "./analytics";
import posthog from "posthog-js";

// Mock posthog
vi.mock("posthog-js", () => ({
  default: {
    capture: vi.fn(),
  },
}));

describe("analytics", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("trackEvent", () => {
    it("should call posthog.capture with event name and properties", () => {
      trackEvent("dashboard_viewed", { is_first_visit: true });

      expect(posthog.capture).toHaveBeenCalledWith("dashboard_viewed", {
        is_first_visit: true,
      });
      expect(posthog.capture).toHaveBeenCalledTimes(1);
    });

    it("should call posthog.capture with event name only when no properties", () => {
      trackEvent("dashboard_viewed");

      expect(posthog.capture).toHaveBeenCalledWith(
        "dashboard_viewed",
        undefined
      );
      expect(posthog.capture).toHaveBeenCalledTimes(1);
    });

    it("should track asteroid_clicked event with all required properties", () => {
      trackEvent("asteroid_clicked", {
        asteroid_id: "2000433",
        asteroid_name: "433 Eros",
        source: "table",
        is_hazardous: false,
      });

      expect(posthog.capture).toHaveBeenCalledWith("asteroid_clicked", {
        asteroid_id: "2000433",
        asteroid_name: "433 Eros",
        source: "table",
        is_hazardous: false,
      });
    });

    it("should track asteroid_table_sorted event", () => {
      trackEvent("asteroid_table_sorted", {
        column: "diameter",
        direction: "desc",
      });

      expect(posthog.capture).toHaveBeenCalledWith("asteroid_table_sorted", {
        column: "diameter",
        direction: "desc",
      });
    });

    it("should track chart_interaction event", () => {
      trackEvent("chart_interaction", {
        chart_type: "size_velocity_scatter",
        interaction_type: "hover",
      });

      expect(posthog.capture).toHaveBeenCalledWith("chart_interaction", {
        chart_type: "size_velocity_scatter",
        interaction_type: "hover",
      });
    });

    it("should track carousel_navigation event", () => {
      trackEvent("carousel_navigation", {
        direction: "next",
        from_position: 0,
        to_position: 1,
      });

      expect(posthog.capture).toHaveBeenCalledWith("carousel_navigation", {
        direction: "next",
        from_position: 0,
        to_position: 1,
      });
    });

    it("should track special_event_expanded event", () => {
      trackEvent("special_event_expanded", {
        event_id: "event-123",
        event_type: "solar_flare",
        event_name: "X-Class Solar Flare",
        priority: "high",
      });

      expect(posthog.capture).toHaveBeenCalledWith("special_event_expanded", {
        event_id: "event-123",
        event_type: "solar_flare",
        event_name: "X-Class Solar Flare",
        priority: "high",
      });
    });

    it("should track settings_opened event", () => {
      trackEvent("settings_opened", { section: "privacy" });

      expect(posthog.capture).toHaveBeenCalledWith("settings_opened", {
        section: "privacy",
      });
    });

    it("should track unit_changed event", () => {
      trackEvent("unit_changed", {
        unit_type: "distance",
        old_value: "AU",
        new_value: "km",
      });

      expect(posthog.capture).toHaveBeenCalledWith("unit_changed", {
        unit_type: "distance",
        old_value: "AU",
        new_value: "km",
      });
    });

    it("should track notifications_toggled event with all properties", () => {
      trackEvent("notifications_toggled", {
        enabled: true,
        notification_type: "approaches",
      });

      expect(posthog.capture).toHaveBeenCalledWith("notifications_toggled", {
        enabled: true,
        notification_type: "approaches",
      });
    });

    it("should track notifications_toggled event without optional notification_type", () => {
      trackEvent("notifications_toggled", {
        enabled: false,
      });

      expect(posthog.capture).toHaveBeenCalledWith("notifications_toggled", {
        enabled: false,
      });
    });

    it("should track theme_changed event", () => {
      trackEvent("theme_changed", { new_theme: "dark" });

      expect(posthog.capture).toHaveBeenCalledWith("theme_changed", {
        new_theme: "dark",
      });
    });

    it("should track data_cleared event with empty properties", () => {
      trackEvent("data_cleared", {});

      expect(posthog.capture).toHaveBeenCalledWith("data_cleared", {});
    });

    it("should track close_approach_learn_more_clicked event", () => {
      trackEvent("close_approach_learn_more_clicked", {
        alert_level: "NOTABLE",
        alert_score: 3,
        total_hazardous: 5,
        source: "dashboard",
      });

      expect(posthog.capture).toHaveBeenCalledWith(
        "close_approach_learn_more_clicked",
        {
          alert_level: "NOTABLE",
          alert_score: 3,
          total_hazardous: 5,
          source: "dashboard",
        }
      );
    });

    it("should handle multiple consecutive event tracking calls", () => {
      trackEvent("dashboard_viewed", { is_first_visit: true });
      trackEvent("asteroid_clicked", {
        asteroid_id: "123",
        asteroid_name: "Test",
        source: "table",
      });
      trackEvent("settings_opened", { section: "main" });

      expect(posthog.capture).toHaveBeenCalledTimes(3);
    });

    it("should track asteroid_table_filtered event", () => {
      trackEvent("asteroid_table_filtered", {
        filter_type: "is_hazardous",
        filter_value: true,
      });

      expect(posthog.capture).toHaveBeenCalledWith("asteroid_table_filtered", {
        filter_type: "is_hazardous",
        filter_value: true,
      });
    });

    it("should track special_event_dismissed event", () => {
      trackEvent("special_event_dismissed", {
        event_id: "event-456",
        event_type: "asteroid_flyby",
      });

      expect(posthog.capture).toHaveBeenCalledWith("special_event_dismissed", {
        event_id: "event-456",
        event_type: "asteroid_flyby",
      });
    });

    it("should track contributing_factors_expanded event", () => {
      trackEvent("contributing_factors_expanded", {
        alert_level: "TRACKED",
        alert_score: 2,
      });

      expect(posthog.capture).toHaveBeenCalledWith(
        "contributing_factors_expanded",
        {
          alert_level: "TRACKED",
          alert_score: 2,
        }
      );
    });
  });
});
