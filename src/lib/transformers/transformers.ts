import type { NeoFeedResponse } from "@/types/neo";

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
 *  [
 *    { name: "433 Eros", diameter: 49507, velocity: 19957, hazardous: false },
 *    { name: "(2010 PK9)", diameter: 322, velocity: 67510, hazardous: true }
 *  ]
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

/**
 * Data structure for next close approach display
 */
export interface NextApproachData {
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
  /** Full date-time of close approach */
  close_approach_date_full: string;
  /** Unix timestamp of close approach */
  epoch_date_close_approach: number;
}

/**
 * Gets the next 5 closest approaches, prioritizing future approaches
 *
 * Returns up to 5 asteroids sorted by approach time. If fewer than 5 future
 * approaches exist, fills remaining slots with most recent past approaches.
 * Uses close_approach_date_full for accurate time-based sorting.
 *
 * @param data - NeoFeedResponse object from NASA's NeoWs API
 * @returns Array of up to 5 next/recent approach data sorted by time
 *
 * @example
 * ```ts
 * const nextApproaches = getNextApproaches(neoData);
 * // Returns 5 asteroids, prioritizing upcoming approaches
 * ```
 */
export const getNextApproaches = (data: NeoFeedResponse): NextApproachData[] => {
  const now = Date.now();

  // Flatten all asteroids with their approach data
  const allApproaches: NextApproachData[] = Object.values(data.near_earth_objects)
    .flat()
    .flatMap((neo) =>
      neo.close_approach_data.map((approach) => ({
        id: neo.id,
        name: neo.name,
        is_potentially_hazardous_asteroid: neo.is_potentially_hazardous_asteroid,
        diameter: Math.floor(neo.estimated_diameter.meters.estimated_diameter_max),
        velocity: Math.floor(parseFloat(approach.relative_velocity.kilometers_per_hour)),
        miss_distance_km: Math.floor(parseFloat(approach.miss_distance.kilometers)),
        miss_distance_au: parseFloat(approach.miss_distance.astronomical),
        close_approach_date: approach.close_approach_date,
        close_approach_date_full: approach.close_approach_date_full,
        epoch_date_close_approach: approach.epoch_date_close_approach,
      }))
    );

  // Split into future and past approaches
  const futureApproaches = allApproaches
    .filter(approach => approach.epoch_date_close_approach > now)
    .sort((a, b) => a.epoch_date_close_approach - b.epoch_date_close_approach)
    .slice(0, 5);

  // If less than 5 future approaches, fill with past approaches
  if (futureApproaches.length < 5) {
    const pastApproaches = allApproaches
      .filter(approach => approach.epoch_date_close_approach <= now)
      .sort((a, b) => b.epoch_date_close_approach - a.epoch_date_close_approach)
      .slice(0, 5 - futureApproaches.length);

    return [...futureApproaches, ...pastApproaches];
  }

  return futureApproaches;
};
