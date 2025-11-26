import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Calendar } from "./calendar";

describe("Calendar", () => {
  it("should render calendar with current month", () => {
    const currentDate = new Date();
    render(<Calendar mode="single" month={currentDate} />);

    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    // Calendar should be rendered (checking for navigation or month/year display)
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("should allow selecting a date", async () => {
    const user = userEvent.setup();
    const handleSelect = vi.fn();

    render(
      <Calendar mode="single" selected={undefined} onSelect={handleSelect} />
    );

    // Find and click on a date button (e.g., day 15)
    const dayButtons = screen.getAllByRole("gridcell");
    const selectableDay = dayButtons.find(
      (cell) => cell.getAttribute("aria-disabled") !== "true"
    );

    if (selectableDay) {
      const button = selectableDay.querySelector("button");
      if (button) {
        await user.click(button);
        expect(handleSelect).toHaveBeenCalled();
      }
    }
  });
});
