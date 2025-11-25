import { describe, expect, it } from "vitest";
import {
  getAsteroidCountsByDate,
  getSizeVelocityData,
  getAsteroidTableData,
} from "./transformers";
import { mockNeoResponse } from "@/test/fixtures/neoResponse";

describe("Transformers", () => {
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
    it("should extract diameter, velocity (km/s), and absolute magnitude for each asteroid", () => {
      const data = getSizeVelocityData(mockNeoResponse);

      expect(data).toHaveLength(5);

      // Check first asteroid (433 Eros)
      expect(data[0]).toEqual({
        name: "433 Eros (A898 PA)",
        diameter: 49507, // Math.floor of estimated_diameter_max
        velocity: 5.54, // km/s rounded to 2 decimals
        hazardous: false,
        absoluteMagnitude: 10.31,
      });

      // Check hazardous asteroid ((2010 PK9))
      expect(data[1]).toEqual({
        name: "(2010 PK9)",
        diameter: 322,
        velocity: 18.75, // km/s rounded to 2 decimals
        hazardous: true,
        absoluteMagnitude: 21.1,
      });
    });

    it("should handle asteroids with multiple close approaches", () => {
      const data = getSizeVelocityData(mockNeoResponse);
      // Should use first close approach data
      expect(data[0].velocity).toBe(5.54); // From first approach (in km/s)
    });

    it("should include absolute magnitude from NASA data", () => {
      const data = getSizeVelocityData(mockNeoResponse);

      // Verify all asteroids have absolute magnitude
      data.forEach((asteroid) => {
        expect(asteroid.absoluteMagnitude).toBeDefined();
        expect(typeof asteroid.absoluteMagnitude).toBe("number");
      });
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
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][0]
                    .close_approach_data[0],
                  miss_distance: {
                    astronomical: "0.5",
                    lunar: "194.5",
                    kilometers: "75000000",
                    miles: "46602839",
                  },
                },
                {
                  ...mockNeoResponse.near_earth_objects["2024-01-01"][0]
                    .close_approach_data[0],
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
      const hazardous = tableData.filter(
        (row) => row.is_potentially_hazardous_asteroid
      );
      expect(hazardous.length).toBe(3);

      // Check safe asteroids
      const safe = tableData.filter(
        (row) => !row.is_potentially_hazardous_asteroid
      );
      expect(safe.length).toBe(2);
    });
  });
});
