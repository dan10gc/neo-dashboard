import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar as CalendarIcon, Info, Settings } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const meta = {
  title: "Components/UI/Popover",
  component: Popover,
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
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic popover with simple content.
 */
export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open Info</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <h4 className="font-medium leading-none">Asteroid Info</h4>
          <p className="text-sm text-muted-foreground">
            View detailed tracking information for this near-Earth object.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover with calendar picker.
 */
export const WithCalendar: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <CalendarIcon />
          Pick Date
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" />
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover with form inputs.
 */
export const WithForm: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>
          <Settings />
          Settings
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Tracking Settings</h4>
            <p className="text-sm text-muted-foreground">
              Configure monitoring parameters.
            </p>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="window" className="text-xs font-medium">
                Observation Window (days)
              </label>
              <Input id="window" type="number" defaultValue="7" />
            </div>
            <div className="space-y-1">
              <label htmlFor="refresh" className="text-xs font-medium">
                Refresh Interval (minutes)
              </label>
              <Input id="refresh" type="number" defaultValue="5" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1">
              Apply
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover with icon trigger.
 */
export const WithIconTrigger: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Info />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Close Approach</h4>
          <p className="text-xs text-muted-foreground">
            The date and time when the asteroid makes its closest pass to Earth.
            All times are in UTC.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover aligned to start.
 */
export const AlignStart: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <div className="space-y-2">
          <h4 className="font-medium">Left Aligned</h4>
          <p className="text-sm text-muted-foreground">
            This popover is aligned to the start of the trigger.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover aligned to end.
 */
export const AlignEnd: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align End</Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="space-y-2">
          <h4 className="font-medium">Right Aligned</h4>
          <p className="text-sm text-muted-foreground">
            This popover is aligned to the end of the trigger.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Popover with asteroid details.
 */
export const AsteroidDetails: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">99942 Apophis</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div className="space-y-1">
            <h4 className="font-semibold">99942 Apophis</h4>
            <p className="text-xs text-amber-400">Legendary</p>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Size:</span>
              <span className="font-medium">310-340 meters</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Close Approach:</span>
              <span className="font-medium">April 13, 2029</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Miss Distance:</span>
              <span className="font-medium">31,600 km</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Velocity:</span>
              <span className="font-medium">30.73 km/s</span>
            </div>
          </div>
          <Button size="sm" className="w-full">
            View Full Details
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Narrow popover for tooltips.
 */
export const Narrow: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          Help
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <p className="text-xs">
          Click on any asteroid to view detailed tracking information and
          orbital parameters.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

/**
 * Wide popover for rich content.
 */
export const Wide: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Show Statistics</Button>
      </PopoverTrigger>
      <PopoverContent className="w-96">
        <div className="space-y-4">
          <h4 className="font-semibold">Tracking Statistics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Total Objects</p>
              <p className="text-2xl font-bold">47</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Hazardous</p>
              <p className="text-2xl font-bold text-destructive">12</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Next Approach</p>
              <p className="text-2xl font-bold">2h 34m</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Window</p>
              <p className="text-2xl font-bold">7 days</p>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
