import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle } from "lucide-react";

import { Badge } from "./badge";
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

const meta = {
  title: "Components/UI/Table",
  component: Table,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "#18181b" },
        { name: "light", value: "#ffffff" },
      ],
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic asteroid tracking table.
 */
export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Designation</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Velocity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">99942 Apophis</TableCell>
          <TableCell>2029-04-13</TableCell>
          <TableCell>31,600 km</TableCell>
          <TableCell>310-340 m</TableCell>
          <TableCell>30.73 km/s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">101955 Bennu</TableCell>
          <TableCell>2135-09-25</TableCell>
          <TableCell>7.5 LD</TableCell>
          <TableCell>492-510 m</TableCell>
          <TableCell>27.74 km/s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">16 Psyche</TableCell>
          <TableCell>2025-12-15</TableCell>
          <TableCell>2.8 AU</TableCell>
          <TableCell>200-226 km</TableCell>
          <TableCell>22.5 km/s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">2019 OK</TableCell>
          <TableCell>2019-07-25</TableCell>
          <TableCell>72,368 km</TableCell>
          <TableCell>57-130 m</TableCell>
          <TableCell>24.5 km/s</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">2024 ZX</TableCell>
          <TableCell>2025-11-10</TableCell>
          <TableCell>0.25 AU</TableCell>
          <TableCell>15-35 m</TableCell>
          <TableCell>18.2 km/s</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Table with caption.
 */
export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>Upcoming close approaches (next 7 days)</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Designation</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2024 ZX</TableCell>
          <TableCell>2025-01-15</TableCell>
          <TableCell>0.25 AU</TableCell>
          <TableCell>15-35 m</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024 AB</TableCell>
          <TableCell>2025-01-18</TableCell>
          <TableCell>15 LD</TableCell>
          <TableCell>45-100 m</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2020 CD3</TableCell>
          <TableCell>2025-01-20</TableCell>
          <TableCell>0.05 AU</TableCell>
          <TableCell>2-3.5 m</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Table with footer row.
 */
export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Size Category</TableHead>
          <TableHead className="text-right">Count</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Small (&lt; 50m)</TableCell>
          <TableCell className="text-right">23</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Medium (50-140m)</TableCell>
          <TableCell className="text-right">15</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Large (140-1000m)</TableCell>
          <TableCell className="text-right">7</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Very Large (&gt; 1km)</TableCell>
          <TableCell className="text-right">2</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right font-bold">47</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

/**
 * Table with badges and icons.
 */
export const WithBadgesAndIcons: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Designation</TableHead>
          <TableHead>Rarity</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Distance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-500" />
            99942 Apophis
          </TableCell>
          <TableCell>
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/50">
              Legendary
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant="destructive">Hazardous</Badge>
          </TableCell>
          <TableCell>31,600 km</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-500" />
            101955 Bennu
          </TableCell>
          <TableCell>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
              Epic
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant="destructive">Hazardous</Badge>
          </TableCell>
          <TableCell>7.5 LD</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>16 Psyche</TableCell>
          <TableCell>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50">
              Rare
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant="secondary">Safe</Badge>
          </TableCell>
          <TableCell>2.8 AU</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2019 OK</TableCell>
          <TableCell>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
              Uncommon
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant="secondary">Safe</Badge>
          </TableCell>
          <TableCell>72,368 km</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2024 ZX</TableCell>
          <TableCell>
            <Badge variant="secondary">Common</Badge>
          </TableCell>
          <TableCell>
            <Badge variant="secondary">Safe</Badge>
          </TableCell>
          <TableCell>0.25 AU</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Compact table with minimal data.
 */
export const Compact: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Distance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Apophis</TableCell>
          <TableCell>2029-04-13</TableCell>
          <TableCell>31,600 km</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bennu</TableCell>
          <TableCell>2135-09-25</TableCell>
          <TableCell>7.5 LD</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Psyche</TableCell>
          <TableCell>2025-12-15</TableCell>
          <TableCell>2.8 AU</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Wide table with many columns.
 */
export const WideTable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Designation</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>Size (min)</TableHead>
          <TableHead>Size (max)</TableHead>
          <TableHead>Velocity</TableHead>
          <TableHead>Magnitude</TableHead>
          <TableHead>Hazardous</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>99942</TableCell>
          <TableCell>Apophis</TableCell>
          <TableCell>2029-04-13</TableCell>
          <TableCell>31,600 km</TableCell>
          <TableCell>310 m</TableCell>
          <TableCell>340 m</TableCell>
          <TableCell>30.73 km/s</TableCell>
          <TableCell>19.7</TableCell>
          <TableCell>Yes</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>101955</TableCell>
          <TableCell>Bennu</TableCell>
          <TableCell>2135-09-25</TableCell>
          <TableCell>7.5 LD</TableCell>
          <TableCell>492 m</TableCell>
          <TableCell>510 m</TableCell>
          <TableCell>27.74 km/s</TableCell>
          <TableCell>20.9</TableCell>
          <TableCell>Yes</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>16</TableCell>
          <TableCell>Psyche</TableCell>
          <TableCell>2025-12-15</TableCell>
          <TableCell>2.8 AU</TableCell>
          <TableCell>200 km</TableCell>
          <TableCell>226 km</TableCell>
          <TableCell>22.5 km/s</TableCell>
          <TableCell>5.9</TableCell>
          <TableCell>No</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Table with long scrolling list.
 */
export const LongList: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Designation</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 50 }, (_, i) => (
          <TableRow key={i}>
            <TableCell>
              {2000 + i} {String.fromCharCode(65 + (i % 26))}
              {String.fromCharCode(65 + ((i + 1) % 26))}
            </TableCell>
            <TableCell>2025-{String(1 + (i % 12)).padStart(2, "0")}-{String(1 + (i % 28)).padStart(2, "0")}</TableCell>
            <TableCell>{(0.1 + i * 0.01).toFixed(2)} AU</TableCell>
            <TableCell>{10 + i * 5}-{20 + i * 5} m</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/**
 * Empty table state.
 */
export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Designation</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Distance</TableHead>
          <TableHead>Size</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
            No asteroids found in the current observation window
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/**
 * Table with selectable rows.
 */
export const Selectable: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <input type="checkbox" />
          </TableHead>
          <TableHead>Designation</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Distance</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <input type="checkbox" />
          </TableCell>
          <TableCell>99942 Apophis</TableCell>
          <TableCell>2029-04-13</TableCell>
          <TableCell>31,600 km</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>
            <input type="checkbox" defaultChecked />
          </TableCell>
          <TableCell>101955 Bennu</TableCell>
          <TableCell>2135-09-25</TableCell>
          <TableCell>7.5 LD</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <input type="checkbox" />
          </TableCell>
          <TableCell>16 Psyche</TableCell>
          <TableCell>2025-12-15</TableCell>
          <TableCell>2.8 AU</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
