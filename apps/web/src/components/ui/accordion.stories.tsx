import type { Meta } from "@storybook/react-vite";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

const meta = {
  title: "Components/UI/Accordion",
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
} satisfies Meta;

export default meta;

/**
 * Single accordion item that can be expanded or collapsed.
 */
export const Single = {
  render: () => (
    <div className="w-[400px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is a Near-Earth Object?</AccordionTrigger>
          <AccordionContent>
            A Near-Earth Object (NEO) is an asteroid or comet whose orbit brings
            it within 1.3 astronomical units (AU) of the Sun, and therefore
            within 0.3 AU of Earth's orbit.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Multiple accordion items where only one can be open at a time.
 */
export const SingleCollapsible = {
  render: () => (
    <div className="w-[400px]">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>What is NASA's NeoWs API?</AccordionTrigger>
          <AccordionContent>
            NeoWs (Near Earth Object Web Service) is a RESTful web service for
            near earth asteroid information. It provides access to data on
            asteroids that approach Earth's orbit.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            How often do asteroids pass Earth?
          </AccordionTrigger>
          <AccordionContent>
            Small asteroids pass between Earth and the Moon's orbit several
            times per week. Larger asteroids pass by less frequently, with
            city-killer sized asteroids passing within a lunar distance roughly
            once or twice per year.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What makes an asteroid "potentially hazardous"?
          </AccordionTrigger>
          <AccordionContent>
            An asteroid is classified as potentially hazardous if it is larger
            than about 140 meters and its orbit brings it within 7.5 million
            kilometers (0.05 AU) of Earth's orbit. This doesn't mean it will hit
            Earth, just that it's large enough and close enough to warrant
            careful monitoring.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Multiple accordion items where several can be open at the same time.
 */
export const Multiple = {
  render: () => (
    <div className="w-[400px]">
      <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger>Apophis (2029)</AccordionTrigger>
          <AccordionContent>
            On April 13, 2029, asteroid Apophis will pass within 31,600 km of
            Earth's surface - closer than some satellites! It will be visible to
            the naked eye as it streaks across the sky.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Bennu (2135)</AccordionTrigger>
          <AccordionContent>
            Bennu is a carbon-rich asteroid that was studied by NASA's
            OSIRIS-REx mission. It has a 1 in 2,700 chance of impacting Earth
            between 2175 and 2199, making it one of the most potentially
            hazardous known asteroids.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            Didymos & Dimorphos (DART Mission)
          </AccordionTrigger>
          <AccordionContent>
            In 2022, NASA's DART spacecraft intentionally crashed into
            Dimorphos, the moonlet of asteroid Didymos, successfully
            demonstrating planetary defense technology by altering the
            asteroid's orbit.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Accordion with long content to demonstrate scrolling behavior.
 */
export const LongContent = {
  render: () => (
    <div className="w-[400px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Asteroid Size Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <p>
                <strong>Small:</strong> Less than 25 meters - Burns up in
                atmosphere, causes airburst
              </p>
              <p>
                <strong>Medium:</strong> 25-140 meters - Can cause regional
                damage (like Tunguska event)
              </p>
              <p>
                <strong>Large:</strong> 140-1000 meters - Can cause continental
                damage and global climate effects
              </p>
              <p>
                <strong>Very Large:</strong> Greater than 1 km - Can cause
                global catastrophe and mass extinction
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Disabled accordion item.
 */
export const Disabled = {
  render: () => (
    <div className="w-[400px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Available Information</AccordionTrigger>
          <AccordionContent>
            This section contains information about currently tracked asteroids.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" disabled>
          <AccordionTrigger>Restricted Data</AccordionTrigger>
          <AccordionContent>
            This section is currently unavailable.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Public Reports</AccordionTrigger>
          <AccordionContent>
            Access publicly available asteroid tracking reports and statistics.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

/**
 * Compact accordion with minimal content.
 */
export const Compact = {
  render: () => (
    <div className="w-[350px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>2024 ZX</AccordionTrigger>
          <AccordionContent>Size: 15-35m | Distance: 0.25 AU</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>2024 AB</AccordionTrigger>
          <AccordionContent>Size: 45-100m | Distance: 15 LD</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>2020 CD3</AccordionTrigger>
          <AccordionContent>Size: 2-3.5m | Distance: 0.05 AU</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
};
