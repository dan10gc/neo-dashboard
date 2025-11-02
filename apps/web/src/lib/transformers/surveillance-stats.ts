import type { NeoFeedResponse } from "@/types/neo";

/**
 * Calculates the total number of Near-Earth Objects (NEOs) in the dataset
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API containing asteroid data
 * @returns The total count of asteroids across all dates
 *
 * @example
 * ```ts
 * const total = getTotalAsteroids(neoData);
 * console.log(total); // 42
 * ```
 */
export const getTotalAsteroids = (data: NeoFeedResponse): number => {
  return Object.values(data.near_earth_objects).reduce(
    (total, asteroids) => total + asteroids.length,
    0
  );
};

/**
 * Counts the number of potentially hazardous asteroids in the dataset
 *
 * A potentially hazardous asteroid (PHA) is defined by NASA as an asteroid
 * whose orbit brings it within 0.05 AU of Earth's orbit and has an absolute
 * magnitude of 22.0 or brighter.
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns The count of potentially hazardous asteroids
 *
 * @example
 * ```ts
 * const hazardous = getTotalHazardousAsteroids(neoData);
 * console.log(hazardous); // 5
 * ```
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
 * Finds the largest asteroid by maximum estimated diameter
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Diameter in kilometers
 *
 * @example
 * ```ts
 * const largest = getLargestAsteroid(neoData);
 * console.log(largest); // 49.507
 * ```
 */
export const getLargestAsteroid = (data: NeoFeedResponse): number => {
  let largest = 0;
  Object.values(data.near_earth_objects).forEach((asteroids) => {
    asteroids.forEach((asteroid) => {
      const diameter =
        asteroid.estimated_diameter.kilometers.estimated_diameter_max;
      if (diameter > largest) {
        largest = diameter;
      }
    });
  });

  return largest;
};

/**
 * Finds the closest approach distance among all asteroids
 *
 * Searches through all asteroids and their close approach dates to find
 * the minimum miss distance. Returns the value in Astronomical Units (AU).
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Distance in Astronomical Units (AU), or 0 if no valid data exists
 *
 * @example
 * ```ts
 * const closest = getClosestApproach(neoData);
 * console.log(closest); // 0.0234
 * ```
 */
export const getClosestApproach = (data: NeoFeedResponse): number => {
  let closestDistance = Infinity;

  Object.values(data.near_earth_objects).forEach((asteroids) => {
    asteroids.forEach((asteroid) => {
      asteroid.close_approach_data.forEach((approach) => {
        const distanceAU = parseFloat(approach.miss_distance.astronomical);
        // Only consider valid positive distances
        if (
          !isNaN(distanceAU) &&
          distanceAU > 0 &&
          distanceAU < closestDistance
        ) {
          closestDistance = distanceAU;
        }
      });
    });
  });

  if (closestDistance === Infinity) return 0;

  return closestDistance;
};
