import type { Meta, StoryObj } from "@storybook/react-vite";
import { SpecialEventBanner } from "./special-event-banner";
import type { SpecialEvent } from "@/types/special-events";

const meta = {
  title: "Features/Dashboard/SpecialEventBanner",
  component: SpecialEventBanner,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SpecialEventBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper to create timestamps relative to now
const daysFromNow = (days: number): number =>
  Date.now() + days * 24 * 60 * 60 * 1000;

const hoursFromNow = (hours: number): number => Date.now() + hours * 60 * 60 * 1000;

// Comet 31 ATLAS - The real event mentioned by the user
const comet31AtlasEvent: SpecialEvent = {
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

/**
 * Default story showcasing Comet 31 ATLAS - the interstellar visitor
 * mentioned by the user, passing at 1.8 AU in approximately 45 days
 * Starts collapsed (thin banner) - click to expand
 */
export const Comet31ATLAS: Story = {
  args: {
    event: comet31AtlasEvent,
    isDismissible: true,
    defaultExpanded: false,
  },
};

/**
 * Comet 31 ATLAS expanded - shows full details on load
 */
export const Comet31ATLASExpanded: Story = {
  args: {
    event: comet31AtlasEvent,
    isDismissible: true,
    defaultExpanded: true,
  },
};

/**
 * Collapsed thin banner - default starting state
 * User must click to expand for details
 */
export const CollapsedBanner: Story = {
  args: {
    event: comet31AtlasEvent,
    isDismissible: true,
    defaultExpanded: false,
  },
};

/**
 * Interstellar object detected entering our solar system
 * Similar to 'Oumuamua - very high priority
 * Starts collapsed
 */
export const InterstellarVisitor: Story = {
  args: {
    event: {
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
      priority: "critical",
      isActive: true,
      isPotentiallyHazardous: false,
      metadata: {
        discoveryDate: new Date().toISOString(),
        discoveredBy: "Pan-STARRS",
        significance:
          "Extremely rare event. Last interstellar visitor was 2I/Borisov in 2019. This object provides invaluable data about extrasolar system composition.",
      },
    },
    isDismissible: false,
  },
};

/**
 * Potentially hazardous comet on close approach
 * This one triggers yellow warning colors
 */
export const HazardousComet: Story = {
  args: {
    event: {
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
        significance:
          "This is the closest comet approach in the last decade. Impact probability: <0.01% but monitoring continues.",
      },
    },
    isDismissible: false,
  },
};

/**
 * Upcoming meteor shower - different event type
 * Recurring natural phenomenon
 */
export const MeteorShowerEvent: Story = {
  args: {
    event: {
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
      },
    },
    isDismissible: true,
  },
};

/**
 * Unusual Near-Earth Object with interesting characteristics
 */
export const UnusualNEO: Story = {
  args: {
    event: {
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
        significance:
          "Spectroscopy suggests rare metal-rich composition. Potential future mining target.",
      },
    },
    isDismissible: true,
  },
};

/**
 * Event happening today - shows "Today!" in time until
 */
export const EventToday: Story = {
  args: {
    event: {
      ...comet31AtlasEvent,
      name: "Comet C/2024 Happening Now",
      eventDate: new Date().toISOString(),
      eventTimestamp: Date.now(),
      description: "This comet is passing Earth at its closest approach right now!",
    },
    isDismissible: false,
  },
};

/**
 * Past event - shows "Past Event" in time until
 * Useful for historical records in the feed
 */
export const PastEvent: Story = {
  args: {
    event: {
      ...comet31AtlasEvent,
      name: "Comet NEOWISE 2020",
      eventDate: new Date(daysFromNow(-30)).toISOString(),
      eventTimestamp: daysFromNow(-30),
      description:
        "Historical record: Comet NEOWISE made its closest approach 30 days ago.",
      priority: "low",
    },
    isDismissible: true,
  },
};

/**
 * Imminent event - less than 24 hours away
 */
export const ImminentEvent: Story = {
  args: {
    event: {
      id: "imminent-001",
      name: "Asteroid 2024 ZZ9",
      type: "unusual_neo",
      origin: "near_earth",
      description:
        "Close approach happening in just a few hours. Live tracking available.",
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
      priority: "high",
      isActive: true,
      isPotentiallyHazardous: false,
    },
    isDismissible: false,
  },
};

/**
 * Non-dismissible critical event
 * Simulates real-time feed alert that user must acknowledge
 */
export const CriticalNonDismissible: Story = {
  args: {
    event: {
      ...comet31AtlasEvent,
      priority: "critical",
      isPotentiallyHazardous: true,
      description:
        "ALERT: Trajectory update requires immediate attention. This object's orbit has been revised.",
    },
    isDismissible: false,
  },
};

/**
 * Minimal data event - only required fields
 * Shows graceful degradation
 */
export const MinimalData: Story = {
  args: {
    event: {
      id: "minimal-001",
      name: "Unknown Object UNK-2024",
      type: "unusual_neo",
      origin: "near_earth",
      description: "Recently detected object with limited data available.",
      eventDate: new Date(daysFromNow(60)).toISOString(),
      eventTimestamp: daysFromNow(60),
      distance: {
        value: 3.5,
        unit: "AU",
      },
      priority: "low",
      isActive: true,
      isPotentiallyHazardous: false,
    },
    isDismissible: true,
  },
};
