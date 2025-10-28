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
    largestAsteroid: "16.8 km",
    closestApproach: "0.0032",
  },
};

export const HighActivity: Story = {
  args: {
    totalAsteroids: 245,
    totalHazardous: 42,
    largestAsteroid: "25.3 km",
    closestApproach: "0.0018",
  },
};

export const LowActivity: Story = {
  args: {
    totalAsteroids: 45,
    totalHazardous: 3,
    largestAsteroid: "8.2 km",
    closestApproach: "0.1250",
  },
};

export const MinimalData: Story = {
  args: {
    totalAsteroids: 12,
    totalHazardous: 1,
    largestAsteroid: "2.5 km",
    closestApproach: "0.2500",
  },
};

export const NoHazardous: Story = {
  args: {
    totalAsteroids: 89,
    totalHazardous: 0,
    largestAsteroid: "12.4 km",
    closestApproach: "0.0875",
  },
};

export const HighHazardous: Story = {
  args: {
    totalAsteroids: 100,
    totalHazardous: 35,
    largestAsteroid: "32.1 km",
    closestApproach: "0.0012",
  },
};

export const LargeAsteroid: Story = {
  args: {
    totalAsteroids: 156,
    totalHazardous: 22,
    largestAsteroid: "42.7 km",
    closestApproach: "0.0450",
  },
};

export const VeryCloseApproach: Story = {
  args: {
    totalAsteroids: 78,
    totalHazardous: 15,
    largestAsteroid: "9.5 km",
    closestApproach: "0.0005",
  },
};
