import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { mockNeoResponse } from "@/test/fixtures/neoResponse";

import { useNeoDataQuery } from "./useNeoNasaQuery";

// Mock environment variable
vi.mock("@/lib/utils", () => ({
  getEnvVar: vi.fn(() => "TEST_API_KEY"),
}));

describe("useNeoDataQuery", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    // Create a new QueryClient for each test to ensure isolation
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false, // Disable retries for tests
        },
      },
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should fetch and transform NEO data successfully", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);

    // Wait for the query to complete
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verify the data is transformed correctly
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.totalAsteroids).toBe(5); // Based on mockNeoResponse element_count
    expect(result.current.data?.totalHazardous).toBeGreaterThan(0);
    expect(result.current.data?.largestAsteroid).toBeGreaterThan(0);
    expect(result.current.data?.closestApproach).toBeGreaterThan(0);
  });

  it("should include transformed data structures", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;
    expect(data).toBeDefined();

    // Verify all transformed data structures are present
    expect(data?.asteroidTableData).toBeDefined();
    expect(Array.isArray(data?.asteroidTableData)).toBe(true);

    expect(data?.asteroidCountsByDate).toBeDefined();
    expect(Array.isArray(data?.asteroidCountsByDate)).toBe(true);

    expect(data?.sizeVelocityData).toBeDefined();
    expect(Array.isArray(data?.sizeVelocityData)).toBe(true);

    expect(data?.nextApproaches).toBeDefined();
    expect(Array.isArray(data?.nextApproaches)).toBe(true);

    expect(data?.threatAssessment).toBeDefined();
  });

  it("should include date range metadata", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;
    expect(data?.dateRange).toBeDefined();
    expect(data?.dateRange.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/); // YYYY-MM-DD format
    expect(data?.dateRange.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("should include raw API response", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;
    expect(data?.data).toBeDefined();
    expect(data?.data.near_earth_objects).toBeDefined();
    expect(data?.data.element_count).toBe(mockNeoResponse.element_count);
  });

  it("should handle errors gracefully", async () => {
    // Override MSW handler to return error
    const { server } = await import("@/test/mocks/server");
    const { http, HttpResponse } = await import("msw");

    server.use(
      http.get("https://api.nasa.gov/neo/rest/v1/feed", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const errorQueryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const errorWrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={errorQueryClient}>
        {children}
      </QueryClientProvider>
    );

    const { result } = renderHook(() => useNeoDataQuery(), {
      wrapper: errorWrapper,
    });

    // Wait for error state
    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeDefined();
    expect(result.current.data).toBeUndefined();
  });

  it("should cache data with staleTime of 5 minutes", async () => {
    const { result, rerender } = renderHook(() => useNeoDataQuery(), {
      wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const firstData = result.current.data;

    // Rerender hook - should return cached data
    rerender();

    expect(result.current.data).toBe(firstData);
    expect(result.current.isFetching).toBe(false);
  });

  it("should calculate statistics correctly from mock data", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const data = result.current.data;

    // Based on mockNeoResponse fixture
    expect(data?.totalAsteroids).toBe(5);

    // Should have hazardous asteroids (2010 PK9, 2015 RC, 2019 OK)
    expect(data?.totalHazardous).toBeGreaterThan(0);

    // Largest asteroid should be from the data
    expect(data?.largestAsteroid).toBeGreaterThan(0);

    // Closest approach should be a positive number
    expect(data?.closestApproach).toBeGreaterThan(0);
  });

  it("should provide asteroid table data with correct structure", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const tableData = result.current.data?.asteroidTableData;

    expect(tableData).toBeDefined();
    expect(tableData!.length).toBeGreaterThan(0);

    // Verify each row has expected properties
    const firstRow = tableData![0];
    expect(firstRow).toHaveProperty("id");
    expect(firstRow).toHaveProperty("name");
    expect(firstRow).toHaveProperty("close_approach_date");
    expect(firstRow).toHaveProperty("velocity");
    expect(firstRow).toHaveProperty("miss_distance_km");
    expect(firstRow).toHaveProperty("miss_distance_au");
    expect(firstRow).toHaveProperty("diameter");
    expect(firstRow).toHaveProperty("is_potentially_hazardous_asteroid");
  });

  it("should provide asteroid counts by date", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const countsByDate = result.current.data?.asteroidCountsByDate;

    expect(countsByDate).toBeDefined();
    expect(Array.isArray(countsByDate)).toBe(true);

    // Should have entries for dates in mock data
    expect(countsByDate!.length).toBeGreaterThan(0);

    // Verify structure
    const firstEntry = countsByDate![0];
    expect(firstEntry).toHaveProperty("date");
    expect(firstEntry).toHaveProperty("total");
  });

  it("should provide size vs velocity data", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const sizeVelocityData = result.current.data?.sizeVelocityData;

    expect(sizeVelocityData).toBeDefined();
    expect(Array.isArray(sizeVelocityData)).toBe(true);
    expect(sizeVelocityData!.length).toBe(5); // Should match total asteroids

    // Verify structure
    const firstEntry = sizeVelocityData![0];
    expect(firstEntry).toHaveProperty("diameter");
    expect(firstEntry).toHaveProperty("velocity");
    expect(firstEntry).toHaveProperty("name");
    expect(firstEntry).toHaveProperty("hazardous");
    expect(firstEntry).toHaveProperty("absoluteMagnitude");
  });

  it("should provide next approaches with countdown data", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const nextApproaches = result.current.data?.nextApproaches;

    expect(nextApproaches).toBeDefined();
    expect(Array.isArray(nextApproaches)).toBe(true);

    // Should have up to 5 entries (or less if fewer asteroids)
    expect(nextApproaches!.length).toBeGreaterThan(0);
    expect(nextApproaches!.length).toBeLessThanOrEqual(5);

    // Verify structure
    const firstEntry = nextApproaches![0];
    expect(firstEntry).toHaveProperty("id");
    expect(firstEntry).toHaveProperty("name");
    expect(firstEntry).toHaveProperty("close_approach_date");
    expect(firstEntry).toHaveProperty("close_approach_date_full");
    expect(firstEntry).toHaveProperty("epoch_date_close_approach");
    expect(firstEntry).toHaveProperty("miss_distance_km");
    expect(firstEntry).toHaveProperty("miss_distance_au");
    expect(firstEntry).toHaveProperty("is_potentially_hazardous_asteroid");
  });

  it("should calculate threat assessment", async () => {
    const { result } = renderHook(() => useNeoDataQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    const threatAssessment = result.current.data?.threatAssessment;

    expect(threatAssessment).toBeDefined();
    expect(threatAssessment).toHaveProperty("totalScore");
    expect(threatAssessment).toHaveProperty("closeApproachLevel");
    expect(threatAssessment).toHaveProperty("conditionLevel");
    expect(threatAssessment).toHaveProperty("factors");
    expect(threatAssessment).toHaveProperty("totalAsteroids");
    expect(threatAssessment).toHaveProperty("totalHazardous");
    expect(threatAssessment).toHaveProperty("hazardPercentage");
  });
});
