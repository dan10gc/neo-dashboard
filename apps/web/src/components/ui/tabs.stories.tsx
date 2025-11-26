import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity, FileText, Settings, Star } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

const meta = {
  title: "Components/UI/Tabs",
  component: Tabs,
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
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic tabs with simple content.
 */
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="trajectory">Trajectory</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Asteroid Overview</CardTitle>
            <CardDescription>Quick summary of tracked objects</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Currently monitoring 47 near-Earth objects within a 7-day
              observation window. 12 are classified as potentially hazardous.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="details">
        <Card>
          <CardHeader>
            <CardTitle>Detailed Statistics</CardTitle>
            <CardDescription>Comprehensive tracking data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Objects:</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hazardous:</span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Average Size:</span>
                <span className="font-medium">85 meters</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="trajectory">
        <Card>
          <CardHeader>
            <CardTitle>Orbital Trajectories</CardTitle>
            <CardDescription>Calculated orbital paths</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              View detailed orbital trajectory calculations and close approach
              predictions for all tracked asteroids.
            </p>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Tabs with icons.
 */
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tracking" className="w-[450px]">
      <TabsList>
        <TabsTrigger value="tracking">
          <Activity />
          Tracking
        </TabsTrigger>
        <TabsTrigger value="favorites">
          <Star />
          Favorites
        </TabsTrigger>
        <TabsTrigger value="reports">
          <FileText />
          Reports
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tracking">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">Active Tracking</h3>
          <p className="text-sm text-muted-foreground">
            47 asteroids are currently being monitored in real-time.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="favorites">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">Favorite Asteroids</h3>
          <p className="text-sm text-muted-foreground">
            Your saved list of interesting near-Earth objects.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="reports">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">Generated Reports</h3>
          <p className="text-sm text-muted-foreground">
            Export and view tracking reports and analytics.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold mb-2">Tracking Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure monitoring parameters and notification preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Tabs for asteroid categories.
 */
export const Categories: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-[500px]">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="hazardous">Hazardous</TabsTrigger>
        <TabsTrigger value="large">Large</TabsTrigger>
        <TabsTrigger value="close">Close</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="border rounded-md p-4">
          <p className="text-sm font-medium mb-2">All Asteroids (47)</p>
          <p className="text-sm text-muted-foreground">
            Displaying all near-Earth objects in the current observation window.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="hazardous">
        <div className="border rounded-md p-4">
          <p className="text-sm font-medium mb-2">Potentially Hazardous (12)</p>
          <p className="text-sm text-muted-foreground">
            Asteroids classified as potentially hazardous based on size and
            approach distance.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="large">
        <div className="border rounded-md p-4">
          <p className="text-sm font-medium mb-2">Large Asteroids (8)</p>
          <p className="text-sm text-muted-foreground">
            Objects larger than 140 meters in diameter.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="close">
        <div className="border rounded-md p-4">
          <p className="text-sm font-medium mb-2">Close Approaches (15)</p>
          <p className="text-sm text-muted-foreground">
            Asteroids passing within 0.1 AU of Earth.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Tabs with different content layouts.
 */
export const MixedContent: Story = {
  render: () => (
    <Tabs defaultValue="stats" className="w-[600px]">
      <TabsList>
        <TabsTrigger value="stats">Statistics</TabsTrigger>
        <TabsTrigger value="chart">Chart</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
      </TabsList>
      <TabsContent value="stats">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold">47</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hazardous</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-destructive">12</p>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="chart">
        <div className="border rounded-md p-4 h-64 flex items-center justify-center">
          <p className="text-muted-foreground">Chart visualization would appear here</p>
        </div>
      </TabsContent>
      <TabsContent value="list">
        <div className="border rounded-md">
          <div className="divide-y">
            <div className="p-3 hover:bg-accent/50">99942 Apophis</div>
            <div className="p-3 hover:bg-accent/50">101955 Bennu</div>
            <div className="p-3 hover:bg-accent/50">16 Psyche</div>
            <div className="p-3 hover:bg-accent/50">2019 OK</div>
            <div className="p-3 hover:bg-accent/50">2024 ZX</div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Vertical tabs layout.
 */
export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[700px]">
      <TabsList className="w-full">
        <TabsTrigger value="tab1" className="flex-1">
          Overview
        </TabsTrigger>
        <TabsTrigger value="tab2" className="flex-1">
          Tracking
        </TabsTrigger>
        <TabsTrigger value="tab3" className="flex-1">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="tab4" className="flex-1">
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="border rounded-md p-6">
          <h2 className="text-xl font-semibold mb-2">System Overview</h2>
          <p className="text-muted-foreground">
            Complete overview of the asteroid tracking system and current
            monitoring status.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="border rounded-md p-6">
          <h2 className="text-xl font-semibold mb-2">Active Tracking</h2>
          <p className="text-muted-foreground">
            Real-time monitoring data for all tracked near-Earth objects.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="border rounded-md p-6">
          <h2 className="text-xl font-semibold mb-2">Analytics Dashboard</h2>
          <p className="text-muted-foreground">
            Detailed analytics and statistical analysis of tracking data.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="tab4">
        <div className="border rounded-md p-6">
          <h2 className="text-xl font-semibold mb-2">System Settings</h2>
          <p className="text-muted-foreground">
            Configure monitoring parameters and notification preferences.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Tabs with disabled tab.
 */
export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="available" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="available">Available</TabsTrigger>
        <TabsTrigger value="processing" disabled>
          Processing
        </TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
      <TabsContent value="available">
        <div className="border rounded-md p-4">
          <p className="text-sm">Active asteroids ready for viewing.</p>
        </div>
      </TabsContent>
      <TabsContent value="processing">
        <div className="border rounded-md p-4">
          <p className="text-sm">Data is currently being processed.</p>
        </div>
      </TabsContent>
      <TabsContent value="archived">
        <div className="border rounded-md p-4">
          <p className="text-sm">Archived historical tracking data.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Compact tabs.
 */
export const Compact: Story = {
  render: () => (
    <Tabs defaultValue="1" className="w-[300px]">
      <TabsList>
        <TabsTrigger value="1">1D</TabsTrigger>
        <TabsTrigger value="7">7D</TabsTrigger>
        <TabsTrigger value="30">30D</TabsTrigger>
        <TabsTrigger value="all">All</TabsTrigger>
      </TabsList>
      <TabsContent value="1">
        <div className="p-3 border rounded-md text-sm">
          Asteroids approaching in the next 1 day
        </div>
      </TabsContent>
      <TabsContent value="7">
        <div className="p-3 border rounded-md text-sm">
          Asteroids approaching in the next 7 days
        </div>
      </TabsContent>
      <TabsContent value="30">
        <div className="p-3 border rounded-md text-sm">
          Asteroids approaching in the next 30 days
        </div>
      </TabsContent>
      <TabsContent value="all">
        <div className="p-3 border rounded-md text-sm">
          All tracked asteroids
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Many tabs with scrolling.
 */
export const ManyTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-[500px]">
      <TabsList className="w-full overflow-x-auto">
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Tracking</TabsTrigger>
        <TabsTrigger value="tab3">Analytics</TabsTrigger>
        <TabsTrigger value="tab4">Reports</TabsTrigger>
        <TabsTrigger value="tab5">Settings</TabsTrigger>
        <TabsTrigger value="tab6">Alerts</TabsTrigger>
        <TabsTrigger value="tab7">History</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <div className="border rounded-md p-4">
          <p className="text-sm">Overview content</p>
        </div>
      </TabsContent>
      <TabsContent value="tab2">
        <div className="border rounded-md p-4">
          <p className="text-sm">Tracking content</p>
        </div>
      </TabsContent>
      <TabsContent value="tab3">
        <div className="border rounded-md p-4">
          <p className="text-sm">Analytics content</p>
        </div>
      </TabsContent>
      <TabsContent value="tab4">
        <div className="border rounded-md p-4">
          <p className="text-sm">Reports content</p>
        </div>
      </TabsContent>
      <TabsContent value="tab5">
        <div className="border rounded-md p-4">
          <p className="text-sm">Settings content</p>
        </div>
      </TabsContent>
      <TabsContent value="tab6">
        <div className="border rounded-md p-4">
          <p className="text-sm">Alerts content</p>
        </div>
      </TabsContent>
      <TabsContent value="tab7">
        <div className="border rounded-md p-4">
          <p className="text-sm">History content</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
