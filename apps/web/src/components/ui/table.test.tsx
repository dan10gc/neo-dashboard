import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

describe("Table", () => {
  it("should render table with children", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute to table", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole("table");
    expect(table).toHaveAttribute("data-slot", "table");
  });

  it("should apply data-slot attribute to table container", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const tableContainer = container.querySelector('[data-slot="table-container"]');
    expect(tableContainer).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    render(
      <Table className="custom-table">
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole("table");
    expect(table).toHaveClass("custom-table");
  });
});

describe("TableHeader", () => {
  it("should render table header", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    const thead = container.querySelector('[data-slot="table-header"]');
    expect(thead).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(
      <Table>
        <TableHeader className="custom-header">
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    const thead = container.querySelector('[data-slot="table-header"]');
    expect(thead).toHaveClass("custom-header");
  });
});

describe("TableBody", () => {
  it("should render table body", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Body content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Body content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const tbody = container.querySelector('[data-slot="table-body"]');
    expect(tbody).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(
      <Table>
        <TableBody className="custom-body">
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const tbody = container.querySelector('[data-slot="table-body"]');
    expect(tbody).toHaveClass("custom-body");
  });
});

describe("TableFooter", () => {
  it("should render table footer", () => {
    render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell>Footer content</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByText("Footer content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    const { container } = render(
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const tfoot = container.querySelector('[data-slot="table-footer"]');
    expect(tfoot).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(
      <Table>
        <TableFooter className="custom-footer">
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    const tfoot = container.querySelector('[data-slot="table-footer"]');
    expect(tfoot).toHaveClass("custom-footer");
  });
});

describe("TableRow", () => {
  it("should render table row", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Row content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Row content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const row = container.querySelector('[data-slot="table-row"]');
    expect(row).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow className="custom-row">
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const row = container.querySelector('[data-slot="table-row"]');
    expect(row).toHaveClass("custom-row");
  });

  it("should support data-state attribute for selected state", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow data-state="selected">
            <TableCell>Selected row</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const row = container.querySelector('[data-state="selected"]');
    expect(row).toBeInTheDocument();
  });
});

describe("TableHead", () => {
  it("should render table head cell", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Designation</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    expect(screen.getByText("Designation")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    const th = container.querySelector('[data-slot="table-head"]');
    expect(th).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-right">Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    );

    const th = container.querySelector('[data-slot="table-head"]');
    expect(th).toHaveClass("text-right");
  });
});

describe("TableCell", () => {
  it("should render table cell", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Cell content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Cell content")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const td = container.querySelector('[data-slot="table-cell"]');
    expect(td).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-bold">Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const td = container.querySelector('[data-slot="table-cell"]');
    expect(td).toHaveClass("font-bold");
  });

  it("should support colSpan attribute", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3}>Spanning cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const td = container.querySelector('[data-slot="table-cell"]');
    expect(td).toHaveAttribute("colspan", "3");
  });
});

describe("TableCaption", () => {
  it("should render table caption", () => {
    render(
      <Table>
        <TableCaption>Upcoming close approaches</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Upcoming close approaches")).toBeInTheDocument();
  });

  it("should apply data-slot attribute", () => {
    const { container } = render(
      <Table>
        <TableCaption>Caption text</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const caption = container.querySelector('[data-slot="table-caption"]');
    expect(caption).toBeInTheDocument();
  });

  it("should render with custom className", () => {
    const { container } = render(
      <Table>
        <TableCaption className="text-lg">Caption</TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Content</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const caption = container.querySelector('[data-slot="table-caption"]');
    expect(caption).toHaveClass("text-lg");
  });
});

describe("Table composition", () => {
  it("should render complete table with all components", () => {
    render(
      <Table>
        <TableCaption>Asteroid tracking data</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Designation</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Distance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>99942 Apophis</TableCell>
            <TableCell>2029-04-13</TableCell>
            <TableCell>31,600 km</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>101955 Bennu</TableCell>
            <TableCell>2135-09-25</TableCell>
            <TableCell>7.5 LD</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByText("Asteroid tracking data")).toBeInTheDocument();
    expect(screen.getByText("Designation")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Distance")).toBeInTheDocument();
    expect(screen.getByText("99942 Apophis")).toBeInTheDocument();
    expect(screen.getByText("2029-04-13")).toBeInTheDocument();
    expect(screen.getByText("31,600 km")).toBeInTheDocument();
    expect(screen.getByText("101955 Bennu")).toBeInTheDocument();
    expect(screen.getByText("2135-09-25")).toBeInTheDocument();
    expect(screen.getByText("7.5 LD")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
  });

  it("should render table with multiple rows", () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Row 1</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 2</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Row 3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Row 1")).toBeInTheDocument();
    expect(screen.getByText("Row 2")).toBeInTheDocument();
    expect(screen.getByText("Row 3")).toBeInTheDocument();
  });

  it("should render table with multiple columns", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Col 1</TableHead>
            <TableHead>Col 2</TableHead>
            <TableHead>Col 3</TableHead>
            <TableHead>Col 4</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>A</TableCell>
            <TableCell>B</TableCell>
            <TableCell>C</TableCell>
            <TableCell>D</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Col 1")).toBeInTheDocument();
    expect(screen.getByText("Col 2")).toBeInTheDocument();
    expect(screen.getByText("Col 3")).toBeInTheDocument();
    expect(screen.getByText("Col 4")).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("should render empty state message", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Designation</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              No asteroids found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("No asteroids found")).toBeInTheDocument();
    expect(screen.getByText("No asteroids found")).toHaveClass("text-center");
  });

  it("should support row selection state", () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Unselected row</TableCell>
          </TableRow>
          <TableRow data-state="selected">
            <TableCell>Selected row</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const selectedRow = container.querySelector('[data-state="selected"]');
    expect(selectedRow).toBeInTheDocument();
    expect(selectedRow).toHaveTextContent("Selected row");
  });

  it("should render table with checkboxes", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <input type="checkbox" aria-label="Select all" />
            </TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <input type="checkbox" aria-label="Select row" />
            </TableCell>
            <TableCell>Apophis</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const selectAll = screen.getByLabelText("Select all");
    const selectRow = screen.getByLabelText("Select row");

    expect(selectAll).toBeInTheDocument();
    expect(selectRow).toBeInTheDocument();
    expect(screen.getByText("Apophis")).toBeInTheDocument();
  });
});
