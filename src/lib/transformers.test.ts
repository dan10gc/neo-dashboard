import { describe, expect, it } from "vitest";
import {
  getTotalAsteroids,
  getTotalHazardousAsteroids,
  getLargestAsteroid,
  getClosestApproach,
  getAsteroidCountsByDate,
  getSizeVelocityData,
  getAsteroidTableData,
} from "./transformers";
import { mockNeoResponse } from "@/test/fixtures/neoResponse";

describe("Transformers", () => {
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
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][0].close_approach_data[0],
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

  describe("getAsteroidCountsByDate", () => {
    it("should count asteroids by date with hazard breakdown", () => {
      const counts = getAsteroidCountsByDate(mockNeoResponse);

      expect(counts).toHaveLength(2);

      // 2024-01-01: 2 total, 1 hazardous, 1 safe
      expect(counts[0]).toEqual({
        date: "2024-01-01",
        hazardous: 1,
        safe: 1,
        total: 2,
      });

      // 2024-01-02: 3 total, 2 hazardous, 1 safe
      expect(counts[1]).toEqual({
        date: "2024-01-02",
        hazardous: 2,
        safe: 1,
        total: 3,
      });
    });

    it("should sort dates chronologically", () => {
      const counts = getAsteroidCountsByDate(mockNeoResponse);
      expect(counts[0].date).toBe("2024-01-01");
      expect(counts[1].date).toBe("2024-01-02");
    });
  });

  describe("getSizeVelocityData", () => {
    it("should extract diameter and velocity for each asteroid", () => {
      const data = getSizeVelocityData(mockNeoResponse);

      expect(data).toHaveLength(5);

      // Check first asteroid (433 Eros)
      expect(data[0]).toEqual({
        name: "433 Eros (A898 PA)",
        diameter: 49507, // Math.floor of estimated_diameter_max
        velocity: 19957, // Math.floor of velocity km/h
        hazardous: false,
      });

      // Check hazardous asteroid ((2010 PK9))
      expect(data[1]).toEqual({
        name: "(2010 PK9)",
        diameter: 322,
        velocity: 67510,
        hazardous: true,
      });
    });

    it("should handle asteroids with multiple close approaches", () => {
      const data = getSizeVelocityData(mockNeoResponse);
      // Should use first close approach data
      expect(data[0].velocity).toBe(19957); // From first approach
    });
  });

  describe("getAsteroidTableData", () => {
    it("should transform data for table display", () => {
      const tableData = getAsteroidTableData(mockNeoResponse);

      expect(tableData).toHaveLength(5);

      // Check first asteroid
      const firstRow = tableData[0];
      expect(firstRow).toHaveProperty("id");
      expect(firstRow).toHaveProperty("name");
      expect(firstRow).toHaveProperty("is_potentially_hazardous_asteroid");
      expect(firstRow).toHaveProperty("diameter");
      expect(firstRow).toHaveProperty("velocity");
      expect(firstRow).toHaveProperty("miss_distance_km");
      expect(firstRow).toHaveProperty("miss_distance_au");
      expect(firstRow).toHaveProperty("close_approach_date");
    });

    it("should use the closest approach for each asteroid", () => {
      // Create data with multiple approaches
      const multiApproachData = {
        ...mockNeoResponse,
        near_earth_objects: {
          "2024-01-01": [
            {
              ...mockNeoResponse.near_earth_objects["2024-01-01"][0],
              close_approach_data: [
                {
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][0].close_approach_data[0],
                  miss_distance: {
                    astronomical: "0.5",
                    lunar: "194.5",
                    kilometers: "75000000",
                    miles: "46602839",
                  },
                },
                {
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][0].close_approach_data[0],
                  miss_distance: {
                    astronomical: "0.2",
                    lunar: "77.8",
                    kilometers: "30000000",
                    miles: "18641136",
                  },
                },
              ],
            },
          ],
        },
      };

      const tableData = getAsteroidTableData(multiApproachData);
      // Should use the closer approach (30000000 km)
      expect(tableData[0].miss_distance_km).toBe(30000000);
    });

    it("should format numerical values correctly", () => {
      const tableData = getAsteroidTableData(mockNeoResponse);

      // All diameter and velocity should be integers (Math.floor)
      tableData.forEach((row) => {
        expect(Number.isInteger(row.diameter)).toBe(true);
        expect(Number.isInteger(row.velocity)).toBe(true);
        expect(Number.isInteger(row.miss_distance_km)).toBe(true);
      });

      // miss_distance_au should be a number
      tableData.forEach((row) => {
        expect(typeof row.miss_distance_au).toBe("number");
      });
    });

    it("should preserve hazard status", () => {
      const tableData = getAsteroidTableData(mockNeoResponse);

      // Check hazardous asteroids
      const hazardous = tableData.filter((row) => row.is_potentially_hazardous_asteroid);
      expect(hazardous.length).toBe(3);

      // Check safe asteroids
      const safe = tableData.filter((row) => !row.is_potentially_hazardous_asteroid);
      expect(safe.length).toBe(2);
    });
  });
});