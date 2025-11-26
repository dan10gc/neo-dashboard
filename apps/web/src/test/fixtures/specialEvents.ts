import type { SpecialEvent } from "@/types/special-events";

export const mockSpecialEvent1: SpecialEvent = {
  id: "evt-001",
  name: "Oumuamua",
  type: "interstellar_object",
  origin: "interstellar",
  description:
    "First confirmed interstellar object detected passing through our solar system",
  eventDate: "2024-01-15T12:00:00Z",
  eventTimestamp: 1705320000000,
  distance: {
    value: 0.2,
    unit: "AU",
  },
  velocity: {
    value: 26.33,
    unit: "km/s",
  },
  diameter: {
    min: 100,
    max: 400,
    unit: "m",
  },
  priority: "critical",
  isActive: true,
  isPotentiallyHazardous: false,
  metadata: {
    discoveryDate: "2017-10-19",
    discoveredBy: "Pan-STARRS",
    referenceUrl: "https://en.wikipedia.org/wiki/Oumuamua",
    significance: "First detected interstellar visitor to our solar system",
  },
};

export const mockSpecialEvent2: SpecialEvent = {
  id: "evt-002",
  name: "Comet NEOWISE",
  type: "comet",
  origin: "oort_cloud",
  description: "Bright long-period comet visible to the naked eye",
  eventDate: "2024-01-20T08:30:00Z",
  eventTimestamp: 1705741800000,
  distance: {
    value: 0.69,
    unit: "AU",
  },
  velocity: {
    value: 14.0,
    unit: "km/s",
  },
  priority: "high",
  isActive: true,
  isPotentiallyHazardous: false,
  metadata: {
    discoveryDate: "2020-03-27",
    discoveredBy: "NEOWISE Mission",
    significance: "Brightest comet visible from Northern Hemisphere in years",
  },
};

export const mockSpecialEvent3: SpecialEvent = {
  id: "evt-003",
  name: "Apophis",
  type: "unusual_neo",
  origin: "near_earth",
  description:
    "Large asteroid making an exceptionally close approach to Earth",
  eventDate: "2024-01-25T15:45:00Z",
  eventTimestamp: 1706196300000,
  distance: {
    value: 0.05,
    unit: "AU",
  },
  velocity: {
    value: 7.42,
    unit: "km/s",
  },
  diameter: {
    min: 310,
    max: 340,
    unit: "m",
  },
  priority: "critical",
  isActive: true,
  isPotentiallyHazardous: true,
  metadata: {
    discoveryDate: "2004-06-19",
    discoveredBy: "Roy A. Tucker, David J. Tholen, Fabrizio Bernardi",
    referenceUrl: "https://en.wikipedia.org/wiki/99942_Apophis",
    significance: "Will pass closer to Earth than geosynchronous satellites in 2029",
  },
};

export const mockSpecialEventUpdated: SpecialEvent = {
  ...mockSpecialEvent2,
  description: "Updated: Comet now at peak brightness",
  priority: "critical",
};

export const mockSpecialEventsBatch: SpecialEvent[] = [
  mockSpecialEvent1,
  mockSpecialEvent2,
  mockSpecialEvent3,
];
