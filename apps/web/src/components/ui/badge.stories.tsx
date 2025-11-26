import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Rocket, Shield, Sparkles, Star } from "lucide-react";

import { Badge } from "./badge";

const meta = {
  title: "Components/UI/Badge",
  component: Badge,
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
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "destructive", "outline"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default badge variant.
 */
export const Default: Story = {
  args: {
    children: "Tracked",
  },
};

/**
 * Secondary badge variant for less prominent information.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Common",
  },
};

/**
 * Destructive badge for warnings or errors.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Potentially Hazardous",
  },
};

/**
 * Outline badge variant.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Monitoring",
  },
};

/**
 * Badge with icon on the left.
 */
export const WithIcon: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge>
        <Star className="size-3" />
        Legendary
      </Badge>
      <Badge variant="destructive">
        <AlertTriangle className="size-3" />
        Hazardous
      </Badge>
      <Badge variant="secondary">
        <Rocket className="size-3" />
        Mission Target
      </Badge>
    </div>
  ),
};

/**
 * Badges demonstrating asteroid rarity levels.
 */
export const RarityLevels: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
        <Sparkles className="size-3" />
        Legendary
      </Badge>
      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
        Epic
      </Badge>
      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
        Rare
      </Badge>
      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
        Uncommon
      </Badge>
      <Badge variant="secondary">Common</Badge>
    </div>
  ),
};

/**
 * Status badges for system monitoring.
 */
export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
        <Shield className="size-3" />
        Operational
      </Badge>
      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/50">
        <AlertTriangle className="size-3" />
        Warning
      </Badge>
      <Badge variant="destructive">
        <AlertTriangle className="size-3" />
        Critical
      </Badge>
      <Badge variant="secondary">Offline</Badge>
    </div>
  ),
};

/**
 * Size category badges.
 */
export const SizeCategories: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Badge variant="outline">Small (15-35m)</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline">Medium (45-100m)</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline">Large (100-500m)</Badge>
      </div>
      <div className="flex gap-2">
        <Badge variant="outline">Very Large (500m+)</Badge>
      </div>
    </div>
  ),
};

/**
 * All variants displayed together.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

/**
 * Interactive badge as a link.
 */
export const AsLink: Story = {
  render: () => (
    <Badge asChild>
      <a href="#" className="cursor-pointer">
        Click me
      </a>
    </Badge>
  ),
};

/**
 * Long text in badge to demonstrate wrapping behavior.
 */
export const LongText: Story = {
  args: {
    children: "Potentially Hazardous - Close Approach Warning",
    className: "max-w-[200px]",
  },
};

/**
 * Multiple badges in a group.
 */
export const BadgeGroup: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2 max-w-md">
      <Badge>2024 ZX</Badge>
      <Badge variant="destructive">Hazardous</Badge>
      <Badge variant="outline">0.25 AU</Badge>
      <Badge variant="secondary">15-35m</Badge>
      <Badge>Uncommon</Badge>
    </div>
  ),
};
