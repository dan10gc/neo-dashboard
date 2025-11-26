import type { Meta, StoryObj } from "@storybook/react-vite";
import { Globe, Ruler, Zap } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "./select";

const meta = {
  title: "Components/UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#18181b" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic select with simple options.
 */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select asteroid" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apophis">99942 Apophis</SelectItem>
        <SelectItem value="bennu">101955 Bennu</SelectItem>
        <SelectItem value="psyche">16 Psyche</SelectItem>
        <SelectItem value="2019ok">2019 OK</SelectItem>
        <SelectItem value="2024zx">2024 ZX</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select with grouped items.
 */
export const WithGroups: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select by rarity" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Legendary</SelectLabel>
          <SelectItem value="apophis">99942 Apophis</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Epic</SelectLabel>
          <SelectItem value="bennu">101955 Bennu</SelectItem>
          <SelectItem value="psyche">16 Psyche</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Rare</SelectLabel>
          <SelectItem value="2019ok">2019 OK</SelectItem>
          <SelectItem value="2024ab">2024 AB</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Common</SelectLabel>
          <SelectItem value="2024zx">2024 ZX</SelectItem>
          <SelectItem value="2020cd3">2020 CD3</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select with icons in options.
 */
export const WithIcons: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Select unit system" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="metric">
          <Ruler className="inline mr-2" />
          Metric (km, m/s)
        </SelectItem>
        <SelectItem value="imperial">
          <Globe className="inline mr-2" />
          Imperial (mi, mph)
        </SelectItem>
        <SelectItem value="astronomical">
          <Zap className="inline mr-2" />
          Astronomical (AU, km/s)
        </SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Small select variant.
 */
export const Small: Story = {
  render: () => (
    <Select>
      <SelectTrigger size="sm" className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="date">Date</SelectItem>
        <SelectItem value="distance">Distance</SelectItem>
        <SelectItem value="size">Size</SelectItem>
        <SelectItem value="velocity">Velocity</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select with default value.
 */
export const WithDefaultValue: Story = {
  render: () => (
    <Select defaultValue="7">
      <SelectTrigger className="w-[220px]">
        <SelectValue placeholder="Observation window" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">1 day</SelectItem>
        <SelectItem value="3">3 days</SelectItem>
        <SelectItem value="7">7 days</SelectItem>
        <SelectItem value="14">14 days</SelectItem>
        <SelectItem value="30">30 days</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Disabled select.
 */
export const Disabled: Story = {
  render: () => (
    <Select disabled>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Disabled select" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select with disabled options.
 */
export const DisabledOptions: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select mission target" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apophis">99942 Apophis (Available)</SelectItem>
        <SelectItem value="bennu" disabled>
          101955 Bennu (Mission Active)
        </SelectItem>
        <SelectItem value="psyche" disabled>
          16 Psyche (Mission Launched)
        </SelectItem>
        <SelectItem value="didymos" disabled>
          65803 Didymos (Mission Complete)
        </SelectItem>
        <SelectItem value="2019ok">2019 OK (Available)</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select for distance units.
 */
export const DistanceUnits: Story = {
  render: () => (
    <Select defaultValue="km">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Distance unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="km">Kilometers (km)</SelectItem>
        <SelectItem value="mi">Miles (mi)</SelectItem>
        <SelectItem value="au">Astronomical Units (AU)</SelectItem>
        <SelectItem value="ld">Lunar Distance (LD)</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select for velocity units.
 */
export const VelocityUnits: Story = {
  render: () => (
    <Select defaultValue="km/s">
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Velocity unit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="km/s">km/s</SelectItem>
        <SelectItem value="m/s">m/s</SelectItem>
        <SelectItem value="mph">mph</SelectItem>
        <SelectItem value="km/h">km/h</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Select for filtering asteroids.
 */
export const FilterSelect: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Filter by hazard level" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Asteroids</SelectItem>
        <SelectSeparator />
        <SelectItem value="pha">Potentially Hazardous</SelectItem>
        <SelectItem value="safe">Non-Hazardous</SelectItem>
        <SelectSeparator />
        <SelectItem value="close">Close Approach (&lt; 0.1 AU)</SelectItem>
        <SelectItem value="large">Large Size (&gt; 100m)</SelectItem>
      </SelectContent>
    </Select>
  ),
};

/**
 * Multiple selects in a form layout.
 */
export const FormLayout: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Asteroid</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select asteroid" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apophis">99942 Apophis</SelectItem>
            <SelectItem value="bennu">101955 Bennu</SelectItem>
            <SelectItem value="psyche">16 Psyche</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Distance Unit</label>
          <Select defaultValue="km">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="km">km</SelectItem>
              <SelectItem value="mi">mi</SelectItem>
              <SelectItem value="au">AU</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Velocity Unit</label>
          <Select defaultValue="km/s">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="km/s">km/s</SelectItem>
              <SelectItem value="mph">mph</SelectItem>
              <SelectItem value="m/s">m/s</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Observation Window</label>
        <Select defaultValue="7">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 day</SelectItem>
            <SelectItem value="3">3 days</SelectItem>
            <SelectItem value="7">7 days</SelectItem>
            <SelectItem value="14">14 days</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  ),
};

/**
 * Long list with scroll.
 */
export const LongList: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[250px]">
        <SelectValue placeholder="Select asteroid" />
      </SelectTrigger>
      <SelectContent>
        {Array.from({ length: 30 }, (_, i) => (
          <SelectItem key={i} value={`asteroid-${i}`}>
            Asteroid {2000 + i} {String.fromCharCode(65 + (i % 26))}
            {String.fromCharCode(65 + ((i + 1) % 26))}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ),
};
