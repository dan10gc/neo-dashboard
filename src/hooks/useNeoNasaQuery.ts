import { getEnvVar } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import type { NeoFeedResponse } from "@/types/neo";
import {
  getLargestAsteroid,
  getTotalAsteroids,
  getTotalHazardousAsteroids,
} from "@/lib/transformers";

/**
 *
 * @returns An object containing startDate and endDate in YYYY-MM-DD format
 */
const getDateRange = () => {
  const today = new Date();
  const priorDate = new Date().setDate(today.getDate() - 7);

  const startDate = new Date(priorDate).toISOString().split("T")[0];
  const endDate = today.toISOString().split("T")[0];

  return { startDate, endDate };
};

/**
 *
 * @returns Fetches NEO data from NASA API for the past 7 days
 */
const fetchNeoData = async (): Promise<NeoFeedResponse> => {
  const { startDate, endDate } = getDateRange();
  const NASA_API_KEY = getEnvVar("VITE_NASA_API_KEY");

  const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

/**
 *
 * @returns A React Query hook to fetch NEO data
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
      // const closestAsteroid = getTotalAsteroids(data);
      return {
        totalAsteroids,
        totalHazardous,
        largestAsteroid,
        // closestAsteroid,
        data,
      };
    },
  });
};
