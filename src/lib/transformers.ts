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
 * @returns Formatted string with the diameter in meters (e.g., "1000m")
 *
 * @example
 * ```ts
 * const largest = getLargestAsteroid(neoData);
 * console.log(largest); // "49507m"
 * ```
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

/**
 * Finds the closest approach distance among all asteroids
 *
 * Searches through all asteroids and their close approach dates to find
 * the minimum miss distance. Returns the value in Astronomical Units (AU).
 * Uses exponential notation for very small distances (< 0.0001 AU).
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Formatted string with distance in AU (e.g., "0.0234 AU" or "4.53e-5 AU"),
 *          or "N/A" if no valid data exists
 *
 * @example
 * ```ts
 * const closest = getClosestApproach(neoData);
 * console.log(closest); // "0.0234 AU" or "4.53e-5 AU"
 * ```
 */
export const getClosestApproach = (data: NeoFeedResponse): string => {
  let closestDistance = Infinity;

  Object.values(data.near_earth_objects).forEach((asteroids) => {
    asteroids.forEach((asteroid) => {
      asteroid.close_approach_data.forEach((approach) => {
        const distanceAU = parseFloat(approach.miss_distance.astronomical);
        // Only consider valid positive distances
        if (!isNaN(distanceAU) && distanceAU > 0 && distanceAU < closestDistance) {
          closestDistance = distanceAU;
        }
      });
    });
  });

  if (closestDistance === Infinity) return "N/A";

  // Use exponential notation for very small numbers (< 0.0001)
  if (closestDistance < 0.0001) {
    return `${closestDistance.toExponential(2)} AU`;
  }

  return `${closestDistance.toFixed(4)} AU`;
};


/**
 * Chart data type for asteroid counts by date
 */
export interface AsteroidCountByDate {
  /** Date in ISO format (YYYY-MM-DD) */
  date: string;
  /** Number of hazardous asteroids on this date */
  hazardous: number;
  /** Number of safe (non-hazardous) asteroids on this date */
  safe: number;
  /** Total number of asteroids on this date */
  total: number;
}

/**
 * Aggregates asteroid counts by date with hazard status breakdown
 *
 * Groups asteroids by their close approach date and categorizes them as
 * hazardous or safe. Data is sorted chronologically for chart display.
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Array of daily asteroid counts sorted by date, each containing
 *          total count and breakdown by hazard status
 *
 * @example
 * ```ts
 * const counts = getAsteroidCountsByDate(neoData);
 * // [
 * //   { date: "2024-01-01", hazardous: 1, safe: 2, total: 3 },
 * //   { date: "2024-01-02", hazardous: 2, safe: 1, total: 3 }
 * // ]
 * ```
 */
export const getAsteroidCountsByDate = (data: NeoFeedResponse): AsteroidCountByDate[] => {
  const chartData = Object.entries(data.near_earth_objects).map(([date, asteroids]) => {
    const hazardousCount = asteroids.filter(
      (asteroid) => asteroid.is_potentially_hazardous_asteroid
    ).length;
    const safeCount = asteroids.length - hazardousCount;

    return {
      date,
      hazardous: hazardousCount,
      safe: safeCount,
      total: asteroids.length,
    };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return chartData;
};

/**
 * Scatter chart data point for size vs velocity visualization
 */
export interface SizeVelocityDataPoint {
  /** Asteroid name/designation */
  name: string;
  /** Maximum estimated diameter in meters (rounded down) */
  diameter: number;
  /** Velocity in kilometers per hour (rounded down) */
  velocity: number;
  /** Whether the asteroid is potentially hazardous */
  hazardous: boolean;
}

/**
 * Extracts size and velocity data for scatter chart visualization
 *
 * Creates a dataset showing the relationship between asteroid diameter
 * and velocity. Uses the first close approach data for each asteroid.
 * Values are rounded down to integers for cleaner display.
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Array of data points containing diameter, velocity, and hazard status
 *          for each asteroid
 *
 * @example
 * ```ts
 * const scatterData = getSizeVelocityData(neoData);
 * // [
 * //   { name: "433 Eros", diameter: 49507, velocity: 19957, hazardous: false },
 * //   { name: "(2010 PK9)", diameter: 322, velocity: 67510, hazardous: true }
 * // ]
 * ```
 */
export const getSizeVelocityData = (data: NeoFeedResponse): SizeVelocityDataPoint[] => {
  const scatterData = Object.values(data.near_earth_objects).flat().map((neo) => {
    const closeApproach = neo.close_approach_data[0];
    return {
      name: neo.name,
      diameter: Math.floor(neo.estimated_diameter.meters.estimated_diameter_max),
      velocity: Math.floor(
        parseFloat(closeApproach.relative_velocity.kilometers_per_hour)
      ),
      hazardous: neo.is_potentially_hazardous_asteroid,
    };
  });

  return scatterData;
};

/**
 * Table row data for asteroid details display
 */
export interface AsteroidTableRow {
  /** Unique asteroid identifier */
  id: string;
  /** Asteroid name/designation */
  name: string;
  /** Whether the asteroid is potentially hazardous */
  is_potentially_hazardous_asteroid: boolean;
  /** Maximum estimated diameter in meters (rounded down) */
  diameter: number;
  /** Velocity in kilometers per hour (rounded down) */
  velocity: number;
  /** Miss distance in kilometers (rounded down) */
  miss_distance_km: number;
  /** Miss distance in Astronomical Units */
  miss_distance_au: number;
  /** Date of close approach in ISO format (YYYY-MM-DD) */
  close_approach_date: string;
}

/**
 * Transforms asteroid data for table display
 *
 * Flattens the nested NASA API response into a table-friendly format.
 * For asteroids with multiple close approaches, uses the CLOSEST approach
 * (minimum miss distance). All distance and size values are formatted for
 * display.
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Array of table rows, each containing formatted asteroid data including
 *          identification, physical properties, and closest approach details
 *
 * @example
 * ```ts
 * const tableData = getAsteroidTableData(neoData);
 * // [
 * //   {
 * //     id: "2000433",
 * //     name: "433 Eros",
 * //     is_potentially_hazardous_asteroid: false,
 * //     diameter: 49507,
 * //     velocity: 19957,
 * //     miss_distance_km: 47116732,
 * //     miss_distance_au: 0.3149291212,
 * //     close_approach_date: "2024-01-01"
 * //   }
 * // ]
 * ```
 */
export const getAsteroidTableData = (data: NeoFeedResponse): AsteroidTableRow[] => {
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