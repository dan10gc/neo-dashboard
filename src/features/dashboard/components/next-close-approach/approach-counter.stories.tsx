import type { Meta, StoryObj } from "@storybook/react-vite";
import { ApproachCounter } from "./approach-counter";

const meta = {
  title: "Features/Dashboard/NextCloseApproach/ApproachCounter",
  component: ApproachCounter,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
} satisfies Meta<typeof ApproachCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isPast: false,
    epochDate: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days from now
  },
};

export const PastApproach: Story = {
  args: {
    isPast: true,
    epochDate: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
  },
};