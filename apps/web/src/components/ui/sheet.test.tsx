import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

describe("Sheet", () => {
  it("should render sheet with trigger", () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    expect(screen.getByText("Open Sheet")).toBeInTheDocument();
  });

  it("should open sheet when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Sheet>
        <SheetTrigger>Click to open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Side Panel</SheetTitle>
            <SheetDescription>This is a side sheet.</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    );

    const trigger = screen.getByText("Click to open");
    await user.click(trigger);

    // Sheet content should be visible
    expect(screen.getByText("Side Panel")).toBeInTheDocument();
    expect(screen.getByText("This is a side sheet.")).toBeInTheDocument();
  });
});
