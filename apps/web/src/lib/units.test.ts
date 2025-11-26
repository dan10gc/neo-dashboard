import { describe, expect, it } from "vitest";
import {
  formatDiameter,
  formatDistance,
  getDistanceUnitLabel,
} from "./units";

describe("units", () => {
  describe("formatDiameter", () => {
    describe("kilometers", () => {
      it("should format small values in kilometers with 1 decimal", () => {
        expect(formatDiameter(0.5, "km")).toBe("0.5 km");
        expect(formatDiameter(1.2345, "km")).toBe("1.2 km");
        expect(formatDiameter(10.789, "km")).toBe("10.8 km");
      });

      it("should format large values in kilometers with commas", () => {
        expect(formatDiameter(1500, "km")).toBe("1,500.0 km");
        expect(formatDiameter(12345.678, "km")).toBe("12,345.7 km");
      });

      it("should handle zero", () => {
        expect(formatDiameter(0, "km")).toBe("0.0 km");
      });

      it("should format values at the 1000 threshold", () => {
        expect(formatDiameter(999, "km")).toBe("999.0 km");
        // 1000 is not > 1000, so it doesn't get comma formatting
        expect(formatDiameter(1000, "km")).toBe("1000.0 km");
        expect(formatDiameter(1001, "km")).toBe("1,001.0 km");
      });
    });

    describe("miles", () => {
      it("should convert and format kilometers to miles", () => {
        // 1 km = 0.621371 mi
        expect(formatDiameter(1, "mi")).toBe("0.6 mi");
        expect(formatDiameter(10, "mi")).toBe("6.2 mi");
        expect(formatDiameter(100, "mi")).toBe("62.1 mi");
      });

      it("should format large values in miles with commas", () => {
        // 2000 km ≈ 1242.742 mi
        expect(formatDiameter(2000, "mi")).toBe("1,242.7 mi");
      });

      it("should handle zero", () => {
        expect(formatDiameter(0, "mi")).toBe("0.0 mi");
      });
    });

    describe("meters", () => {
      it("should convert and format kilometers to meters with no decimals", () => {
        expect(formatDiameter(0.5, "m")).toBe("500 m");
        // 1000 is not > 1000, so no comma
        expect(formatDiameter(1, "m")).toBe("1000 m");
        // 1234 is > 1000, so gets comma
        expect(formatDiameter(1.234, "m")).toBe("1,234 m");
      });

      it("should format large values in meters with commas", () => {
        expect(formatDiameter(2, "m")).toBe("2,000 m");
        expect(formatDiameter(10.5, "m")).toBe("10,500 m");
      });

      it("should handle zero", () => {
        expect(formatDiameter(0, "m")).toBe("0 m");
      });

      it("should handle values at the 1000 threshold", () => {
        // 0.999 km = 999 m (just below threshold)
        expect(formatDiameter(0.999, "m")).toBe("999 m");
        // 1 km = 1000 m (at threshold, but not > 1000 so no comma)
        expect(formatDiameter(1, "m")).toBe("1000 m");
        // 1.001 km = 1001 m (just above threshold)
        expect(formatDiameter(1.001, "m")).toBe("1,001 m");
      });
    });

    describe("edge cases", () => {
      it("should handle very small values", () => {
        expect(formatDiameter(0.001, "km")).toBe("0.0 km");
        expect(formatDiameter(0.001, "m")).toBe("1 m");
      });

      it("should handle very large values", () => {
        expect(formatDiameter(1000000, "km")).toBe("1,000,000.0 km");
        expect(formatDiameter(1000000, "mi")).toBe("621,371.0 mi");
        expect(formatDiameter(1000000, "m")).toBe("1,000,000,000 m");
      });
    });
  });

  describe("formatDistance", () => {
    describe("astronomical units (AU)", () => {
      it("should format small AU values with 4 decimals", () => {
        expect(formatDistance(0.0015, "AU")).toBe("0.0015 AU");
        expect(formatDistance(0.1234, "AU")).toBe("0.1234 AU");
        expect(formatDistance(1.23456, "AU")).toBe("1.2346 AU");
      });

      it("should format large AU values with commas", () => {
        expect(formatDistance(1500, "AU")).toBe("1,500.0000 AU");
        expect(formatDistance(12345.6789, "AU")).toBe("12,345.6789 AU");
      });

      it("should handle zero", () => {
        expect(formatDistance(0, "AU")).toBe("0.0000 AU");
      });
    });

    describe("lunar distances (LD)", () => {
      it("should convert and format AU to lunar distances", () => {
        // 1 AU ≈ 389.17 LD
        expect(formatDistance(1, "LD")).toBe("389.17 LD");
        expect(formatDistance(0.1, "LD")).toBe("38.92 LD");
        expect(formatDistance(0.01, "LD")).toBe("3.89 LD");
      });

      it("should format large LD values with commas", () => {
        // 10 AU ≈ 3891.7 LD
        expect(formatDistance(10, "LD")).toBe("3,891.70 LD");
      });

      it("should handle zero", () => {
        expect(formatDistance(0, "LD")).toBe("0.00 LD");
      });

      it("should handle values at and above the 1000 threshold", () => {
        // 2.57 AU * 389.17 = 1000.1669 LD (> 1000 so gets comma)
        expect(formatDistance(2.57, "LD")).toBe("1,000.17 LD");
        // 2.571 AU * 389.17 = 1000.556 LD (> 1000 so gets comma)
        expect(formatDistance(2.571, "LD")).toBe("1,000.56 LD");
      });
    });

    describe("kilometers", () => {
      it("should convert and format AU to kilometers with no decimals", () => {
        // 1 AU = 149,597,871 km
        expect(formatDistance(1, "km")).toBe("149,597,871 km");
        expect(formatDistance(0.5, "km")).toBe("74,798,936 km");
      });

      it("should format large km values with commas", () => {
        expect(formatDistance(2, "km")).toBe("299,195,742 km");
        expect(formatDistance(10, "km")).toBe("1,495,978,710 km");
      });

      it("should handle zero", () => {
        expect(formatDistance(0, "km")).toBe("0 km");
      });

      it("should handle small AU values (< 0.000007 AU results in < 1000 km)", () => {
        // 0.000005 AU ≈ 748 km
        expect(formatDistance(0.000005, "km")).toBe("748 km");
      });
    });

    describe("edge cases", () => {
      it("should handle very small AU values", () => {
        expect(formatDistance(0.0001, "AU")).toBe("0.0001 AU");
        expect(formatDistance(0.0001, "LD")).toBe("0.04 LD");
        expect(formatDistance(0.0001, "km")).toBe("14,960 km");
      });

      it("should handle very large AU values", () => {
        expect(formatDistance(100000, "AU")).toBe("100,000.0000 AU");
        expect(formatDistance(100000, "LD")).toBe("38,917,000.00 LD");
        expect(formatDistance(100000, "km")).toBe("14,959,787,100,000 km");
      });
    });
  });

  describe("getDistanceUnitLabel", () => {
    it("should return correct label for AU", () => {
      expect(getDistanceUnitLabel("AU")).toBe("astronomical units");
    });

    it("should return correct label for LD", () => {
      expect(getDistanceUnitLabel("LD")).toBe("lunar distances");
    });

    it("should return correct label for km", () => {
      expect(getDistanceUnitLabel("km")).toBe("kilometers");
    });
  });

  describe("locale formatting", () => {
    it("should use consistent number formatting across different values", () => {
      // All large numbers should use commas
      const diameterKm = formatDiameter(12345, "km");
      const diameterM = formatDiameter(2, "m");
      const distanceAU = formatDistance(1234, "AU");
      const distanceKm = formatDistance(1, "km");

      expect(diameterKm).toContain(",");
      expect(diameterM).toContain(",");
      expect(distanceAU).toContain(",");
      expect(distanceKm).toContain(",");
    });

    it("should maintain decimal precision consistency", () => {
      // km should always have 1 decimal
      expect(formatDiameter(5, "km")).toMatch(/\.\d km$/);
      expect(formatDiameter(999, "km")).toMatch(/\.\d km$/);

      // AU should always have 4 decimals
      expect(formatDistance(5, "AU")).toMatch(/\.\d{4} AU$/);
      expect(formatDistance(999, "AU")).toMatch(/\.\d{4} AU$/);

      // LD should always have 2 decimals
      expect(formatDistance(5, "LD")).toMatch(/\.\d{2} LD$/);
      expect(formatDistance(999, "LD")).toMatch(/\.\d{2} LD$/);
    });
  });
});
