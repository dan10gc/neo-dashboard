import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThreatAssessment } from "./threat-assessment";

const meta = {
  title: "Components/ThreatAssessment",
  component: ThreatAssessment,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ThreatAssessment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalHazardous: 18,
    totalAsteroids: 127,
  },
};

// Condition 5: MINIMAL (< 5%)
export const Minimal: Story = {
  args: {
    totalHazardous: 3,
    totalAsteroids: 100,
  },
};

// Condition 4: LOW (5% - 9.9%)
export const Low: Story = {
  args: {
    totalHazardous: 7,
    totalAsteroids: 100,
  },
};

// Condition 3: MODERATE (10% - 14.9%)
export const Moderate: Story = {
  args: {
    totalHazardous: 12,
    totalAsteroids: 100,
  },
};

// Condition 2: ELEVATED (15% - 19.9%)
export const Elevated: Story = {
  args: {
    totalHazardous: 17,
    totalAsteroids: 100,
  },
};

// Condition 1: CRITICAL (>= 20%)
export const Critical: Story = {
  args: {
    totalHazardous: 25,
    totalAsteroids: 100,
  },
};

// Edge case: No asteroids
export const NoData: Story = {
  args: {
    totalHazardous: 0,
    totalAsteroids: 0,
  },
};

// Edge case: All hazardous
export const AllHazardous: Story = {
  args: {
    totalHazardous: 50,
    totalAsteroids: 50,
  },
};

// Real-world scenario: High activity week
export const HighActivityWeek: Story = {
  args: {
    totalHazardous: 42,
    totalAsteroids: 245,
  },
};

// Real-world scenario: Typical week
export const TypicalWeek: Story = {
  args: {
    totalHazardous: 18,
    totalAsteroids: 156,
  },
};

// Real-world scenario: Quiet week
export const QuietWeek: Story = {
  args: {
    totalHazardous: 2,
    totalAsteroids: 78,
  },
};
