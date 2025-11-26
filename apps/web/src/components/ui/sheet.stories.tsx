import type { Meta, StoryObj } from "@storybook/react-vite";
import { Filter, Menu, Settings } from "lucide-react";

import { Button } from "./button";
import { Input } from "./input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const meta = {
  title: "Components/UI/Sheet",
  component: Sheet,
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
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default sheet sliding from the right.
 */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Asteroid Details</SheetTitle>
          <SheetDescription>
            View detailed information about this near-Earth object.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This sheet contains comprehensive tracking data, orbital parameters,
            and physical characteristics of the selected asteroid.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet sliding from the left.
 */
export const FromLeft: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
          Menu
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Access different sections of the app</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col gap-2 py-4">
          <Button variant="ghost" className="justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start">
            Asteroids
          </Button>
          <Button variant="ghost" className="justify-start">
            Tracking
          </Button>
          <Button variant="ghost" className="justify-start">
            Analytics
          </Button>
          <Button variant="ghost" className="justify-start">
            Settings
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet sliding from the top.
 */
export const FromTop: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Top</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>System Notification</SheetTitle>
          <SheetDescription>
            Important updates about asteroid tracking
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <p className="text-sm">
            A new potentially hazardous asteroid has been detected and added to
            the monitoring list. Review the latest tracking data for more
            information.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet sliding from the bottom.
 */
export const FromBottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open from Bottom</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Frequently used tracking tools</SheetDescription>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-3 py-4">
          <Button variant="outline">Add Asteroid</Button>
          <Button variant="outline">Export Data</Button>
          <Button variant="outline">Set Alert</Button>
          <Button variant="outline">Share Link</Button>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet with form inputs.
 */
export const WithForm: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Add Asteroid</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Track New Asteroid</SheetTitle>
          <SheetDescription>
            Enter the asteroid designation to add it to your monitoring list.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="designation" className="text-sm font-medium">
              Designation
            </label>
            <Input id="designation" placeholder="e.g., 99942 Apophis" />
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              Name (optional)
            </label>
            <Input id="name" placeholder="e.g., Apophis" />
          </div>
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes
            </label>
            <textarea
              id="notes"
              placeholder="Add tracking notes..."
              className="w-full px-3 py-2 border rounded-md bg-background min-h-[100px]"
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Add to List</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet with filter options.
 */
export const FilterSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Filter />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter Asteroids</SheetTitle>
          <SheetDescription>
            Customize which asteroids are displayed
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Hazard Level</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked />
                Potentially Hazardous
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked />
                Non-Hazardous
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Size Range</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked />
                Small (&lt; 50m)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked />
                Medium (50-140m)
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked />
                Large (&gt; 140m)
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Distance</h4>
            <div className="space-y-2">
              <label htmlFor="max-distance" className="text-sm">
                Maximum Distance (AU)
              </label>
              <Input
                id="max-distance"
                type="number"
                placeholder="0.25"
                step="0.01"
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button variant="outline">Reset</Button>
          <Button>Apply Filters</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Settings sheet with configuration options.
 */
export const SettingsSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Settings />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Tracking Settings</SheetTitle>
          <SheetDescription>
            Configure monitoring and display preferences
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Units</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm">Distance</label>
                <select className="px-2 py-1 border rounded-md bg-background text-sm">
                  <option>Kilometers</option>
                  <option>Miles</option>
                  <option>AU</option>
                </select>
              </div>
              <div className="flex justify-between items-center">
                <label className="text-sm">Velocity</label>
                <select className="px-2 py-1 border rounded-md bg-background text-sm">
                  <option>km/s</option>
                  <option>mph</option>
                  <option>m/s</option>
                </select>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Monitoring</h4>
            <div className="space-y-2">
              <div className="space-y-1">
                <label htmlFor="window" className="text-sm">
                  Observation Window (days)
                </label>
                <Input id="window" type="number" defaultValue="7" />
              </div>
              <div className="space-y-1">
                <label htmlFor="refresh" className="text-sm">
                  Refresh Interval (minutes)
                </label>
                <Input id="refresh" type="number" defaultValue="5" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Notifications</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked />
                New asteroid detected
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked />
                Close approach alerts
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Daily summary
              </label>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save Changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Sheet with asteroid details and statistics.
 */
export const DetailedView: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>99942 Apophis</Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>99942 Apophis</SheetTitle>
          <SheetDescription className="text-amber-400">
            Legendary • Potentially Hazardous
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Physical Characteristics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Size:</span>
                <span className="font-medium">310-340 meters</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Absolute Magnitude:</span>
                <span className="font-medium">19.7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Discovery Date:</span>
                <span className="font-medium">June 19, 2004</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Close Approach Data</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
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
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Fun Fact</h4>
            <p className="text-sm text-muted-foreground">
              On April 13, 2029, Apophis will pass so close to Earth that it will
              be visible to the naked eye and closer than some satellites!
            </p>
          </div>
        </div>
        <SheetFooter>
          <Button className="w-full">View Full Trajectory</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/**
 * Narrow sheet for mobile-like views.
 */
export const NarrowSheet: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          Quick View
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>Quick Stats</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Objects</p>
            <p className="text-3xl font-bold">47</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Hazardous</p>
            <p className="text-3xl font-bold text-destructive">12</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Next Approach</p>
            <p className="text-3xl font-bold">2h 34m</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};
