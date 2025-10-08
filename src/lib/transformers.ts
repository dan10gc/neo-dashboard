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


export const getAsteroidTableData = (data: NeoFeedResponse) => {
  const tableData = Object.values(data.near_earth_objects).flat().map((neo) => {
    // Find the closest approach by minimum miss distance
    const closestApproach = neo.close_approach_data.reduce((closest, current) => {
      const currentDist = parseFloat(current.miss_distance.kilometers);
      const closestDist = parseFloat(closest.miss_distance.kilometers);
      return currentDist < closestDist ? current : closest;
    });

    return {
      id: neo.id,
      name: neo.name,
      is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
      diameter: Math.floor(neo.estimated_diameter.meters.estimated_diameter_max),
      velocity: Math.floor(
        parseFloat(closestApproach.relative_velocity.kilometers_per_hour)
      ),
      miss_distance_km: Math.floor(
        parseFloat(closestApproach.miss_distance.kilometers)
      ),
      miss_distance_au: parseFloat(closestApproach.miss_distance.astronomical),
      close_approach_date: closestApproach.close_approach_date,
    };
  });

  return tableData;
}