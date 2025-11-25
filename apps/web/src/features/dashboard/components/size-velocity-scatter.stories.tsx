import type { Meta, StoryObj } from "@storybook/react-vite";
import { SizeVelocityScatter } from "./size-velocity-scatter";
import type { SizeVelocityDataPoint } from "@/lib/transformers/transformers";

const meta = {
  title: "Features/Dashboard/SizeVelocityScatter",
  component: SizeVelocityScatter,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof SizeVelocityScatter>;

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for different scenarios

/**
 * Creates realistic asteroid data with varying size and velocity
 */
const createMockData = (): SizeVelocityDataPoint[] => [
  {
    name: "433 Eros (A898 PA)",
    diameter: 22146,
    velocity: 5.54,
    hazardous: false,
    absoluteMagnitude: 10.31,
  },
  {
    name: "(2010 PK9)",
    diameter: 144,
    velocity: 18.75,
    hazardous: true,
    absoluteMagnitude: 21.1,
  },
  {
    name: "(2015 TB145)",
    diameter: 625,
    velocity: 35.02,
    hazardous: false,
    absoluteMagnitude: 19.8,
  },
  {
    name: "99942 Apophis",
    diameter: 370,
    velocity: 7.42,
    hazardous: true,
    absoluteMagnitude: 19.7,
  },
  {
    name: "101955 Bennu",
    diameter: 490,
    velocity: 10.12,
    hazardous: true,
    absoluteMagnitude: 20.9,
  },
  {
    name: "(2020 QG)",
    diameter: 6,
    velocity: 12.37,
    hazardous: false,
    absoluteMagnitude: 29.1,
  },
  {
    name: "(2019 OK)",
    diameter: 130,
    velocity: 24.53,
    hazardous: false,
    absoluteMagnitude: 23.2,
  },
  {
    name: "(2021 UA)",
    diameter: 42,
    velocity: 17.84,
    hazardous: false,
    absoluteMagnitude: 25.4,
  },
];

/**
 * Default story - Typical dataset with mixed hazard status
 */
export const Default: Story = {
  args: {
    data: createMockData(),
  },
};

/**
 * Only hazardous asteroids - all yellow data points
 */
export const OnlyHazardous: Story = {
  args: {
    data: [
      {
        name: "(2010 PK9)",
        diameter: 144,
        velocity: 18.75,
        hazardous: true,
        absoluteMagnitude: 21.1,
      },
      {
        name: "99942 Apophis",
        diameter: 370,
        velocity: 7.42,
        hazardous: true,
        absoluteMagnitude: 19.7,
      },
      {
        name: "101955 Bennu",
        diameter: 490,
        velocity: 10.12,
        hazardous: true,
        absoluteMagnitude: 20.9,
      },
      {
        name: "(2004 MN4)",
        diameter: 325,
        velocity: 15.63,
        hazardous: true,
        absoluteMagnitude: 19.3,
      },
    ],
  },
};

/**
 * Only safe asteroids - all green data points
 */
export const OnlySafe: Story = {
  args: {
    data: [
      {
        name: "433 Eros (A898 PA)",
        diameter: 22146,
        velocity: 5.54,
        hazardous: false,
        absoluteMagnitude: 10.31,
      },
      {
        name: "(2015 TB145)",
        diameter: 625,
        velocity: 35.02,
        hazardous: false,
        absoluteMagnitude: 19.8,
      },
      {
        name: "(2020 QG)",
        diameter: 6,
        velocity: 12.37,
        hazardous: false,
        absoluteMagnitude: 29.1,
      },
      {
        name: "(2019 OK)",
        diameter: 130,
        velocity: 24.53,
        hazardous: false,
        absoluteMagnitude: 23.2,
      },
    ],
  },
};

/**
 * Extreme values - tests edge cases
 */
export const ExtremeValues: Story = {
  args: {
    data: [
      {
        name: "Tiny & Slow",
        diameter: 1,
        velocity: 1.0,
        hazardous: false,
        absoluteMagnitude: 32.0,
      },
      {
        name: "Tiny & Fast",
        diameter: 2,
        velocity: 45.8,
        hazardous: true,
        absoluteMagnitude: 31.5,
      },
      {
        name: "Huge & Slow",
        diameter: 50000,
        velocity: 2.5,
        hazardous: false,
        absoluteMagnitude: 8.2,
      },
      {
        name: "Huge & Fast",
        diameter: 45000,
        velocity: 42.3,
        hazardous: true,
        absoluteMagnitude: 8.5,
      },
      {
        name: "Medium Balanced",
        diameter: 350,
        velocity: 15.0,
        hazardous: false,
        absoluteMagnitude: 20.0,
      },
    ],
  },
};

/**
 * Single asteroid - minimal dataset
 */
export const SingleAsteroid: Story = {
  args: {
    data: [
      {
        name: "99942 Apophis",
        diameter: 370,
        velocity: 7.42,
        hazardous: true,
        absoluteMagnitude: 19.7,
      },
    ],
  },
};

/**
 * Two overlapping asteroids - tests tooltip grouping
 */
export const OverlappingPoints: Story = {
  args: {
    data: [
      {
        name: "Asteroid A",
        diameter: 450,
        velocity: 15.3,
        hazardous: true,
        absoluteMagnitude: 19.5,
      },
      {
        name: "Asteroid B",
        diameter: 450,
        velocity: 15.3,
        hazardous: false,
        absoluteMagnitude: 19.6,
      },
      {
        name: "Asteroid C",
        diameter: 200,
        velocity: 10.0,
        hazardous: false,
        absoluteMagnitude: 21.2,
      },
    ],
  },
};

/**
 * Large dataset - tests performance and clustering
 */
export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      name: `Asteroid ${i + 1}`,
      diameter: Math.floor(Math.random() * 10000) + 10,
      velocity: Math.random() * 40 + 2,
      hazardous: Math.random() > 0.7,
      absoluteMagnitude: Math.random() * 15 + 15,
    })),
  },
};

/**
 * Empty state - no data available
 */
export const EmptyState: Story = {
  args: {
    data: [],
  },
};

/**
 * Undefined data - tests graceful handling
 */
export const UndefinedData: Story = {
  args: {
    data: undefined,
  },
};

/**
 * Real-world scenario - Recent close approaches
 * Based on typical NASA NEO data distribution
 */
export const RealWorldScenario: Story = {
  args: {
    data: [
      {
        name: "433 Eros",
        diameter: 22146,
        velocity: 5.54,
        hazardous: false,
        absoluteMagnitude: 10.31,
      },
      {
        name: "(2023 DW)",
        diameter: 50,
        velocity: 25.38,
        hazardous: false,
        absoluteMagnitude: 24.8,
      },
      {
        name: "(2024 MX)",
        diameter: 250,
        velocity: 18.92,
        hazardous: true,
        absoluteMagnitude: 20.7,
      },
      {
        name: "(2024 BJ)",
        diameter: 15,
        velocity: 31.45,
        hazardous: false,
        absoluteMagnitude: 27.3,
      },
      {
        name: "99942 Apophis",
        diameter: 370,
        velocity: 7.42,
        hazardous: true,
        absoluteMagnitude: 19.7,
      },
      {
        name: "(2024 AB7)",
        diameter: 92,
        velocity: 14.23,
        hazardous: false,
        absoluteMagnitude: 23.9,
      },
      {
        name: "(2024 QK4)",
        diameter: 183,
        velocity: 21.67,
        hazardous: true,
        absoluteMagnitude: 21.5,
      },
      {
        name: "(2022 SW3)",
        diameter: 8,
        velocity: 8.15,
        hazardous: false,
        absoluteMagnitude: 28.6,
      },
      {
        name: "101955 Bennu",
        diameter: 490,
        velocity: 10.12,
        hazardous: true,
        absoluteMagnitude: 20.9,
      },
      {
        name: "(2024 FX2)",
        diameter: 420,
        velocity: 16.84,
        hazardous: false,
        absoluteMagnitude: 19.4,
      },
      {
        name: "(2023 HW1)",
        diameter: 67,
        velocity: 29.33,
        hazardous: false,
        absoluteMagnitude: 24.2,
      },
      {
        name: "(2024 RB)",
        diameter: 305,
        velocity: 12.91,
        hazardous: true,
        absoluteMagnitude: 20.1,
      },
    ],
  },
};

/**
 * Small asteroids cluster - fast moving small objects
 */
export const SmallAsteroidsCluster: Story = {
  args: {
    data: [
      {
        name: "(2020 QG)",
        diameter: 6,
        velocity: 12.37,
        hazardous: false,
        absoluteMagnitude: 29.1,
      },
      {
        name: "(2020 SW)",
        diameter: 8,
        velocity: 15.82,
        hazardous: false,
        absoluteMagnitude: 28.5,
      },
      {
        name: "(2021 UA1)",
        diameter: 4,
        velocity: 18.45,
        hazardous: false,
        absoluteMagnitude: 30.2,
      },
      {
        name: "(2024 TK)",
        diameter: 12,
        velocity: 22.17,
        hazardous: true,
        absoluteMagnitude: 27.8,
      },
      {
        name: "(2023 VL)",
        diameter: 9,
        velocity: 9.63,
        hazardous: false,
        absoluteMagnitude: 28.9,
      },
      {
        name: "(2024 QZ)",
        diameter: 14,
        velocity: 26.54,
        hazardous: true,
        absoluteMagnitude: 27.3,
      },
    ],
  },
};

/**
 * Large asteroids - slower moving massive objects
 */
export const LargeAsteroids: Story = {
  args: {
    data: [
      {
        name: "433 Eros",
        diameter: 22146,
        velocity: 5.54,
        hazardous: false,
        absoluteMagnitude: 10.31,
      },
      {
        name: "4179 Toutatis",
        diameter: 4600,
        velocity: 6.72,
        hazardous: false,
        absoluteMagnitude: 15.3,
      },
      {
        name: "1620 Geographos",
        diameter: 5100,
        velocity: 8.91,
        hazardous: true,
        absoluteMagnitude: 15.6,
      },
      {
        name: "4660 Nereus",
        diameter: 330,
        velocity: 4.95,
        hazardous: false,
        absoluteMagnitude: 18.2,
      },
    ],
  },
};
