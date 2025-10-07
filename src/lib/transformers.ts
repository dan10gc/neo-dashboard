import type { NeoFeedResponse } from "@/types/neo";

export const getTotalAsteroids = (data: NeoFeedResponse): number => {
  return Object.values(data.near_earth_objects).reduce(
    (total, asteroids) => total + asteroids.length,
    0
  );
} 