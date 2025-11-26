import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mail, Search } from "lucide-react";

import { Input } from "./input";

const meta = {
  title: "Components/UI/Input",
  component: Input,
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
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default text input.
 */
export const Default: Story = {
  args: {
    placeholder: "Enter asteroid designation...",
  },
  render: (args) => <Input {...args} className="w-[300px]" />,
};

/**
 * Email input type.
 */
export const Email: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
  render: (args) => <Input {...args} className="w-[300px]" />,
};

/**
 * Password input type.
 */
export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
  render: (args) => <Input {...args} className="w-[300px]" />,
};

/**
 * Number input for numeric values.
 */
export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter distance in AU",
  },
  render: (args) => <Input {...args} className="w-[300px]" />,
};

/**
 * Search input type.
 */
export const SearchType: Story = {
  args: {
    type: "search",
    placeholder: "Search asteroids...",
  },
  render: (args) => <Input {...args} className="w-[300px]" />,
};

/**
 * Disabled input.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
    value: "Cannot edit this field",
  },
  render: (args) => <Input {...args} className="w-[300px]" />,
};

/**
 * Input with default value.
 */
export const WithDefaultValue: Story = {
  args: {
    defaultValue: "99942 Apophis",
  },
  render: (args) => <Input {...args} className="w-[300px]" />,
};

/**
 * Input with icon (using wrapper div).
 */
export const WithIcon: Story = {
  render: () => (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <Input placeholder="Search..." className="pl-9" />
    </div>
  ),
};

/**
 * Input with icon on the right.
 */
export const WithIconRight: Story = {
  render: () => (
    <div className="relative w-[300px]">
      <Input type="email" placeholder="your@email.com" className="pr-9" />
      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
    </div>
  ),
};

/**
 * Input with label.
 */
export const WithLabel: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="designation" className="text-sm font-medium">
        Asteroid Designation
      </label>
      <Input id="designation" placeholder="e.g., 99942 Apophis" />
    </div>
  ),
};

/**
 * Input with label and helper text.
 */
export const WithHelperText: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="distance" className="text-sm font-medium">
        Miss Distance
      </label>
      <Input id="distance" type="number" placeholder="0.25" />
      <p className="text-xs text-muted-foreground">
        Enter distance in Astronomical Units (AU)
      </p>
    </div>
  ),
};

/**
 * Input with error state.
 */
export const WithError: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email Address
      </label>
      <Input
        id="email"
        type="email"
        placeholder="your@email.com"
        aria-invalid="true"
      />
      <p className="text-xs text-destructive">Please enter a valid email address</p>
    </div>
  ),
};

/**
 * Full width input.
 */
export const FullWidth: Story = {
  args: {
    placeholder: "Full width input",
    className: "w-full",
  },
  render: (args) => (
    <div className="w-[500px]">
      <Input {...args} />
    </div>
  ),
};

/**
 * Form with multiple inputs.
 */
export const Form: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Asteroid Name
        </label>
        <Input id="name" placeholder="Apophis" />
      </div>
      <div className="space-y-2">
        <label htmlFor="designation" className="text-sm font-medium">
          Designation
        </label>
        <Input id="designation" placeholder="99942" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="size-min" className="text-sm font-medium">
            Min Size (m)
          </label>
          <Input id="size-min" type="number" placeholder="310" />
        </div>
        <div className="space-y-2">
          <label htmlFor="size-max" className="text-sm font-medium">
            Max Size (m)
          </label>
          <Input id="size-max" type="number" placeholder="340" />
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="date" className="text-sm font-medium">
          Close Approach Date
        </label>
        <Input id="date" type="date" defaultValue="2029-04-13" />
      </div>
    </div>
  ),
};

/**
 * File input type.
 */
export const FileInput: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <label htmlFor="file" className="text-sm font-medium">
        Import Tracking Data
      </label>
      <Input id="file" type="file" accept=".csv,.json" />
      <p className="text-xs text-muted-foreground">
        Upload CSV or JSON file with asteroid data
      </p>
    </div>
  ),
};

/**
 * Date input type.
 */
export const DateInput: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="approach-date" className="text-sm font-medium">
        Close Approach Date
      </label>
      <Input
        id="approach-date"
        type="date"
        defaultValue="2029-04-13"
      />
    </div>
  ),
};

/**
 * Time input type.
 */
export const TimeInput: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <label htmlFor="approach-time" className="text-sm font-medium">
        Approach Time (UTC)
      </label>
      <Input
        id="approach-time"
        type="time"
        defaultValue="21:46"
      />
    </div>
  ),
};

/**
 * URL input type.
 */
export const URLInput: Story = {
  render: () => (
    <div className="w-[400px] space-y-2">
      <label htmlFor="source" className="text-sm font-medium">
        Data Source URL
      </label>
      <Input
        id="source"
        type="url"
        placeholder="https://api.nasa.gov/neo/..."
      />
    </div>
  ),
};
