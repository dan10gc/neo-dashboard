import { describe, expect, it } from "vitest";
import type { NeoFeedResponse } from "@/types/neo";
import {
  getLargestPhaAsteroid,
  getClosestPhaApproach,
  calculateThreatAssessment,
  PROXIMITY_THRESHOLDS,
} from "./calculate-close-approach-alert";
import { mockNeoResponse } from "@/test/fixtures/neoResponse";

describe("calculate-close-approach-alert", () => {
  describe("getLargestPhaAsteroid", () => {
    it("should return the largest PHA diameter in kilometers", () => {
      const largest = getLargestPhaAsteroid(mockNeoResponse);

      // From fixture: The largest PHA is (2010 PK9) with max diameter 0.3229612552 km
      expect(largest).toBeCloseTo(0.3229612552, 5);
    });

    it("should return 0 when no PHAs exist", () => {
      const noPhaData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [
            {
              ...mockNeoResponse.near_earth_objects["2024-01-01"][0],
              is_potentially_hazardous_asteroid: false,
            },
          ],
        },
      };

      const largest = getLargestPhaAsteroid(noPhaData);
      expect(largest).toBe(0);
    });

    it("should handle empty NEO data", () => {
      const emptyData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {},
        element_count: 0,
      };

      const largest = getLargestPhaAsteroid(emptyData);
      expect(largest).toBe(0);
    });

    it("should compare all PHAs across multiple dates", () => {
      // Mock data already has multiple dates with PHAs
      const largest = getLargestPhaAsteroid(mockNeoResponse);

      // Should find the largest across all dates
      expect(largest).toBeGreaterThan(0);
    });
  });

  describe("getClosestPhaApproach", () => {
    it("should return the closest PHA approach distance in AU and km", () => {
      const closest = getClosestPhaApproach(mockNeoResponse);

      expect(closest).not.toBeNull();
      expect(closest?.au).toBeGreaterThan(0);
      expect(closest?.km).toBeGreaterThan(0);
    });

    it("should return null when no PHAs exist", () => {
      const noPhaData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [
            {
              ...mockNeoResponse.near_earth_objects["2024-01-01"][0],
              is_potentially_hazardous_asteroid: false,
            },
          ],
        },
      };

      const closest = getClosestPhaApproach(noPhaData);
      expect(closest).toBeNull();
    });

    it("should handle empty NEO data", () => {
      const emptyData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {},
        element_count: 0,
      };

      const closest = getClosestPhaApproach(emptyData);
      expect(closest).toBeNull();
    });

    it("should only consider PHAs, not all asteroids", () => {
      const result = getClosestPhaApproach(mockNeoResponse);

      // The closest PHA should not be the non-PHA asteroid (433 Eros)
      // which has distance 0.3149291212 AU
      expect(result).not.toBeNull();
    });

    it("should ignore invalid distance values", () => {
      const invalidData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [
            {
              ...mockNeoResponse.near_earth_objects["2024-01-01"][1],
              close_approach_data: [
                {
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][1]
                    .close_approach_data[0],
                  miss_distance: {
                    astronomical: "invalid",
                    lunar: "0",
                    kilometers: "0",
                    miles: "0",
                  },
                },
              ],
            },
          ],
        },
      };

      const closest = getClosestPhaApproach(invalidData);
      expect(closest).toBeNull();
    });
  });

  describe("calculateThreatAssessment", () => {
    it("should calculate threat assessment with PHAs", () => {
      const assessment = calculateThreatAssessment(mockNeoResponse);

      expect(assessment).toMatchObject({
        totalScore: expect.any(Number),
        closeApproachLevel: expect.any(String),
        conditionLevel: expect.any(Number),
        factors: expect.any(Array),
        totalAsteroids: expect.any(Number),
        totalHazardous: expect.any(Number),
        hazardPercentage: expect.any(Number),
      });

      expect(assessment.totalScore).toBeGreaterThanOrEqual(0);
      expect(assessment.totalScore).toBeLessThanOrEqual(5);
      expect(assessment.factors).toHaveLength(1);
      expect(assessment.factors[0].name).toBe("Proximity");
    });

    it("should return ROUTINE assessment when no PHAs exist", () => {
      const noPhaData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [
            {
              ...mockNeoResponse.near_earth_objects["2024-01-01"][0],
              is_potentially_hazardous_asteroid: false,
            },
          ],
        },
      };

      const assessment = calculateThreatAssessment(noPhaData);

      expect(assessment.totalScore).toBe(0);
      expect(assessment.closeApproachLevel).toBe("ROUTINE");
      expect(assessment.conditionLevel).toBe(0);
      expect(assessment.totalHazardous).toBe(0);
      expect(assessment.hazardPercentage).toBe(0);
      expect(assessment.factors[0].displayValue).toBe("No PHAs");
    });

    it("should handle empty NEO data", () => {
      const emptyData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {},
        element_count: 0,
      };

      const assessment = calculateThreatAssessment(emptyData);

      expect(assessment.totalScore).toBe(0);
      expect(assessment.closeApproachLevel).toBe("ROUTINE");
      expect(assessment.totalAsteroids).toBe(0);
      expect(assessment.totalHazardous).toBe(0);
      expect(assessment.hazardPercentage).toBe(0);
    });

    it("should calculate correct hazard percentage", () => {
      const assessment = calculateThreatAssessment(mockNeoResponse);

      // mockNeoResponse has 5 total asteroids, 3 are PHAs
      const expectedPercentage = (3 / 5) * 100;
      expect(assessment.hazardPercentage).toBeCloseTo(expectedPercentage, 2);
    });

    it("should assign correct alert level based on proximity thresholds", () => {
      // Test data with very close PHA (< 0.002 AU)
      const veryCloseData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [
            {
              ...mockNeoResponse.near_earth_objects["2024-01-01"][1],
              close_approach_data: [
                {
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][1]
                    .close_approach_data[0],
                  miss_distance: {
                    astronomical: "0.0015",
                    lunar: "0.58",
                    kilometers: "224395",
                    miles: "139431",
                  },
                },
              ],
            },
          ],
        },
      };

      const assessment = calculateThreatAssessment(veryCloseData);
      expect(assessment.closeApproachLevel).toBe("NOTEWORTHY");
      expect(assessment.totalScore).toBe(5);
    });

    it("should include proximity factor with correct format", () => {
      const assessment = calculateThreatAssessment(mockNeoResponse);

      const proximityFactor = assessment.factors.find(
        (f) => f.name === "Proximity"
      );
      expect(proximityFactor).toBeDefined();
      expect(proximityFactor?.weight).toBe(1.0);
      expect(proximityFactor?.displayValue).toMatch(/AU.*km/);
      expect(proximityFactor?.description).toContain("Astronomical Units");
    });

    it("should handle edge case of exactly 0.05 AU (NASA threshold)", () => {
      const thresholdData: NeoFeedResponse = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [
            {
              ...mockNeoResponse.near_earth_objects["2024-01-01"][1],
              close_approach_data: [
                {
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][1]
                    .close_approach_data[0],
                  miss_distance: {
                    astronomical: "0.05",
                    lunar: "19.46",
                    kilometers: "7479894",
                    miles: "4647668",
                  },
                },
              ],
            },
          ],
        },
      };

      const assessment = calculateThreatAssessment(thresholdData);
      expect(assessment.closeApproachLevel).toBe("NOTABLE");
      expect(assessment.totalScore).toBe(3);
    });
  });

  describe("PROXIMITY_THRESHOLDS", () => {
    it("should have correct threshold structure", () => {
      expect(PROXIMITY_THRESHOLDS).toHaveLength(5);

      PROXIMITY_THRESHOLDS.forEach((threshold) => {
        expect(threshold).toHaveProperty("maxAU");
        expect(threshold).toHaveProperty("level");
        expect(threshold).toHaveProperty("score");
        expect(threshold).toHaveProperty("description");
      });
    });

    it("should have thresholds in ascending order by maxAU", () => {
      for (let i = 0; i < PROXIMITY_THRESHOLDS.length - 1; i++) {
        expect(PROXIMITY_THRESHOLDS[i].maxAU).toBeLessThan(
          PROXIMITY_THRESHOLDS[i + 1].maxAU
        );
      }
    });

    it("should have scores in descending order (higher score for closer approaches)", () => {
      for (let i = 0; i < PROXIMITY_THRESHOLDS.length - 1; i++) {
        expect(PROXIMITY_THRESHOLDS[i].score).toBeGreaterThanOrEqual(
          PROXIMITY_THRESHOLDS[i + 1].score
        );
      }
    });

    it("should have Infinity as final catch-all threshold", () => {
      const lastThreshold =
        PROXIMITY_THRESHOLDS[PROXIMITY_THRESHOLDS.length - 1];
      expect(lastThreshold.maxAU).toBe(Infinity);
    });
  });
});
