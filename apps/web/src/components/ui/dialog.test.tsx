import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

describe("Dialog", () => {
  it("should render dialog with trigger", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>Dialog description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    expect(screen.getByText("Open Dialog")).toBeInTheDocument();
  });

  it("should open dialog when trigger is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Dialog>
        <DialogTrigger>Click to open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modal Title</DialogTitle>
            <DialogDescription>This is a modal dialog.</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );

    const trigger = screen.getByText("Click to open");
    await user.click(trigger);

    // Dialog content should be visible
    expect(screen.getByText("Modal Title")).toBeInTheDocument();
    expect(screen.getByText("This is a modal dialog.")).toBeInTheDocument();
  });
});
