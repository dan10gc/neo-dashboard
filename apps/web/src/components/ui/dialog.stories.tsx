import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle, Copy, Rocket } from "lucide-react";

import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";

const meta = {
  title: "Components/UI/Dialog",
  component: Dialog,
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
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Basic dialog with trigger button.
 */
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Asteroid Details</DialogTitle>
          <DialogDescription>
            View detailed information about this near-Earth object.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm">
            This dialog contains information about the selected asteroid
            including its orbital parameters, physical characteristics, and
            close approach data.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with form input fields.
 */
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Asteroid</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Track New Asteroid</DialogTitle>
          <DialogDescription>
            Enter the asteroid designation to add it to your monitoring list.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label htmlFor="designation" className="text-sm font-medium">
              Designation
            </label>
            <Input id="designation" placeholder="e.g., 99942 Apophis" />
          </div>
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (optional)
            </label>
            <Input id="notes" placeholder="Add tracking notes..." />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Add to List</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Confirmation dialog with destructive action.
 */
export const Confirmation: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            asteroid tracking data from your monitoring list.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive">Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with warning icon.
 */
export const WithWarningIcon: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Show Warning</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-amber-500" />
            <DialogTitle>Potentially Hazardous Object</DialogTitle>
          </div>
          <DialogDescription>
            This asteroid is classified as potentially hazardous due to its
            size and close approach distance.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Size:</span>
            <span className="font-medium">310-340 meters</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Miss Distance:</span>
            <span className="font-medium">31,600 km</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Approach Date:</span>
            <span className="font-medium">April 13, 2029</span>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Understood</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with custom content and no close button.
 */
export const NoCloseButton: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Launch Mission</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Rocket className="size-5 text-primary" />
            <DialogTitle>Mission Launch</DialogTitle>
          </div>
          <DialogDescription>
            Are you ready to initiate the asteroid deflection mission?
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            This will deploy the spacecraft toward the target asteroid. The
            mission cannot be aborted once initiated.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Abort</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>
              <Rocket />
              Launch
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with copy-to-clipboard functionality.
 */
export const CopyToClipboard: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share Tracking Data</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Tracking Link</DialogTitle>
          <DialogDescription>
            Anyone with this link can view the asteroid tracking data.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 py-4">
          <Input
            readOnly
            value="https://neomonitor.app/track/99942-apophis"
            className="flex-1"
          />
          <Button size="icon" variant="outline">
            <Copy />
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Done</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Dialog with long scrolling content.
 */
export const LongContent: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Details</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Asteroid Classification System</DialogTitle>
          <DialogDescription>
            Understanding how near-Earth objects are categorized.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h4 className="font-semibold mb-2">Atira (IEO)</h4>
            <p className="text-sm text-muted-foreground">
              Asteroids whose orbits are entirely within Earth's orbit. These
              are also called Interior Earth Objects (IEOs). They have a
              semi-major axis of less than 1.0 AU and an aphelion less than
              0.983 AU.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Aten</h4>
            <p className="text-sm text-muted-foreground">
              Earth-crossing asteroids with a semi-major axis less than 1.0 AU
              and a perihelion greater than 0.983 AU. Named after asteroid 2062
              Aten. These asteroids spend most of their time inside Earth's
              orbit.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Apollo</h4>
            <p className="text-sm text-muted-foreground">
              Earth-crossing asteroids with a semi-major axis greater than 1.0
              AU and a perihelion less than 1.017 AU. Named after asteroid 1862
              Apollo. This is the largest group of NEOs and includes many
              potentially hazardous asteroids.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Amor</h4>
            <p className="text-sm text-muted-foreground">
              Near-Earth asteroids with orbits that approach Earth from beyond
              but do not cross it. They have a perihelion between 1.017 and 1.3
              AU. Named after asteroid 1221 Amor.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              Potentially Hazardous Asteroids (PHAs)
            </h4>
            <p className="text-sm text-muted-foreground">
              A subset of NEOs that meet specific criteria: they are larger
              than approximately 140 meters and their orbits bring them within
              0.05 AU (7.5 million km) of Earth's orbit. PHAs require careful
              monitoring due to their potential to cause significant regional
              damage in the event of an impact.
            </p>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Small dialog with minimal content.
 */
export const Compact: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Quick Info
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>System Update</DialogTitle>
        </DialogHeader>
        <p className="text-sm py-2">
          Tracking data has been updated with the latest information from
          NASA's NeoWs API.
        </p>
        <DialogFooter>
          <DialogClose asChild>
            <Button size="sm">OK</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

/**
 * Wide dialog for displaying tables or charts.
 */
export const WideDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>View Data Table</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Upcoming Close Approaches</DialogTitle>
          <DialogDescription>
            All asteroids approaching Earth in the next 7 days.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="border rounded-md">
            <table className="w-full text-sm">
              <thead className="border-b">
                <tr>
                  <th className="text-left p-2">Designation</th>
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Distance</th>
                  <th className="text-left p-2">Size</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">2024 ZX</td>
                  <td className="p-2">2025-01-15</td>
                  <td className="p-2">0.25 AU</td>
                  <td className="p-2">15-35m</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">2024 AB</td>
                  <td className="p-2">2025-01-18</td>
                  <td className="p-2">15 LD</td>
                  <td className="p-2">45-100m</td>
                </tr>
                <tr>
                  <td className="p-2">2020 CD3</td>
                  <td className="p-2">2025-01-20</td>
                  <td className="p-2">0.05 AU</td>
                  <td className="p-2">2-3.5m</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Export CSV</Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
