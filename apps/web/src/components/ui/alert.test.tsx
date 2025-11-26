import { render, screen } from "@testing-library/react";
import { AlertCircle } from "lucide-react";
import { describe, expect, it } from "vitest";

import { Alert, AlertDescription, AlertTitle } from "./alert";

describe("Alert", () => {
  it("should render alert with title and description", () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>This is an alert description.</AlertDescription>
      </Alert>
    );

    expect(screen.getByText("Alert Title")).toBeInTheDocument();
    expect(screen.getByText("This is an alert description.")).toBeInTheDocument();
  });

  it("should apply destructive variant", () => {
    render(
      <Alert variant="destructive">
        <AlertCircle />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Something went wrong.</AlertDescription>
      </Alert>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
  });
});
