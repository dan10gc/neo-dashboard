export const EVENT_TYPES = ["interstellar_object"] as const;

export const EVENT_ORIGINS = [
  "extrasolar",
  // 'oort_cloud',
  // 'asteroid_belt',
  // 'kuiper_belt',
  "solar_system",
] as const;

export const PRIORITIES = ["low", "medium", "high", "critical"] as const;
export const DISTANCE_UNITS = ["km", "AU", "LD"] as const;
export const VELOCITY_UNITS = ["km/s", "m/s", "km/h"] as const;

// Derived types from constants

export type EventType = (typeof EVENT_TYPES)[number];
export type EventOrigin = (typeof EVENT_ORIGINS)[number];
export type EventPriority = (typeof PRIORITIES)[number];
export type DistanceUnit = (typeof DISTANCE_UNITS)[number];
export type VelocityUnit = (typeof VELOCITY_UNITS)[number];

// Interfaces
export interface EventMetadata {
  discoveryDate?: string;
  discoveryLocation?: string;
  dimensions?: string;
  albedo?: string;
  rotationPeriod?: string;
  classification?: string;
  links?: string[];
  images?: string[];
  [key: string]: any;
}

export interface SpecialEvent {
  id: string;
  name: string;
  type: EventType;
  origin: EventOrigin;
  description: string;
  eventData: string; // ISO 8601
  eventTimestamp: number; // Unix timestamp
  distance: {
    value: number;
    unit: DistanceUnit;
  };
  velocity?: {
    value: number;
    unit: VelocityUnit;
  };
  priority: EventPriority;
  isActive: boolean;
  metadata?: EventMetadata;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}

export interface UpdateEventRequest {
  name?: string;
  description?: string;
  priority?: EventPriority;
  isActive?: boolean;
  metadata?: EventMetadata;
}

// SSE Event types
export type SSEEventType = "event:new" | "event:update" | "event:delete";

export interface SSEMessage {
  type: SSEEventType;
  data: SpecialEvent | { id: string };
  timestamp: number; // Unix timestamp
}
