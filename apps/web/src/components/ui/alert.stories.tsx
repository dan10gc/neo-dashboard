import type { Meta } from "@storybook/react-vite";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Terminal as TerminalIcon,
} from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "./alert";

const meta = {
  title: "Components/UI/Alert",
  component: Alert,
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
} satisfies Meta<typeof Alert>;

export default meta;

/**
 * Default alert with an informational message.
 */
export const Default = {
  render: () => (
    <Alert className="w-[400px]">
      <Info />
      <AlertTitle>System Update</AlertTitle>
      <AlertDescription>
        NEO tracking data has been updated with the latest close approach
        information from NASA's NeoWs API.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Destructive alert for errors or warnings.
 */
export const Destructive = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertCircle />
      <AlertTitle>API Connection Error</AlertTitle>
      <AlertDescription>
        Failed to fetch asteroid data from NASA API. Please check your network
        connection and try again.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Alert with warning icon for important notices.
 */
export const Warning = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTriangle />
      <AlertTitle>Potentially Hazardous Object Detected</AlertTitle>
      <AlertDescription>
        A new potentially hazardous asteroid has been added to the monitoring
        list. Review the latest tracking data for more information.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Alert with terminal icon for system messages.
 */
export const Terminal = {
  render: () => (
    <Alert className="w-[400px]">
      <TerminalIcon />
      <AlertTitle>Surveillance System Active</AlertTitle>
      <AlertDescription>
        Currently monitoring 47 near-Earth objects within a 7-day window.
        Real-time updates are enabled.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Alert without icon.
 */
export const WithoutIcon = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>Data Refresh Complete</AlertTitle>
      <AlertDescription>
        The dashboard has been updated with the most recent asteroid tracking
        data.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Alert with only description, no title.
 */
export const DescriptionOnly = {
  render: () => (
    <Alert className="w-[400px]">
      <Info />
      <AlertDescription>
        Next close approach in 2 hours, 34 minutes. Asteroid 2024 ZX will pass
        Earth at a distance of 0.25 AU.
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Alert with long content.
 */
export const LongContent = {
  render: () => (
    <Alert className="w-[500px]">
      <AlertTriangle />
      <AlertTitle>Special Event: Apophis Close Approach 2029</AlertTitle>
      <AlertDescription>
        <p className="mb-2">
          On April 13, 2029, asteroid 99942 Apophis will pass within 31,600 km
          of Earth's surface - closer than geostationary satellites!
        </p>
        <p className="mb-2">
          This will be the closest approach of an asteroid this large that
          scientists have known about in advance. The encounter will provide a
          unique opportunity for scientific observation.
        </p>
        <p>
          Apophis will be visible to the naked eye as a fast-moving star-like
          point of light crossing the sky from the Indian Ocean to the Atlantic.
        </p>
      </AlertDescription>
    </Alert>
  ),
};

/**
 * Multiple alerts stacked vertically.
 */
export const MultipleAlerts = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <Alert>
        <Info />
        <AlertTitle>System Status: Operational</AlertTitle>
        <AlertDescription>
          All surveillance systems are functioning normally.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Rate Limit Warning</AlertTitle>
        <AlertDescription>
          Approaching NASA API rate limit. Consider reducing refresh frequency.
        </AlertDescription>
      </Alert>
      <Alert>
        <TerminalIcon />
        <AlertTitle>Background Task Running</AlertTitle>
        <AlertDescription>
          Calculating orbital trajectories for newly discovered objects.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

/**
 * Compact alert with minimal styling.
 */
export const Compact = {
  render: () => (
    <Alert className="w-[350px]">
      <AlertDescription>
        47 objects tracked | Last update: 2 minutes ago
      </AlertDescription>
    </Alert>
  ),
};
