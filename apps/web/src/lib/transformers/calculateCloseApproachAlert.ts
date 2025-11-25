import type { NeoFeedResponse } from "@/types/neo";

import {
  getTotalAsteroids,
  getTotalHazardousAsteroids,
} from "./surveillance-stats";

const CLOSE_APPROACH_LEVEL = {
  ROUTINE: "ROUTINE",
  TRACKED: "TRACKED",
  NOTABLE: "NOTABLE",
  NOTEWORTHY: "NOTEWORTHY",
} as const;

type CloseApproachLevel =
  (typeof CLOSE_APPROACH_LEVEL)[keyof typeof CLOSE_APPROACH_LEVEL];

/**
 * Contributing factor for threat assessment
 */
export interface ThreatFactor {
  /** Name of the factor */
  name: string;
  /** Score from 0-100 */
  score: number;
  /** Weight in final calculation (0-1, should sum to 1) */
  weight: number;
  /** Display value for the user */
  displayValue: string;
  /** Description of what this value means */
  description: string;
}

/**
 * Complete threat assessment result
 */
export interface CloseApproachAssessment {
  /** Overall threat score (0-100) */
  totalScore: number;
  /** Close Approach level text ("ROUTINE" | "TRACKED" | "NOTABLE" | "NOTEWORTHY") */
  closeApproachLevel: CloseApproachLevel;
  /** Condition level (1-5, where 1 is critical and 5 is minimal) */
  conditionLevel: number;
  /** Individual contributing factors */
  factors: ThreatFactor[];
  /** Total count of asteroids */
  totalAsteroids: number;
  /** Count of potentially hazardous asteroids */
  totalHazardous: number;
  /** Percentage of hazardous asteroids */
  hazardPercentage: number;
}

// Proximity thresholds for alert levels (0-5 scale, like Torino Scale)
// Lower AU values = closer = higher concern
export const PROXIMITY_THRESHOLDS = [
  {
    maxAU: 0.002,
    level: CLOSE_APPROACH_LEVEL.NOTEWORTHY,
    score: 5,
    description: "Extremely close (< Moon's distance)",
  },
  {
    maxAU: 0.01,
    level: CLOSE_APPROACH_LEVEL.NOTEWORTHY,
    score: 4,
    description: "Very close",
  },
  {
    maxAU: 0.05,
    level: CLOSE_APPROACH_LEVEL.NOTABLE,
    score: 3,
    description: "Within NASA threshold",
  },
  {
    maxAU: 0.1,
    level: CLOSE_APPROACH_LEVEL.TRACKED,
    score: 2,
    description: "Beyond threshold but monitored",
  },
  {
    maxAU: Infinity,
    level: CLOSE_APPROACH_LEVEL.ROUTINE,
    score: 1,
    description: "Routine monitoring",
  },
] as const;

/**
 * Finds the largest PHA (Potentially Hazardous Asteroid) by maximum estimated diameter
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Diameter in kilometers of the largest PHA, or 0 if no PHAs exist
 *
 * @example
 * ```ts
 * const largestPha = getLargestPhaAsteroid(neoData);
 * console.log(largestPha); // 0.850 (850m)
 * ```
 */
export const getLargestPhaAsteroid = (data: NeoFeedResponse): number => {
  let largest = 0;
  Object.values(data.near_earth_objects).forEach((asteroids) => {
    asteroids.forEach((asteroid) => {
      if (asteroid.is_potentially_hazardous_asteroid) {
        const diameter =
          asteroid.estimated_diameter.kilometers.estimated_diameter_max;
        if (diameter > largest) {
          largest = diameter;
        }
      }
    });
  });

  return largest;
};

/**
 * Finds the closest approach distance among PHAs (Potentially Hazardous Asteroids) only
 *
 * Searches through all PHAs and their close approach dates to find
 * the minimum miss distance. Returns the value in Astronomical Units (AU).
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Distance in Astronomical Units (AU), or 0 if no PHAs exist
 *
 * @example
 * ```ts
 * const closestPha = getClosestPhaApproach(neoData);
 * console.log(closestPha); // 0.0234
 * ```
 */
export const getClosestPhaApproach = (
  data: NeoFeedResponse
): { au: number; km: number } | null => {
  let closestDistance = Infinity;
  let closestDistanceKm = 0;

  Object.values(data.near_earth_objects).forEach((asteroids) => {
    asteroids.forEach((asteroid) => {
      // Only consider PHAs
      if (asteroid.is_potentially_hazardous_asteroid) {
        asteroid.close_approach_data.forEach((approach) => {
          const distanceAU = parseFloat(approach.miss_distance.astronomical);
          // Only consider valid positive distances
          if (
            !isNaN(distanceAU) &&
            distanceAU > 0 &&
            distanceAU < closestDistance
          ) {
            closestDistance = distanceAU;
            closestDistanceKm = parseFloat(approach.miss_distance.kilometers);
          }
        });
      }
    });
  });

  if (closestDistance === Infinity) return null;

  return { au: closestDistance, km: closestDistanceKm };
};

/**
 * Calculates a close approach assessment based on proximity of PHAs
 *
 * This function implements NASA's PHA criteria to provide a weighted threat score:
 * - PHA Percentage: Potentially hazardous asteroids
 * - Proximity: Closest approach distance of PHAs
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Complete threat assessment with overall score, level, and factor breakdown
 *
 * @example
 * ```ts
 * const assessment = calculateThreatAssessment(neoData);
 * console.log(assessment.threatLevel); // "MODERATE"
 * console.log(assessment.totalScore); // 42
 * console.log(assessment.factors); // [{ name: "PHA Count", score: 60, ... }, ...]
 * ```
 */
export const calculateThreatAssessment = (
  data: NeoFeedResponse
): CloseApproachAssessment => {
  const totalAsteroids = getTotalAsteroids(data);
  const totalHazardous = getTotalHazardousAsteroids(data);
  const hazardPercentage =
    totalAsteroids > 0 ? (totalHazardous / totalAsteroids) * 100 : 0;

  // Get closest PHA approach distance
  const closestApproach = getClosestPhaApproach(data);

  if (!closestApproach) {
    return {
      totalScore: 0,
      closeApproachLevel: CLOSE_APPROACH_LEVEL.ROUTINE,
      conditionLevel: 0,
      factors: [
        {
          name: "Proximity",
          score: 0,
          weight: 1.0,
          displayValue: "No PHAs",
          description:
            "No potentially hazardous asteroids detected in this time period",
        },
      ],
      totalAsteroids,
      totalHazardous,
      hazardPercentage,
    };
  }
  const closestDistanceAU = closestApproach.au;
  const closestDistanceKm = closestApproach.km;

  // Close Approach Alert - Based purely on proximity
  // Score system: 0-5 (like Torino Scale where 0 = no hazard, 5 = highest concern)
  // This is NOT a threat assessment since we lack collision probability data

  // Find the appropriate threshold for this distance
  const threshold = PROXIMITY_THRESHOLDS.find(
    (t) => closestDistanceAU <= t.maxAU
  );

  // Fallback to ROUTINE if no threshold matches (shouldn't happen with Infinity catch-all)
  const alertLevel = threshold?.level ?? CLOSE_APPROACH_LEVEL.ROUTINE;
  const alertScore = threshold?.score ?? 1;

  // Build factors - Only showing proximity distance
  const factors: ThreatFactor[] = [
    {
      name: "Proximity",
      score: alertScore,
      weight: 1.0,
      displayValue: `${closestDistanceAU.toFixed(3)} AU (~${(
        closestDistanceKm / 1_000_000
      ).toFixed(1)}M km)`,

      description: `Closest PHA approach is ${closestDistanceAU.toFixed(
        3
      )} Astronomical Units from Earth`,
    },
  ];

  return {
    totalScore: alertScore, // 0-5 scale
    closeApproachLevel: alertLevel,
    conditionLevel: alertScore, // Using alertScore directly (0-5)
    factors,
    totalAsteroids,
    totalHazardous,
    hazardPercentage,
  };
};
