import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

describe("Tooltip", () => {
  it("should render tooltip trigger", () => {
    render(
      <Tooltip>
        <TooltipTrigger>Hover me</TooltipTrigger>
        <TooltipContent>Tooltip text</TooltipContent>
      </Tooltip>
    );

    expect(screen.getByText("Hover me")).toBeInTheDocument();
  });

  it("should show tooltip on hover", async () => {
    const user = userEvent.setup();

    render(
      <Tooltip>
        <TooltipTrigger>Hover for info</TooltipTrigger>
        <TooltipContent>Additional information</TooltipContent>
      </Tooltip>
    );

    const trigger = screen.getByText("Hover for info");
    await user.hover(trigger);

    // Tooltip content should be visible after hover (findAllByText since tooltip has accessibility duplicate)
    const tooltips = await screen.findAllByText("Additional information");
    expect(tooltips.length).toBeGreaterThan(0);
  });
});
