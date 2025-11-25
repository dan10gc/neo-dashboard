import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrowserRouter } from "react-router";

import type { CloseApproachAssessment as CloseApproachAssessmentData } from "@/lib/transformers/calculateCloseApproachAlert";
import { PROXIMITY_THRESHOLDS } from "@/lib/transformers/calculateCloseApproachAlert";

import { CloseApproachAssessment } from "./close-approach-assessment";

const meta = {
  title: "Features/Dashboard/Close Approach Alert",
  component: CloseApproachAssessment,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof CloseApproachAssessment>;

export default meta;
type Story = StoryObj<typeof meta>;

// Define alert levels as constants to match the transformer
type CloseApproachLevel = "ROUTINE" | "TRACKED" | "NOTABLE" | "NOTEWORTHY";

// Helper function to create mock Close Approach Alert assessment
// Uses new 0-5 scoring based purely on proximity
function createMockAssessment(
  totalHazardous: number,
  totalAsteroids: number,
  closestDistance: number // Closest PHA approach in AU
): CloseApproachAssessmentData {
  const hazardPercentage = totalAsteroids > 0 ? (totalHazardous / totalAsteroids) * 100 : 0;

  // Calculate alert score (0-5 scale) based on proximity only
  let alertLevel: CloseApproachLevel = "ROUTINE";
  let alertScore = 0;

  if (closestDistance === 0) {
    alertLevel = "ROUTINE";
    alertScore = 0;
  } else {
    // Use PROXIMITY_THRESHOLDS to determine alert level and score
    const threshold = PROXIMITY_THRESHOLDS.find(t => closestDistance <= t.maxAU);
    alertLevel = (threshold?.level ?? "ROUTINE") as CloseApproachLevel;
    alertScore = threshold?.score ?? 1;
  }

  return {
    totalScore: alertScore,
    closeApproachLevel: alertLevel,
    conditionLevel: alertScore,
    factors: [
      {
        name: "Proximity",
        score: alertScore,
        weight: 1.0,
        displayValue: closestDistance > 0
          ? `${closestDistance.toFixed(3)} AU (~${(closestDistance * 149.6).toFixed(1)}M km)`
          : 'No PHAs',
        description: closestDistance > 0
          ? `Closest PHA approach is ${closestDistance.toFixed(3)} Astronomical Units from Earth`
          : `No potentially hazardous asteroids detected in this time period`,
      },
    ],
    totalAsteroids,
    totalHazardous,
    hazardPercentage,
  };
}

// Alert Score 5 - NOTEWORTHY (Extremely close)
export const Score5_ExtremelyClose: Story = {
  args: {
    assessment: createMockAssessment(8, 50, 0.001),
  },
};

// Alert Score 4 - NOTEWORTHY (Very close)
export const Score4_VeryClose: Story = {
  args: {
    assessment: createMockAssessment(12, 100, 0.008),
  },
};

// Alert Score 3 - NOTABLE (Within NASA threshold)
export const Score3_Notable: Story = {
  args: {
    assessment: createMockAssessment(17, 100, 0.04),
  },
};

// Alert Score 2 - TRACKED (Beyond threshold)
export const Score2_Tracked: Story = {
  args: {
    assessment: createMockAssessment(7, 100, 0.089),
  },
};

// Alert Score 1 - ROUTINE (Distant)
export const Score1_Routine: Story = {
  args: {
    assessment: createMockAssessment(3, 100, 0.25),
  },
};

// Alert Score 0 - No PHAs
export const Score0_NoPHAs: Story = {
  args: {
    assessment: createMockAssessment(0, 150, 0),
  },
};

// Real-world scenario: High activity week
export const HighActivityWeek: Story = {
  args: {
    assessment: createMockAssessment(42, 245, 0.022),
  },
};

// Real-world scenario: Typical week
export const TypicalWeek: Story = {
  args: {
    assessment: createMockAssessment(18, 156, 0.095),
  },
};

// Real-world scenario: Quiet week
export const QuietWeek: Story = {
  args: {
    assessment: createMockAssessment(2, 78, 0.18),
  },
};

export const Default: Story = Score2_Tracked;
