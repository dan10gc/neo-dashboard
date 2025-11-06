import type { Meta, StoryObj } from "@storybook/react-vite";
import { FeaturedObjects } from "./featured-objects";
import type { SpecialEvent } from "../../../types/special-events";

const meta = {
  title: "Features/Dashboard/FeaturedObjects",
  component: FeaturedObjects,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof FeaturedObjects>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to create timestamps relative to now
const daysFromNow = (days: number): number =>
  Date.now() + days * 24 * 60 * 60 * 1000;

const hoursFromNow = (hours: number): number => Date.now() + hours * 60 * 60 * 1000;

// Mock data for different scenarios

/**
 * Comet 31 ATLAS - The real event mentioned by the user
 * Interstellar visitor passing at 1.8 AU
 */
const comet31Atlas: SpecialEvent = {
  id: "comet-31p-atlas",
  name: "Comet 31P/Schwassmann-Wachmann 2",
  type: "comet",
  origin: "oort_cloud",
  description:
    "Rare interstellar visitor passing through our solar system at 1.8 AU. This long-period comet originates from the Oort Cloud and won't return for centuries.",
  eventDate: new Date(daysFromNow(45)).toISOString(),
  eventTimestamp: daysFromNow(45),
  distance: {
    value: 1.8,
    unit: "AU",
  },
  velocity: {
    value: 45000,
    unit: "km/h",
  },
  diameter: {
    min: 3.5,
    max: 4.2,
    unit: "km",
  },
  priority: "high",
  isActive: true,
  isPotentiallyHazardous: false,
  metadata: {
    discoveryDate: "1994-03-15",
    discoveredBy: "LINEAR",
    significance:
      "This comet's interstellar trajectory makes it a rare opportunity for study. Next visibility: Unknown, potentially centuries from now.",
    referenceUrl: "https://cneos.jpl.nasa.gov",
  },
};

const interstellarObject: SpecialEvent = {
  id: "interstellar-001",
  name: "2I/Borisov-like Object",
  type: "interstellar_object",
  origin: "interstellar",
  description:
    "Confirmed interstellar object detected entering our solar system. This is only the third known interstellar visitor ever observed.",
  eventDate: new Date(daysFromNow(30)).toISOString(),
  eventTimestamp: daysFromNow(30),
  distance: {
    value: 2.1,
    unit: "AU",
  },
  velocity: {
    value: 85000,
    unit: "km/h",
  },
  diameter: {
    min: 0.5,
    max: 0.8,
    unit: "km",
  },
  priority: "critical",
  isActive: true,
  isPotentiallyHazardous: false,
  metadata: {
    discoveryDate: new Date().toISOString(),
    discoveredBy: "Pan-STARRS",
    significance:
      "Extremely rare event. Last interstellar visitor was 2I/Borisov in 2019. This object provides invaluable data about extrasolar system composition.",
    referenceUrl: "https://ssd.jpl.nasa.gov",
  },
};

const hazardousComet: SpecialEvent = {
  id: "comet-hazard-001",
  name: "Comet C/2024 X7",
  type: "comet",
  origin: "kuiper_belt",
  description:
    "Unusually close approach for a comet of this size. Trajectory being closely monitored by global observatories.",
  eventDate: new Date(daysFromNow(15)).toISOString(),
  eventTimestamp: daysFromNow(15),
  distance: {
    value: 0.05,
    unit: "AU",
  },
  velocity: {
    value: 125000,
    unit: "km/h",
  },
  diameter: {
    min: 8.0,
    max: 12.0,
    unit: "km",
  },
  priority: "critical",
  isActive: true,
  isPotentiallyHazardous: true,
  metadata: {
    discoveryDate: "2024-01-10",
    discoveredBy: "ATLAS",
    significance:
      "This is the closest comet approach in the last decade. Impact probability: <0.01% but monitoring continues.",
    referenceUrl: "https://cneos.jpl.nasa.gov",
  },
};

const meteorShower: SpecialEvent = {
  id: "perseids-2024",
  name: "Perseids Meteor Shower Peak",
  type: "meteor_shower",
  origin: "asteroid_belt",
  description:
    "Annual Perseids meteor shower reaches peak activity. Expect up to 100 meteors per hour under optimal viewing conditions.",
  eventDate: new Date(daysFromNow(7)).toISOString(),
  eventTimestamp: daysFromNow(7),
  distance: {
    value: 0.0,
    unit: "AU",
  },
  priority: "medium",
  isActive: true,
  isPotentiallyHazardous: false,
  metadata: {
    significance:
      "One of the most spectacular annual meteor showers. Best viewing between midnight and dawn.",
    nextOccurrence: new Date(daysFromNow(365)).toISOString(),
    referenceUrl: "https://www.amsmeteors.org",
  },
};

const unusualNEO: SpecialEvent = {
  id: "neo-unusual-001",
  name: "Asteroid 2024 QX14",
  type: "unusual_neo",
  origin: "near_earth",
  description:
    "This asteroid has an unusually high albedo and irregular rotation period, suggesting possible binary system or unusual composition.",
  eventDate: new Date(daysFromNow(20)).toISOString(),
  eventTimestamp: daysFromNow(20),
  distance: {
    value: 0.15,
    unit: "AU",
  },
  velocity: {
    value: 55000,
    unit: "km/h",
  },
  diameter: {
    min: 0.8,
    max: 1.2,
    unit: "km",
  },
  priority: "medium",
  isActive: true,
  isPotentiallyHazardous: false,
  metadata: {
    discoveryDate: "2024-08-15",
    discoveredBy: "NEOWISE",
    significance:
      "Spectroscopy suggests rare metal-rich composition. Potential future mining target.",
    referenceUrl: "https://cneos.jpl.nasa.gov",
  },
};

/**
 * Default story - Single featured object (Comet 31 ATLAS)
 */
export const SingleObject: Story = {
  args: {
    specialEvents: [comet31Atlas],
  },
};

/**
 * Multiple featured objects - carousel navigation active
 * Includes mix of comets, interstellar objects, and unusual NEOs
 */
export const MultipleObjects: Story = {
  args: {
    specialEvents: [
      interstellarObject,
      comet31Atlas,
      hazardousComet,
      meteorShower,
      unusualNEO,
    ],
  },
};

/**
 * Interstellar visitor focus - highest priority event type
 */
export const InterstellarVisitor: Story = {
  args: {
    specialEvents: [interstellarObject],
  },
};

/**
 * Hazardous comet scenario - shows warning indicators
 */
export const HazardousEvent: Story = {
  args: {
    specialEvents: [hazardousComet],
  },
};

/**
 * Imminent event - happening in less than 24 hours
 */
export const ImminentEvent: Story = {
  args: {
    specialEvents: [
      {
        id: "imminent-001",
        name: "Asteroid 2024 ZZ9",
        type: "unusual_neo",
        origin: "near_earth",
        description:
          "Close approach happening in just a few hours. Live tracking available from observatories worldwide.",
        eventDate: new Date(hoursFromNow(8)).toISOString(),
        eventTimestamp: hoursFromNow(8),
        distance: {
          value: 0.03,
          unit: "AU",
        },
        velocity: {
          value: 95000,
          unit: "km/h",
        },
        diameter: {
          min: 0.4,
          max: 0.6,
          unit: "km",
        },
        priority: "critical",
        isActive: true,
        isPotentiallyHazardous: false,
        metadata: {
          significance:
            "One of the 10 closest approaches of the year. Provides excellent opportunity for radar observations.",
        },
      },
    ],
  },
};

/**
 * Past event - historical record
 */
export const PastEvent: Story = {
  args: {
    specialEvents: [
      {
        id: "past-001",
        name: "Comet NEOWISE 2020",
        type: "comet",
        origin: "oort_cloud",
        description:
          "Historical record: Comet NEOWISE made its closest approach on July 23, 2020, becoming one of the brightest comets visible from Earth in decades.",
        eventDate: new Date(daysFromNow(-30)).toISOString(),
        eventTimestamp: daysFromNow(-30),
        distance: {
          value: 0.69,
          unit: "AU",
        },
        velocity: {
          value: 58000,
          unit: "km/h",
        },
        diameter: {
          min: 4.0,
          max: 5.0,
          unit: "km",
        },
        priority: "low",
        isActive: true,
        isPotentiallyHazardous: false,
        metadata: {
          discoveryDate: "2020-03-27",
          discoveredBy: "NEOWISE Mission",
          significance:
            "Most spectacular comet visible to the naked eye since Hale-Bopp in 1997. Won't return for approximately 6,800 years.",
        },
      },
    ],
  },
};

/**
 * Mixed timeframes - shows variety of event timing
 */
export const MixedTimeframes: Story = {
  args: {
    specialEvents: [
      {
        ...interstellarObject,
        eventTimestamp: hoursFromNow(6),
        eventDate: new Date(hoursFromNow(6)).toISOString(),
      },
      comet31Atlas,
      meteorShower,
      {
        ...unusualNEO,
        eventTimestamp: daysFromNow(-10),
        eventDate: new Date(daysFromNow(-10)).toISOString(),
      },
    ],
  },
};

/**
 * High priority events only - critical monitoring
 */
export const HighPriority: Story = {
  args: {
    specialEvents: [interstellarObject, hazardousComet],
  },
};

/**
 * No active events - empty state
 */
export const EmptyState: Story = {
  args: {
    specialEvents: [],
  },
};

/**
 * Meteor shower event - recurring natural phenomenon
 */
export const MeteorShower: Story = {
  args: {
    specialEvents: [meteorShower],
  },
};

/**
 * Real-world scenario: Active monitoring dashboard
 * Multiple concurrent events of varying priority
 */
export const ActiveMonitoring: Story = {
  args: {
    specialEvents: [
      {
        id: "active-001",
        name: "'Oumuamua-type Object Detected",
        type: "interstellar_object",
        origin: "interstellar",
        description:
          "BREAKING: New interstellar object detected by Vera C. Rubin Observatory. Trajectory analysis in progress.",
        eventDate: new Date(hoursFromNow(72)).toISOString(),
        eventTimestamp: hoursFromNow(72),
        distance: {
          value: 3.2,
          unit: "AU",
        },
        velocity: {
          value: 110000,
          unit: "km/h",
        },
        priority: "critical",
        isActive: true,
        isPotentiallyHazardous: false,
        metadata: {
          discoveryDate: new Date().toISOString(),
          discoveredBy: "Vera C. Rubin Observatory",
          significance:
            "Only the fourth confirmed interstellar object. All major observatories are being redirected for follow-up observations.",
        },
      },
      comet31Atlas,
      meteorShower,
    ],
  },
};
