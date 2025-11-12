/**
 * Analytics event type definitions
 *
 * This file provides type-safe event tracking helpers for PostHog.
 * Import posthog directly and use these types for autocomplete and consistency.
 */

import posthog from 'posthog-js';

// ============================================================================
// Event Types & Properties
// ============================================================================

export type AnalyticsEvents = {
  // Dashboard events
  dashboard_viewed: {
    is_first_visit?: boolean;
  };

  // Asteroid interaction events
  asteroid_clicked: {
    asteroid_id: string;
    asteroid_name: string;
    source: 'table' | 'carousel' | 'watchlist' | 'chart';
    is_hazardous?: boolean;
  };

  asteroid_table_sorted: {
    column: string;
    direction: 'asc' | 'desc';
  };

  asteroid_table_filtered: {
    filter_type: string;
    filter_value: string | number | boolean;
  };

  // Chart events
  chart_interaction: {
    chart_type: 'approaches_bar' | 'size_velocity_scatter';
    interaction_type: 'hover' | 'click';
  };

  // Navigation events
  carousel_navigation: {
    direction: 'next' | 'previous' | 'jump';
    from_position: number;
    to_position: number;
  };

  special_event_expanded: {
    event_id: string;
    event_type: string;
    event_name: string;
    priority: string;
  };

  special_event_dismissed: {
    event_id: string;
    event_type: string;
  };

  contributing_factors_expanded: {
    alert_level: string;
    alert_score: number;
  };

  // Settings events
  settings_opened: {
    section: 'main' | 'location' | 'display' | 'notifications' | 'tracking' | 'privacy' | 'about';
  };

  unit_changed: {
    unit_type: 'distance' | 'velocity' | 'size';
    old_value: string;
    new_value: string;
  };

  notifications_toggled: {
    enabled: boolean;
    notification_type?: 'approaches' | 'observable' | 'hazardous' | 'achievements';
  };

  theme_changed: {
    new_theme: 'dark' | 'light';
  };

  data_cleared: Record<string, never>;

  // Existing event
  close_approach_learn_more_clicked: {
    alert_level: string;
    alert_score: number;
    total_hazardous: number;
    source: string;
  };
};

// ============================================================================
// Type-safe tracking helper
// ============================================================================

/**
 * Type-safe wrapper around posthog.capture
 * Provides autocomplete and type checking for event names and properties
 */
export function trackEvent<T extends keyof AnalyticsEvents>(
  eventName: T,
  properties?: AnalyticsEvents[T]
): void {
  posthog.capture(eventName, properties);
}
