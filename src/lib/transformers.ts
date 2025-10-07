import type { NeoFeedResponse } from "@/types/neo";

/**
 *
 * @param data - NeoFeedResponse from NASA API
 * @returns number of asteroids in the response
 */
export const getTotalAsteroids = (data: NeoFeedResponse): number => {
  return Object.values(data.near_earth_objects).reduce(
    (total, asteroids) => total + asteroids.length,
    0
  );
};

/**
 *
 * @param data - NeoFeedResponse from NASA API
 * @returns number of potentially hazardous asteroids
 */
export const getTotalHazardousAsteroids = (data: NeoFeedResponse): number => {
  return Object.values(data.near_earth_objects).reduce(
    (total, asteroids) =>
      total +
      asteroids.filter((asteroid) => asteroid.is_potentially_hazardous_asteroid)
        .length,
    0
  );
};

/**
 *
 * @param data - NeoFeedResponse from NASA API
 * @returns name of the largest asteroid with its diameter in meters
 */
export const getLargestAsteroid = (data: NeoFeedResponse): string => {
  let largest = 0;
  Object.values(data.near_earth_objects).forEach((asteroids) => {
    asteroids.forEach((asteroid) => {
      const diameter =
        asteroid.estimated_diameter.meters.estimated_diameter_max;
      if (diameter > largest) {
        largest = diameter;
      }
    });
  });

  return `${Math.floor(largest)}m`;
};

// export const getClosestAsteroid = (data: NeoFeedResponse): number => {

//     });
