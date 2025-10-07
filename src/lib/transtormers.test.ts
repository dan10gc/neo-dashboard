import { describe, expect, it } from "vitest";
import { getTotalAsteroids } from "./transformers";
import type { NeoFeedResponse } from "@/types/neo";

describe("Transformers", () => {
  describe("getTotalAsteroids", () => {
    it("should correctly calculate total number of asteroids", () => {
      const mockData: NeoFeedResponse = {
        near_earth_objects: {
          "2023-10-01": [{ id: "1" }, { id: "2" }],
          "2023-10-02": [{ id: "3" }],
        },
      } as any; // Cast to any to simplify mock

      const total = getTotalAsteroids(mockData);
      expect(total).toBe(3);
    });
  });
});
