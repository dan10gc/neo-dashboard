import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

describe("Tabs", () => {
  it("should render tabs with triggers and content", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content for Tab 1</TabsContent>
        <TabsContent value="tab2">Content for Tab 2</TabsContent>
      </Tabs>
    );

    expect(screen.getByText("Tab 1")).toBeInTheDocument();
    expect(screen.getByText("Tab 2")).toBeInTheDocument();
    expect(screen.getByText("Content for Tab 1")).toBeVisible();
  });

  it("should switch tabs when clicked", async () => {
    const user = userEvent.setup();

    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">First Tab</TabsTrigger>
          <TabsTrigger value="tab2">Second Tab</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">First tab content</TabsContent>
        <TabsContent value="tab2">Second tab content</TabsContent>
      </Tabs>
    );

    // Initially, first tab content is visible
    expect(screen.getByText("First tab content")).toBeVisible();

    // Click on second tab
    await user.click(screen.getByText("Second Tab"));

    // Second tab content should now be visible
    expect(screen.getByText("Second tab content")).toBeVisible();
  });
});
