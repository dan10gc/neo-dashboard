import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Info, Plus, Settings } from "lucide-react";

import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

const meta = {
  title: "Components/UI/Tooltip",
  component: Tooltip,
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
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic tooltip on a button.
 */
export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add asteroid to tracking list</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip on an icon button.
 */
export const OnIconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Plus />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add new asteroid</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip with longer text.
 */
export const LongText: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost">
          <Info />
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[250px]">
        <p>
          This asteroid is classified as potentially hazardous due to its size
          and close approach distance to Earth.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip on text element.
 */
export const OnText: Story = {
  render: () => (
    <div className="p-4">
      <p className="text-sm">
        The asteroid{" "}
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="font-semibold underline decoration-dotted cursor-help">
              99942 Apophis
            </span>
          </TooltipTrigger>
          <TooltipContent>
            <p>Close approach: April 13, 2029</p>
          </TooltipContent>
        </Tooltip>{" "}
        will make a historic close pass to Earth.
      </p>
    </div>
  ),
};

/**
 * Multiple tooltips.
 */
export const Multiple: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add asteroid</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Settings />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Settings</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <Info />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Information</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon">
            <AlertTriangle />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Warnings</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Tooltip with side offset.
 */
export const WithOffset: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button>Hover me</Button>
      </TooltipTrigger>
      <TooltipContent sideOffset={10}>
        <p>Tooltip with more spacing</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip on disabled button.
 */
export const OnDisabledButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* Wrap disabled button in a span to allow tooltip to work */}
        <span>
          <Button disabled>Disabled Action</Button>
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>This action is currently unavailable</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip with technical details.
 */
export const TechnicalDetails: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">99942 Apophis</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px]">
        <div className="space-y-1">
          <p className="font-semibold">99942 Apophis</p>
          <p className="text-xs">Size: 310-340 meters</p>
          <p className="text-xs">Close Approach: April 13, 2029</p>
          <p className="text-xs">Miss Distance: 31,600 km</p>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip on table header for column description.
 */
export const TableHeader: Story = {
  render: () => (
    <div className="border rounded-md">
      <table className="w-full">
        <thead className="border-b">
          <tr>
            <th className="p-3 text-left text-sm font-medium">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help underline decoration-dotted">
                    Miss Distance
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>The closest distance the asteroid will pass to Earth</p>
                </TooltipContent>
              </Tooltip>
            </th>
            <th className="p-3 text-left text-sm font-medium">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help underline decoration-dotted">
                    Absolute Magnitude
                  </span>
                </TooltipTrigger>
                <TooltipContent className="max-w-[250px]">
                  <p>
                    The brightness of the asteroid as seen from a standard
                    distance. Lower values indicate brighter/larger objects.
                  </p>
                </TooltipContent>
              </Tooltip>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  ),
};

/**
 * Tooltip with keyboard shortcut.
 */
export const WithShortcut: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <div className="flex items-center gap-2">
          <span>Add new asteroid</span>
          <kbd className="px-1.5 py-0.5 text-xs border rounded bg-muted">
            Ctrl+N
          </kbd>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Compact tooltip for icons.
 */
export const Compact: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <AlertTriangle className="text-amber-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Hazardous</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <Info className="text-blue-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Details</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/**
 * Tooltip on custom element.
 */
export const OnCustomElement: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer hover:bg-accent">
          <AlertTriangle className="size-4 text-amber-500" />
          <span className="text-sm">Potentially Hazardous</span>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>This asteroid meets the criteria for potentially hazardous objects</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/**
 * Tooltip in a data grid.
 */
export const InDataGrid: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[400px]">
      <div className="border rounded-lg p-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <p className="text-xs text-muted-foreground">Total Objects</p>
              <p className="text-3xl font-bold">47</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Total near-Earth objects currently tracked</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="border rounded-lg p-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-help">
              <p className="text-xs text-muted-foreground">Hazardous</p>
              <p className="text-3xl font-bold text-destructive">12</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Objects classified as potentially hazardous</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  ),
};

/**
 * Tooltip with rich content.
 */
export const RichContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Close Approach Data</Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[300px]">
        <div className="space-y-2">
          <p className="font-semibold text-sm">What is Close Approach?</p>
          <p className="text-xs">
            The date and time when an asteroid makes its closest pass to Earth.
            Close approach data includes:
          </p>
          <ul className="text-xs list-disc pl-4 space-y-1">
            <li>Miss distance (how close it gets)</li>
            <li>Relative velocity</li>
            <li>Date and time (UTC)</li>
          </ul>
        </div>
      </TooltipContent>
    </Tooltip>
  ),
};
