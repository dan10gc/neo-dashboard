import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Input } from "./input";

describe("Input", () => {
  it("should render input with placeholder", () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
  });

  it("should handle user input", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<Input placeholder="Type here" onChange={handleChange} />);

    const input = screen.getByPlaceholderText("Type here");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
    expect(handleChange).toHaveBeenCalled();
  });
});
