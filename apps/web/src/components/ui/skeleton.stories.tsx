import type { Meta, StoryObj } from "@storybook/react-vite";

import { Skeleton } from "./skeleton";

const meta = {
  title: "Components/UI/Skeleton",
  component: Skeleton,
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
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic skeleton loader.
 */
export const Default: Story = {
  render: () => <Skeleton className="w-[200px] h-4" />,
};

/**
 * Skeleton for text lines.
 */
export const TextLines: Story = {
  render: () => (
    <div className="space-y-2 w-[300px]">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
};

/**
 * Skeleton for card component.
 */
export const CardSkeleton: Story = {
  render: () => (
    <div className="w-[350px] border-2 rounded-lg p-6 space-y-4">
      <div className="space-y-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-9 w-full" />
    </div>
  ),
};

/**
 * Skeleton for asteroid card.
 */
export const AsteroidCardSkeleton: Story = {
  render: () => (
    <div className="w-[300px] border-2 rounded-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
        </div>
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  ),
};

/**
 * Skeleton for avatar/circle.
 */
export const CircleSkeleton: Story = {
  render: () => <Skeleton className="size-12 rounded-full" />,
};

/**
 * Skeleton with avatar and text.
 */
export const AvatarWithText: Story = {
  render: () => (
    <div className="flex items-center gap-3 w-[300px]">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  ),
};

/**
 * Skeleton for table rows.
 */
export const TableRowSkeleton: Story = {
  render: () => (
    <div className="w-[600px] space-y-2">
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
        <Skeleton className="h-4" />
      </div>
    </div>
  ),
};

/**
 * Skeleton for dashboard stats.
 */
export const DashboardStats: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[500px]">
      <div className="border-2 rounded-lg p-6 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-10 w-16" />
      </div>
      <div className="border-2 rounded-lg p-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-12" />
      </div>
      <div className="border-2 rounded-lg p-6 space-y-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-20" />
      </div>
      <div className="border-2 rounded-lg p-6 space-y-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-10 w-16" />
      </div>
    </div>
  ),
};

/**
 * Skeleton for list items.
 */
export const ListItems: Story = {
  render: () => (
    <div className="w-[400px] space-y-3">
      <div className="flex items-center gap-3 p-3 border rounded-md">
        <Skeleton className="size-10 rounded-md" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 border rounded-md">
        <Skeleton className="size-10 rounded-md" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <div className="flex items-center gap-3 p-3 border rounded-md">
        <Skeleton className="size-10 rounded-md" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-3 w-2/5" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Full page skeleton layout.
 */
export const FullPageLayout: Story = {
  render: () => (
    <div className="w-[800px] space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-4 gap-4">
        <div className="border-2 rounded-lg p-4 space-y-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-8 w-12" />
        </div>
        <div className="border-2 rounded-lg p-4 space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-10" />
        </div>
        <div className="border-2 rounded-lg p-4 space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="border-2 rounded-lg p-4 space-y-2">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-8 w-14" />
        </div>
      </div>

      {/* Main content */}
      <div className="border-2 rounded-lg p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <Skeleton className="h-48 w-full rounded-md" />
      </div>
    </div>
  ),
};

/**
 * Image skeleton.
 */
export const ImageSkeleton: Story = {
  render: () => <Skeleton className="w-[300px] h-[200px] rounded-md" />,
};

/**
 * Button skeleton.
 */
export const ButtonSkeleton: Story = {
  render: () => <Skeleton className="h-9 w-32 rounded-md" />,
};
