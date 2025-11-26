import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Calendar } from "./calendar";

const meta = {
  title: "Components/UI/Calendar",
  component: Calendar,
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
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default calendar with single date selection.
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar with date range selection for tracking approach windows.
 */
export const RangeSelection: Story = {
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({
      from: new Date(2025, 0, 1),
      to: new Date(2025, 0, 7),
    });
    return (
      <Calendar
        mode="range"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        selected={range}
        onSelect={setRange}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar with multiple date selection.
 */
export const MultipleSelection: Story = {
  render: () => {
    const [dates, setDates] = useState<Date[] | undefined>([
      new Date(2025, 0, 5),
      new Date(2025, 0, 12),
      new Date(2025, 0, 20),
    ]);
    return (
      <Calendar
        mode="multiple"
        selected={dates}
        onSelect={setDates}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar with dropdown navigation for month and year.
 */
export const WithDropdowns: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        fromYear={2020}
        toYear={2030}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar with week numbers displayed.
 */
export const WithWeekNumbers: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showWeekNumber
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar with disabled dates (e.g., past dates).
 */
export const DisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={{ before: new Date() }}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar showing multiple months for viewing longer tracking periods.
 */
export const MultipleMonths: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        numberOfMonths={2}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar with specific dates highlighted (e.g., close approach dates).
 */
export const HighlightedDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const approachDates = [
      new Date(2025, 0, 5),
      new Date(2025, 0, 13),
      new Date(2025, 0, 21),
      new Date(2025, 0, 28),
    ];

    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        modifiers={{
          approach: approachDates,
        }}
        modifiersClassNames={{
          approach: "bg-amber-500/20 text-amber-400 font-bold",
        }}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar without outside days shown.
 */
export const NoOutsideDays: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        showOutsideDays={false}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar with a specific month/year set (e.g., for Apophis approach in 2029).
 */
export const SpecificDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(
      new Date(2029, 3, 13) // April 13, 2029 - Apophis close approach
    );
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        defaultMonth={new Date(2029, 3, 1)}
        className="rounded-md border"
      />
    );
  },
};

/**
 * Calendar with outline button variant for navigation.
 */
export const OutlineButtons: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        buttonVariant="outline"
        className="rounded-md border"
      />
    );
  },
};

/**
 * Compact calendar for space-constrained layouts.
 */
export const Compact: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border scale-90"
      />
    );
  },
};
