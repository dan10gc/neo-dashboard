import type { Meta, StoryObj } from "@storybook/react-vite";
import { MoreVertical, Rocket } from "lucide-react";

import { Button } from "./button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

const meta = {
  title: "Components/UI/Card",
  component: Card,
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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic card with header, content, and footer.
 */
export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Near-Earth Objects</CardTitle>
        <CardDescription>Tracking asteroids approaching Earth</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Currently monitoring 47 asteroids within a 7-day observation window.
          All objects are being tracked in real-time with updated trajectory
          calculations.
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">View All Objects</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card with action button in header.
 */
export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>System Status</CardTitle>
        <CardDescription>Real-time monitoring active</CardDescription>
        <CardAction>
          <Button variant="ghost" size="icon">
            <MoreVertical />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tracked Objects:</span>
            <span className="font-medium">47</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Last Update:</span>
            <span className="font-medium">2 min ago</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Next Approach:</span>
            <span className="font-medium">2h 34m</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with just content, no header or footer.
 */
export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent>
        <div className="flex items-center gap-4">
          <Rocket className="size-12 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Mission: DART</p>
            <p className="text-xs text-muted-foreground">
              Successfully demonstrated asteroid deflection technology on
              September 26, 2022.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

/**
 * Card displaying asteroid statistics.
 */
export const AsteroidStats: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>99942 Apophis</CardTitle>
        <CardDescription>Legendary</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Size</p>
            <p className="text-lg font-semibold">310-340 meters</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Close Approach</p>
            <p className="text-lg font-semibold">April 13, 2029</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Miss Distance</p>
            <p className="text-lg font-semibold">31,600 km</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Velocity</p>
            <p className="text-lg font-semibold">30.73 km/s</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          View Trajectory
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Multiple cards in a grid layout.
 */
export const Grid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[700px]">
      <Card>
        <CardHeader>
          <CardTitle>Tracked</CardTitle>
          <CardDescription>Active monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">47</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Hazardous</CardTitle>
          <CardDescription>Potentially dangerous</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-destructive">12</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Next Approach</CardTitle>
          <CardDescription>Closest object</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">2h 34m</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Window</CardTitle>
          <CardDescription>Observation period</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">7 days</p>
        </CardContent>
      </Card>
    </div>
  ),
};

/**
 * Card with form elements.
 */
export const WithForm: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Track Asteroid</CardTitle>
        <CardDescription>
          Enter asteroid designation to add to monitoring list
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="designation" className="text-sm font-medium">
              Designation
            </label>
            <input
              id="designation"
              type="text"
              placeholder="e.g., 99942 Apophis"
              className="w-full px-3 py-2 border rounded-md bg-background"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes
            </label>
            <textarea
              id="notes"
              placeholder="Add tracking notes..."
              className="w-full px-3 py-2 border rounded-md bg-background min-h-[80px]"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">Add to List</Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Minimal card with no padding adjustments.
 */
export const Minimal: Story = {
  render: () => (
    <Card className="w-[250px]">
      <CardHeader>
        <CardTitle className="text-base">Quick Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">47 NEOs</p>
        <p className="text-xs text-muted-foreground">Last update: 2m ago</p>
      </CardContent>
    </Card>
  ),
};

/**
 * Card with border styling variation.
 */
export const WithCustomBorder: Story = {
  render: () => (
    <Card className="w-[350px] border-amber-500/50 bg-amber-500/5">
      <CardHeader>
        <CardTitle className="text-amber-400">Special Event</CardTitle>
        <CardDescription>Rare close approach detected</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Asteroid 2024 ZX will make an unusually close pass at 0.05 AU on
          February 20, 2025. This is a prime observation opportunity.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="border-amber-500/50 text-amber-400">
          Set Alert
        </Button>
      </CardFooter>
    </Card>
  ),
};

/**
 * Card with long content demonstrating scrolling.
 */
export const LongContent: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Asteroid Classification</CardTitle>
        <CardDescription>Understanding NEO categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold">Atira (IEO)</p>
            <p className="text-muted-foreground text-xs">
              Asteroids whose orbits are entirely within Earth's orbit
            </p>
          </div>
          <div>
            <p className="font-semibold">Aten</p>
            <p className="text-muted-foreground text-xs">
              Semi-major axis less than 1.0 AU and perihelion greater than 0.983 AU
            </p>
          </div>
          <div>
            <p className="font-semibold">Apollo</p>
            <p className="text-muted-foreground text-xs">
              Semi-major axis greater than 1.0 AU and perihelion less than 1.017 AU
            </p>
          </div>
          <div>
            <p className="font-semibold">Amor</p>
            <p className="text-muted-foreground text-xs">
              Perihelion between 1.017 and 1.3 AU
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="link" className="px-0">
          Learn more about classifications
        </Button>
      </CardFooter>
    </Card>
  ),
};
