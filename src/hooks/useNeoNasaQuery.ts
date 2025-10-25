import { getEnvVar } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { NeoFeedResponse } from "@/types/neo";
import {
  getAsteroidCountsByDate,
  getAsteroidTableData,
  getClosestApproach,
  getLargestAsteroid,
  getSizeVelocityData,
  getTotalAsteroids,
  getTotalHazardousAsteroids,
  getNextApproaches,
} from "@/lib/transformers";
/**
 * Generates a 7-day forward-looking date range for NEO tracking
 *
 * This creates a date range from today through the next 7 days to query
 * the NASA NeoWs (Near Earth Object Web Service) Feed API. The Feed API
 * returns asteroids based on their close approach date to Earth.
 *
 * @returns An object containing:
 *  - startDate: Today's date in YYYY-MM-DD format
 *  - endDate: Date 7 days from now in YYYY-MM-DD format
 *
 * @example
 * // If today is 2025-10-25
 * getDateRange() // { startDate: "2025-10-25", endDate: "2025-11-01" }
 */
const getDateRange = () => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 7);

  const startDate = today.toISOString().split("T")[0];
  const endDate = futureDate.toISOString().split("T")[0];

  return { startDate, endDate };
};

/**
 * Fetches Near Earth Object (NEO) data from NASA's NeoWs API
 *
 * This function queries the NASA NeoWs Feed endpoint to retrieve asteroids
 * that will have their closest approach to Earth within the next 7 days.
 * The API returns asteroids grouped by their close approach date.
 *
 * **Important**: The start_date and end_date parameters filter asteroids by
 * their CLOSE APPROACH DATE, not by discovery or update date. This means:
 * - Querying 2025-10-25 to 2025-11-01 returns asteroids approaching Earth during that week
 * - Each asteroid's close_approach_data contains the exact date/time of closest approach
 * - The API groups results by date in the near_earth_objects object
 *
 * @returns Promise resolving to NeoFeedResponse containing:
 *  - near_earth_objects: Object keyed by date (YYYY-MM-DD) containing asteroid arrays
 *  - element_count: Total number of asteroids in the response
 *  - links: Pagination and self-reference links
 *
 * @throws Error if the NASA API request fails or API key is invalid
 *
 * @see https://api.nasa.gov/neo/ - NASA NeoWs API documentation
 *
 * @example
 * const neoData = await fetchNeoData();
 * // Returns asteroids approaching Earth in the next 7 days
 * // neoData.near_earth_objects["2025-10-26"] - asteroids approaching on Oct 26
 */
const fetchNeoData = async (): Promise<NeoFeedResponse> => {
  const { startDate, endDate } = getDateRange();
  const NASA_API_KEY = getEnvVar("VITE_NASA_API_KEY");

  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;

  // Fetch data and ensure minimum display time for loader
  const [response] = await Promise.all([
    fetch(url),
    new Promise(resolve => setTimeout(resolve, 2500)), // 2.5 second minimum display
  ]);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

/**
 * React Query hook for fetching and transforming NASA NEO data
 *
 * This hook fetches Near Earth Object data for the next 7 days and transforms
 * it into multiple useful formats for the dashboard. It automatically handles
 * caching, loading states, and errors.
 *
 * **Data Flow**:
 * 1. Fetches raw NEO data from NASA API (next 7 days of close approaches)
 * 2. Transforms data through multiple helper functions
 * 3. Returns aggregated statistics and formatted datasets
 *
 * **Key Features**:
 * - Enforces 2.5 second minimum loader display for better UX
 * - Caches data for 5 minutes to reduce API calls
 * - Provides transformed data ready for charts and tables
 * - Includes date range metadata for display
 *
 * @returns React Query result object containing:
 *  - data: Transformed NEO data including:
 *    - totalAsteroids: Total count of NEOs in the date range
 *    - totalHazardous: Count of potentially hazardous asteroids
 *    - largestAsteroid: Diameter of largest asteroid (formatted string)
 *    - closestApproach: Closest approach distance in AU (formatted string)
 *    - asteroidTableData: Array of asteroids for table display
 *    - asteroidCountsByDate: Daily counts grouped by hazard status
 *    - sizeVelocityData: Data points for size vs velocity scatter plot
 *    - nextApproaches: Next 5 closest approaches with countdown data
 *    - dateRange: { startDate, endDate } for UI display
 *    - data: Raw API response
 *  - isLoading: Boolean indicating if initial load is in progress
 *  - error: Error object if fetch failed
 *  - refetch: Function to manually refetch data
 *
 * @example
 * const { data, isLoading, error } = useNeoDataQuery();
 * if (isLoading) return <LoaderScreen />;
 * if (error) return <ErrorMessage />;
 * return <Dashboard data={data} />;
 */
export const useNeoDataQuery = () => {
  return useQuery({
    queryKey: ["neoData"],
    queryFn: fetchNeoData,
    staleTime: 1000 * 60 * 5, // Data fresh for 5 minutes,
    select(data) {
      const totalAsteroids = getTotalAsteroids(data);
      const totalHazardous = getTotalHazardousAsteroids(data);
      const largestAsteroid = getLargestAsteroid(data);
      const closestApproach = getClosestApproach(data);
      const { startDate, endDate } = getDateRange();
      return {
        totalAsteroids,
        totalHazardous,
        largestAsteroid,
        closestApproach,
        asteroidTableData: getAsteroidTableData(data),
        asteroidCountsByDate: getAsteroidCountsByDate(data),
        sizeVelocityData: getSizeVelocityData(data),
        nextApproaches: getNextApproaches(data),
        dateRange: { startDate, endDate },
        data,
      };
    },
  });
};
