import type { Meta, StoryObj } from "@storybook/react-vite";

import type { NextApproachData } from "@/lib/transformers/transformers";

import { NextCloseApproach } from "./next-close-approach";

const meta = {
  title: "Features/Dashboard/NextCloseApproach",
  component: NextCloseApproach,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof NextCloseApproach>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create timestamps for future and past dates
const daysFromNow = (days: number): number => {
  return Date.now() + days * 24 * 60 * 60 * 1000;
};

// Mock data for future approaches
const futureApproaches: NextApproachData[] = [
  {
    id: "2021277",
    name: "277 Elvis (1988 GO)",
    is_potentially_hazardous_asteroid: true,
    diameter: 650,
    velocity: 45000,
    miss_distance_km: 18500000,
    miss_distance_au: 0.1237,
    close_approach_date: "2025-11-15",
    close_approach_date_full: "2025-Nov-15 14:30",
    epoch_date_close_approach: daysFromNow(20),
  },
  {
    id: "3753",
    name: "3753 Cruithne (1986 TO)",
    is_potentially_hazardous_asteroid: false,
    diameter: 5000,
    velocity: 72000,
    miss_distance_km: 45000000,
    miss_distance_au: 0.3008,
    close_approach_date: "2025-12-01",
    close_approach_date_full: "2025-Dec-01 08:15",
    epoch_date_close_approach: daysFromNow(36),
  },
  {
    id: "99942",
    name: "99942 Apophis (2004 MN4)",
    is_potentially_hazardous_asteroid: true,
    diameter: 370,
    velocity: 30720,
    miss_distance_km: 31900000,
    miss_distance_au: 0.2132,
    close_approach_date: "2025-12-10",
    close_approach_date_full: "2025-Dec-10 22:45",
    epoch_date_close_approach: daysFromNow(45),
  },
  {
    id: "101955",
    name: "101955 Bennu (1999 RQ36)",
    is_potentially_hazardous_asteroid: true,
    diameter: 492,
    velocity: 38000,
    miss_distance_km: 28500000,
    miss_distance_au: 0.1905,
    close_approach_date: "2026-01-05",
    close_approach_date_full: "2026-Jan-05 16:20",
    epoch_date_close_approach: daysFromNow(71),
  },
  {
    id: "162173",
    name: "162173 Ryugu (1999 JU3)",
    is_potentially_hazardous_asteroid: false,
    diameter: 900,
    velocity: 54000,
    miss_distance_km: 52000000,
    miss_distance_au: 0.3476,
    close_approach_date: "2026-01-20",
    close_approach_date_full: "2026-Jan-20 11:00",
    epoch_date_close_approach: daysFromNow(86),
  },
];

// Mock data for past approaches
const pastApproaches: NextApproachData[] = [
  {
    id: "433",
    name: "433 Eros (1898 DQ)",
    is_potentially_hazardous_asteroid: false,
    diameter: 16840,
    velocity: 23940,
    miss_distance_km: 22500000,
    miss_distance_au: 0.1503,
    close_approach_date: "2025-10-05",
    close_approach_date_full: "2025-Oct-05 09:30",
    epoch_date_close_approach: daysFromNow(-21),
  },
  {
    id: "1566",
    name: "1566 Icarus (1949 MA)",
    is_potentially_hazardous_asteroid: true,
    diameter: 1400,
    velocity: 94000,
    miss_distance_km: 6300000,
    miss_distance_au: 0.0421,
    close_approach_date: "2025-09-15",
    close_approach_date_full: "2025-Sep-15 18:00",
    epoch_date_close_approach: daysFromNow(-41),
  },
];

// Single approach for minimal data scenario
const singleApproach: NextApproachData[] = [
  {
    id: "2004480",
    name: "2004480 (2010 GH7)",
    is_potentially_hazardous_asteroid: false,
    diameter: 320,
    velocity: 42000,
    miss_distance_km: 38000000,
    miss_distance_au: 0.254,
    close_approach_date: "2025-11-10",
    close_approach_date_full: "2025-Nov-10 12:00",
    epoch_date_close_approach: daysFromNow(15),
  },
];

export const Default: Story = {
  args: {
    asteroidData: futureApproaches,
  },
};

export const WithHazardousAsteroids: Story = {
  args: {
    asteroidData: futureApproaches.filter(
      (a) => a.is_potentially_hazardous_asteroid
    ),
  },
};

export const PastApproaches: Story = {
  args: {
    asteroidData: pastApproaches,
  },
};

export const MixedTimeframes: Story = {
  args: {
    asteroidData: [
      ...pastApproaches.slice(0, 2),
      ...futureApproaches.slice(0, 3),
    ],
  },
};

export const SingleApproach: Story = {
  args: {
    asteroidData: singleApproach,
  },
};

export const EmptyState: Story = {
  args: {
    asteroidData: [],
  },
};

export const CloseApproach: Story = {
  args: {
    asteroidData: [
      {
        id: "2023999",
        name: "2023999 (2023 XX1)",
        is_potentially_hazardous_asteroid: true,
        diameter: 450,
        velocity: 85000,
        miss_distance_km: 480000,
        miss_distance_au: 0.0032,
        close_approach_date: "2025-11-02",
        close_approach_date_full: "2025-Nov-02 03:15",
        epoch_date_close_approach: daysFromNow(7),
      },
    ],
  },
};
