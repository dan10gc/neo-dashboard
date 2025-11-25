import type { Meta, StoryObj } from "@storybook/react-vite";

import { SurveillanceStats } from "./surveillance-stats";

const meta = {
  title: "Features/Dashboard/SurveillanceStats",
  component: SurveillanceStats,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SurveillanceStats>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    totalAsteroids: 127,
    totalHazardous: 18,
    largestAsteroidKm: 16.8,
    closestApproachAu: 0.0032,
  },
};

export const HighActivity: Story = {
  args: {
    totalAsteroids: 245,
    totalHazardous: 42,
    largestAsteroidKm: 25.3,
    closestApproachAu: 0.0018,
  },
};

export const LowActivity: Story = {
  args: {
    totalAsteroids: 45,
    totalHazardous: 3,
    largestAsteroidKm: 8.2,
    closestApproachAu: 0.125,
  },
};

export const MinimalData: Story = {
  args: {
    totalAsteroids: 12,
    totalHazardous: 1,
    largestAsteroidKm: 2.5,
    closestApproachAu: 0.25,
  },
};

export const NoHazardous: Story = {
  args: {
    totalAsteroids: 89,
    totalHazardous: 0,
    largestAsteroidKm: 12.4,
    closestApproachAu: 0.0875,
  },
};

export const HighHazardous: Story = {
  args: {
    totalAsteroids: 100,
    totalHazardous: 35,
    largestAsteroidKm: 32.1,
    closestApproachAu: 0.0012,
  },
};

export const LargeAsteroid: Story = {
  args: {
    totalAsteroids: 156,
    totalHazardous: 22,
    largestAsteroidKm: 42.7,
    closestApproachAu: 0.045,
  },
};

export const VeryCloseApproach: Story = {
  args: {
    totalAsteroids: 78,
    totalHazardous: 15,
    largestAsteroidKm: 9.5,
    closestApproachAu: 0.0005,
  },
};
