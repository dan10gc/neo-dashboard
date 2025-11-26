import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";

describe("Popover", () => {
  it("should render popover with trigger", () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover content here</PopoverContent>
      </Popover>
    );

    expect(screen.getByText("Open Popover")).toBeInTheDocument();
  });

  it("should show popover content when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Popover>
        <PopoverTrigger>Click me</PopoverTrigger>
        <PopoverContent>This is popover content</PopoverContent>
      </Popover>
    );

    const trigger = screen.getByText("Click me");
    await user.click(trigger);

    // Popover content should be visible
    expect(screen.getByText("This is popover content")).toBeInTheDocument();
  });
});
