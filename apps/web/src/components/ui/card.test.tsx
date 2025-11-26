import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MoreVertical } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card", () => {
  it("should render card with children", () => {
    render(<Card>Card content</Card>);

    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<Card data-testid="card">Content</Card>);

    const card = screen.getByTestId("card");
    expect(card).toHaveAttribute("data-slot", "card");
  });

  it("should render with custom className", () => {
    render(<Card className="custom-class">Content</Card>);

    const card = screen.getByText("Content");
    expect(card).toHaveClass("custom-class");
  });

  it("should render as div element", () => {
    render(<Card data-testid="card">Content</Card>);

    const card = screen.getByTestId("card");
    expect(card.tagName).toBe("DIV");
  });
});

describe("CardHeader", () => {
  it("should render card header with children", () => {
    render(<CardHeader>Header content</CardHeader>);

    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<CardHeader data-testid="header">Content</CardHeader>);

    const header = screen.getByTestId("header");
    expect(header).toHaveAttribute("data-slot", "card-header");
  });

  it("should render with custom className", () => {
    render(<CardHeader className="custom-header">Content</CardHeader>);

    const header = screen.getByText("Content");
    expect(header).toHaveClass("custom-header");
  });
});

describe("CardTitle", () => {
  it("should render card title with children", () => {
    render(<CardTitle>Title text</CardTitle>);

    expect(screen.getByText("Title text")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);

    const title = screen.getByTestId("title");
    expect(title).toHaveAttribute("data-slot", "card-title");
  });

  it("should render with custom className", () => {
    render(<CardTitle className="text-2xl">Title</CardTitle>);

    const title = screen.getByText("Title");
    expect(title).toHaveClass("text-2xl");
  });
});

describe("CardDescription", () => {
  it("should render card description with children", () => {
    render(<CardDescription>Description text</CardDescription>);

    expect(screen.getByText("Description text")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>);

    const description = screen.getByTestId("desc");
    expect(description).toHaveAttribute("data-slot", "card-description");
  });

  it("should render with custom className", () => {
    render(<CardDescription className="text-sm">Description</CardDescription>);

    const description = screen.getByText("Description");
    expect(description).toHaveClass("text-sm");
  });
});

describe("CardAction", () => {
  it("should render card action with children", () => {
    render(
      <CardAction>
        <button>Action</button>
      </CardAction>
    );

    expect(screen.getByRole("button", { name: "Action" })).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<CardAction data-testid="action">Action</CardAction>);

    const action = screen.getByTestId("action");
    expect(action).toHaveAttribute("data-slot", "card-action");
  });

  it("should render with custom className", () => {
    render(<CardAction className="custom-action">Action</CardAction>);

    const action = screen.getByText("Action");
    expect(action).toHaveClass("custom-action");
  });
});

describe("CardContent", () => {
  it("should render card content with children", () => {
    render(<CardContent>Main content</CardContent>);

    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<CardContent data-testid="content">Content</CardContent>);

    const content = screen.getByTestId("content");
    expect(content).toHaveAttribute("data-slot", "card-content");
  });

  it("should render with custom className", () => {
    render(<CardContent className="p-8">Content</CardContent>);

    const content = screen.getByText("Content");
    expect(content).toHaveClass("p-8");
  });
});

describe("CardFooter", () => {
  it("should render card footer with children", () => {
    render(<CardFooter>Footer content</CardFooter>);

    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);

    const footer = screen.getByTestId("footer");
    expect(footer).toHaveAttribute("data-slot", "card-footer");
  });

  it("should render with custom className", () => {
    render(<CardFooter className="justify-end">Footer</CardFooter>);

    const footer = screen.getByText("Footer");
    expect(footer).toHaveClass("justify-end");
  });
});

describe("Card composition", () => {
  it("should render complete card with all components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Asteroid Details</CardTitle>
          <CardDescription>View detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <button>View More</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText("Asteroid Details")).toBeInTheDocument();
    expect(screen.getByText("View detailed information")).toBeInTheDocument();
    expect(screen.getByText("Main content goes here")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "View More" })).toBeInTheDocument();
  });

  it("should render card with header and action", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
          <CardDescription>Real-time monitoring</CardDescription>
          <CardAction>
            <button aria-label="More options">
              <MoreVertical />
            </button>
          </CardAction>
        </CardHeader>
      </Card>
    );

    expect(screen.getByText("System Status")).toBeInTheDocument();
    expect(screen.getByText("Real-time monitoring")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "More options" })
    ).toBeInTheDocument();
  });

  it("should render card with only content", () => {
    render(
      <Card>
        <CardContent>
          <div>Content only card</div>
        </CardContent>
      </Card>
    );

    expect(screen.getByText("Content only card")).toBeInTheDocument();
  });

  it("should render card with header and content only", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>47 objects tracked</p>
        </CardContent>
      </Card>
    );

    expect(screen.getByText("Quick Stats")).toBeInTheDocument();
    expect(screen.getByText("47 objects tracked")).toBeInTheDocument();
  });

  it("should render multiple cards", () => {
    render(
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Card 1</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Card 2</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );

    expect(screen.getByText("Card 1")).toBeInTheDocument();
    expect(screen.getByText("Card 2")).toBeInTheDocument();
  });

  it("should render card with complex content structure", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>99942 Apophis</CardTitle>
          <CardDescription>Legendary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <span>Size:</span>
              <span>310-340 meters</span>
            </div>
            <div>
              <span>Close Approach:</span>
              <span>April 13, 2029</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <button>View Trajectory</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText("99942 Apophis")).toBeInTheDocument();
    expect(screen.getByText("Legendary")).toBeInTheDocument();
    expect(screen.getByText("Size:")).toBeInTheDocument();
    expect(screen.getByText("310-340 meters")).toBeInTheDocument();
    expect(screen.getByText("Close Approach:")).toBeInTheDocument();
    expect(screen.getByText("April 13, 2029")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "View Trajectory" })
    ).toBeInTheDocument();
  });

  it("should apply custom border styling", () => {
    render(
      <Card className="border-amber-500/50 bg-amber-500/5">
        <CardContent>Special Event</CardContent>
      </Card>
    );

    const card = screen.getByText("Special Event").parentElement?.parentElement;
    expect(card).toHaveClass("border-amber-500/50");
    expect(card).toHaveClass("bg-amber-500/5");
  });

  it("should preserve additional HTML attributes", () => {
    render(
      <Card data-testid="custom-card" id="asteroid-card">
        <CardContent>Content</CardContent>
      </Card>
    );

    const card = screen.getByTestId("custom-card");
    expect(card).toHaveAttribute("id", "asteroid-card");
  });

  it("should render nested content correctly", () => {
    render(
      <Card>
        <CardContent>
          <div>
            <p>Paragraph 1</p>
            <p>Paragraph 2</p>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );

    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 2")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});
