import { describe, expect, it } from "vitest";
import {
  getClosestApproach,
  getLargestAsteroid,
  getTotalAsteroids,
  getTotalHazardousAsteroids,
} from "./surveillance-stats";
import { mockNeoResponse } from "@/test/fixtures/neoResponse";

describe("Surveillance Stats Transformers", () => {
  describe("getTotalAsteroids", () => {
    it("should correctly calculate total number of asteroids", () => {
      const total = getTotalAsteroids(mockNeoResponse);
      expect(total).toBe(5); // 2 asteroids on 2024-01-01, 3 on 2024-01-02
    });

    it("should return 0 for empty data", () => {
      const emptyData = {
        ...mockNeoResponse,
        near_earth_objects: {},
      };
      const total = getTotalAsteroids(emptyData);
      expect(total).toBe(0);
    });
  });

  describe("getTotalHazardousAsteroids", () => {
    it("should correctly count hazardous asteroids", () => {
      const total = getTotalHazardousAsteroids(mockNeoResponse);
      expect(total).toBe(3); // (2010 PK9), (2015 RC), (2019 OK) are hazardous
    });

    it("should return 0 when no hazardous asteroids exist", () => {
      const safeData = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [mockNeoResponse.near_earth_objects["2024-01-01"][0]], // Only 433 Eros (safe)
        },
      };
      const total = getTotalHazardousAsteroids(safeData);
      expect(total).toBe(0);
    });
  });

  describe("getLargestAsteroid", () => {
    it("should find the largest asteroid by diameter", () => {
      const largest = getLargestAsteroid(mockNeoResponse);
      // 1036 Ganymed has max diameter of 70710.6781186548 meters
      expect(largest).toEqual(70.7106781187);
    });

    it("should handle single asteroid", () => {
      const singleData = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [mockNeoResponse.near_earth_objects["2024-01-01"][0]], // 433 Eros: 49507.5579681526 meters
        },
      };
      const largest = getLargestAsteroid(singleData);
      expect(largest).toEqual(49.5075579682);
    });
  });

  describe("getClosestApproach", () => {
    it("should find the closest approach distance in AU", () => {
      const closest = getClosestApproach(mockNeoResponse);
      // (2019 OK) has 0.0198765432 AU
      expect(closest).toEqual(0.0198765432);
    });

    it("should use exponential notation for very small distances", () => {
      const veryCloseData = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [
            {
              ...mockNeoResponse.near_earth_objects["2024-01-01"][0],
              close_approach_data: [
                {
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][0]
                    .close_approach_data[0],
                  miss_distance: {
                    astronomical: "0.000045",
                    lunar: "0.0175",
                    kilometers: "6730",
                    miles: "4182",
                  },
                },
              ],
            },
          ],
        },
      };
      const closest = getClosestApproach(veryCloseData);
      expect(closest).toBe(0.000045); // Closest approach in AU
    });

    it("should return 0 for empty data", () => {
      const emptyData = {
        ...mockNeoResponse,
        near_earth_objects: {},
      };
      const closest = getClosestApproach(emptyData);
      expect(closest).toEqual(0);
    });
  });
});
