import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronRight, Loader2, Mail, Rocket } from "lucide-react";

import { Button } from "./button";

const meta = {
  title: "Components/UI/Button",
  component: Button,
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
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
    },
    asChild: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button variant.
 */
export const Default: Story = {
  args: {
    children: "Track Asteroid",
  },
};

/**
 * Destructive button for dangerous actions.
 */
export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete Data",
  },
};

/**
 * Outline button variant.
 */
export const Outline: Story = {
  args: {
    variant: "outline",
    children: "View Details",
  },
};

/**
 * Secondary button variant.
 */
export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Learn More",
  },
};

/**
 * Ghost button variant for subtle actions.
 */
export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Cancel",
  },
};

/**
 * Link button variant.
 */
export const Link: Story = {
  args: {
    variant: "link",
    children: "Read Documentation",
  },
};

/**
 * Small button size.
 */
export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Button",
  },
};

/**
 * Large button size.
 */
export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Button",
  },
};

/**
 * Icon button (default size).
 */
export const Icon: Story = {
  args: {
    size: "icon",
    children: <Rocket />,
  },
};

/**
 * Small icon button.
 */
export const IconSmall: Story = {
  args: {
    size: "icon-sm",
    children: <Mail />,
  },
};

/**
 * Large icon button.
 */
export const IconLarge: Story = {
  args: {
    size: "icon-lg",
    children: <ChevronRight />,
  },
};

/**
 * Button with icon and text.
 */
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail />
        Login with Email
      </>
    ),
  },
};

/**
 * Button with icon on the right.
 */
export const WithIconRight: Story = {
  args: {
    children: (
      <>
        Continue
        <ChevronRight />
      </>
    ),
  },
};

/**
 * Loading button with spinner.
 */
export const Loading: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <Loader2 className="animate-spin" />
        Loading...
      </>
    ),
  },
};

/**
 * Disabled button.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

/**
 * All variants displayed together.
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

/**
 * All sizes displayed together.
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

/**
 * All icon sizes displayed together.
 */
export const AllIconSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-sm">
        <Rocket />
      </Button>
      <Button size="icon">
        <Rocket />
      </Button>
      <Button size="icon-lg">
        <Rocket />
      </Button>
    </div>
  ),
};

/**
 * Buttons with different actions for asteroid tracking.
 */
export const AsteroidActions: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <Button>
          <Rocket />
          Track Asteroid
        </Button>
        <Button variant="outline">View Trajectory</Button>
        <Button variant="ghost">More Info</Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary">Export Data</Button>
        <Button variant="destructive">Remove from List</Button>
      </div>
    </div>
  ),
};

/**
 * Button as a link using asChild prop.
 */
export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer">
        NASA API Docs
        <ChevronRight />
      </a>
    </Button>
  ),
};

/**
 * Full width button.
 */
export const FullWidth: Story = {
  args: {
    className: "w-full",
    children: "Start Monitoring",
  },
};
