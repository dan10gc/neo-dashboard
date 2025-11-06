/**
 * Types for special astronomical events, interstellar objects, and featured space objects
 * These types support the real-time feed architecture for highlighting rare events
 */

/**
 * Type of special space object
 */
export type SpecialObjectType =
  | "comet"
  | "interstellar_object"
  | "meteor_shower"
  | "unusual_neo"
  | "mission_related";

/**
 * Origin classification for the object
 */
export type ObjectOrigin =
  | "interstellar"      // From outside our solar system
  | "oort_cloud"        // Long-period comet from Oort Cloud
  | "kuiper_belt"       // Trans-Neptunian object
  | "asteroid_belt"     // Main belt asteroid
  | "near_earth";       // Near-Earth Object

/**
 * Priority level for display in UI
 */
export type EventPriority = "critical" | "high" | "medium" | "low";

/**
 * Core data structure for a special astronomical event or object
 */
export interface SpecialEvent {
  /** Unique identifier */
  id: string;

  /** Display name of the object/event */
  name: string;

  /** Type classification */
  type: SpecialObjectType;

  /** Origin of the object */
  origin: ObjectOrigin;

  /** Brief description (1-2 sentences) */
  description: string;

  /** Closest approach or event date (ISO 8601) */
  eventDate: string;

  /** Unix timestamp for countdown calculations */
  eventTimestamp: number;

  /** Distance data */
  distance: {
    value: number;
    unit: "AU" | "km" | "lunar";
  };

  /** Velocity data (optional for some events) */
  velocity?: {
    value: number;
    unit: "km/s" | "km/h";
  };

  /** Size/diameter data (optional) */
  diameter?: {
    min: number;
    max: number;
    unit: "km" | "m";
  };

  /** Display priority */
  priority: EventPriority;

  /** Is this event currently active/visible? */
  isActive: boolean;

  /** Is this a potentially hazardous object? */
  isPotentiallyHazardous: boolean;

  /** Additional metadata */
  metadata?: {
    /** Discovery date */
    discoveryDate?: string;

    /** Discoverer/Observatory */
    discoveredBy?: string;

    /** External reference URL */
    referenceUrl?: string;

    /** Scientific significance notes */
    significance?: string;

    /** Next visibility date (for recurring events) */
    nextOccurrence?: string;
  };
}

/**
 * UI-specific display configuration for special events
 */
export interface SpecialEventDisplay extends SpecialEvent {
  /** Icon name from lucide-react */
  icon: string;

  /** Color scheme for UI elements */
  colorScheme: {
    primary: string;    // Tailwind color class
    secondary: string;  // Tailwind color class
    text: string;       // Tailwind text color
  };

  /** Whether to show pulsing animation */
  shouldPulse: boolean;

  /** Whether the event is dismissible */
  isDismissible: boolean;
}
