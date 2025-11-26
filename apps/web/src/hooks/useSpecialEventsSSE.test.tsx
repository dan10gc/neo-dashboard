import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { SpecialEvent } from "@/types/special-events";

import {
  mockSpecialEvent1,
  mockSpecialEvent2,
  mockSpecialEvent3,
  mockSpecialEventsBatch,
  mockSpecialEventUpdated,
} from "../test/fixtures/specialEvents";
import { useSpecialEventsSSE } from "./useSpecialEventsSSE";

// Mock EventSource
class MockEventSource {
  url: string;
  private _onopen: ((event: Event) => void) | null = null;
  private _onerror: ((event: Event) => void) | null = null;
  readyState: number = 0;
  private listeners: Map<string, ((event: MessageEvent) => void)[]> = new Map();

  constructor(url: string) {
    this.url = url;
    // Use setTimeout to ensure onopen handler is set first
    setTimeout(() => {
      this.readyState = 1; // OPEN
      if (this._onopen) {
        this._onopen(new Event("open"));
      }
    }, 0);
  }

  set onopen(handler: ((event: Event) => void) | null) {
    this._onopen = handler;
    // If already connected, call handler immediately
    if (handler && this.readyState === 1) {
      handler(new Event("open"));
    }
  }

  get onopen() {
    return this._onopen;
  }

  set onerror(handler: ((event: Event) => void) | null) {
    this._onerror = handler;
  }

  get onerror() {
    return this._onerror;
  }

  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, []);
    }
    this.listeners.get(type)!.push(listener);
  }

  removeEventListener(type: string, listener: (event: MessageEvent) => void) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  }

  close() {
    this.readyState = 2; // CLOSED
  }

  // Test helper to simulate events
  simulateEvent(type: string, data: unknown) {
    const listeners = this.listeners.get(type);
    if (listeners) {
      const event = new MessageEvent("message", {
        data: JSON.stringify(data),
      });
      listeners.forEach((listener) => listener(event));
    }
  }

  // Test helper to simulate error
  simulateError() {
    if (this._onerror) {
      this._onerror(new Event("error"));
    }
  }
}

describe("useSpecialEventsSSE", () => {
  let queryClient: QueryClient;
  let mockEventSource: MockEventSource;

  beforeEach(() => {
    // Create a new QueryClient for each test
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    // Mock EventSource globally
    mockEventSource = new MockEventSource("http://localhost:3001/api/events/stream");

    // Use a constructor function for the mock
    global.EventSource = class {
      constructor() {
        return mockEventSource;
      }
    } as unknown as typeof EventSource;

    // Mock environment variable
    vi.stubEnv("VITE_API_URL", "http://localhost:3001");
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  it("should establish SSE connection on mount", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    // Connection should open immediately
    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    expect(result.current.status.reconnectAttempts).toBe(0);
  });

  it("should handle initial event batch", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Simulate receiving initial batch
    act(() => {
      mockEventSource.simulateEvent("event:batch", mockSpecialEventsBatch);
    });

    // Check that query cache was updated
    await waitFor(() => {
      const cachedData = queryClient.getQueryData<{
        activeEvents: SpecialEvent[];
        total: number;
      }>(["special-events"]);

      expect(cachedData).toBeDefined();
      expect(cachedData?.activeEvents).toHaveLength(3);
      expect(cachedData?.total).toBe(3);
      expect(cachedData?.activeEvents).toEqual(mockSpecialEventsBatch);
    });
  });

  it("should handle new event", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Set initial state with first two events
    queryClient.setQueryData(["special-events"], {
      activeEvents: [mockSpecialEvent1, mockSpecialEvent2],
      total: 2,
    });

    // Simulate receiving new event
    act(() => {
      mockEventSource.simulateEvent("event:new", mockSpecialEvent3);
    });

    // Check that new event was prepended
    await waitFor(() => {
      const cachedData = queryClient.getQueryData<{
        activeEvents: SpecialEvent[];
        total: number;
      }>(["special-events"]);

      expect(cachedData?.activeEvents).toHaveLength(3);
      expect(cachedData?.total).toBe(3);
      expect(cachedData?.activeEvents[0]).toEqual(mockSpecialEvent3);
      expect(cachedData?.activeEvents[1]).toEqual(mockSpecialEvent1);
      expect(cachedData?.activeEvents[2]).toEqual(mockSpecialEvent2);
    });
  });

  it("should handle event update", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Set initial state
    queryClient.setQueryData(["special-events"], {
      activeEvents: mockSpecialEventsBatch,
      total: 3,
    });

    // Simulate event update
    act(() => {
      mockEventSource.simulateEvent("event:update", mockSpecialEventUpdated);
    });

    // Check that event was updated
    await waitFor(() => {
      const cachedData = queryClient.getQueryData<{
        activeEvents: SpecialEvent[];
        total: number;
      }>(["special-events"]);

      expect(cachedData?.activeEvents).toHaveLength(3);
      const updatedEvent = cachedData?.activeEvents.find(
        (evt) => evt.id === "evt-002"
      );
      expect(updatedEvent?.description).toBe("Updated: Comet now at peak brightness");
      expect(updatedEvent?.priority).toBe("critical");
    });
  });

  it("should handle event deletion", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Set initial state
    queryClient.setQueryData(["special-events"], {
      activeEvents: mockSpecialEventsBatch,
      total: 3,
    });

    // Simulate event deletion
    act(() => {
      mockEventSource.simulateEvent("event:delete", { id: "evt-002" });
    });

    // Check that event was removed
    await waitFor(() => {
      const cachedData = queryClient.getQueryData<{
        activeEvents: SpecialEvent[];
        total: number;
      }>(["special-events"]);

      expect(cachedData?.activeEvents).toHaveLength(2);
      expect(cachedData?.total).toBe(2);
      expect(cachedData?.activeEvents.find((evt) => evt.id === "evt-002")).toBeUndefined();
      expect(cachedData?.activeEvents.find((evt) => evt.id === "evt-001")).toBeDefined();
      expect(cachedData?.activeEvents.find((evt) => evt.id === "evt-003")).toBeDefined();
    });
  });

  it("should handle connection error and increment reconnect attempts", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Simulate error
    act(() => {
      mockEventSource.simulateError();
    });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(false);
      expect(result.current.status.reconnectAttempts).toBe(1);
    });

    // Simulate another error
    act(() => {
      mockEventSource.simulateError();
    });

    await waitFor(() => {
      expect(result.current.status.reconnectAttempts).toBe(2);
    });
  });

  it("should close connection on unmount", async () => {
    const { unmount } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(mockEventSource.readyState).toBe(1); // OPEN
    });

    const closeSpy = vi.spyOn(mockEventSource, "close");

    unmount();

    expect(closeSpy).toHaveBeenCalled();
  });

  it("should handle 'connected' event", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Simulate connected event (should not cause any errors)
    act(() => {
      mockEventSource.simulateEvent("connected", {});
    });

    // Connection should still be active
    expect(result.current.status.isConnected).toBe(true);
  });

  it("should handle new event when cache is empty", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Don't set initial data - cache is empty

    // Simulate receiving new event
    act(() => {
      mockEventSource.simulateEvent("event:new", mockSpecialEvent1);
    });

    // Check that event was added to empty cache
    await waitFor(() => {
      const cachedData = queryClient.getQueryData<{
        activeEvents: SpecialEvent[];
        total: number;
      }>(["special-events"]);

      expect(cachedData?.activeEvents).toHaveLength(1);
      expect(cachedData?.total).toBe(1);
      expect(cachedData?.activeEvents[0]).toEqual(mockSpecialEvent1);
    });
  });

  it("should handle event update when cache is empty", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Simulate event update with no cache
    act(() => {
      mockEventSource.simulateEvent("event:update", mockSpecialEventUpdated);
    });

    // Should return empty state
    await waitFor(() => {
      const cachedData = queryClient.getQueryData<{
        activeEvents: SpecialEvent[];
        total: number;
      }>(["special-events"]);

      expect(cachedData?.activeEvents).toEqual([]);
      expect(cachedData?.total).toBe(0);
    });
  });

  it("should handle event deletion when cache is empty", async () => {
    const { result } = renderHook(() => useSpecialEventsSSE(), { wrapper });

    await waitFor(() => {
      expect(result.current.status.isConnected).toBe(true);
    });

    // Simulate event deletion with no cache
    act(() => {
      mockEventSource.simulateEvent("event:delete", { id: "evt-999" });
    });

    // Should return empty state
    await waitFor(() => {
      const cachedData = queryClient.getQueryData<{
        activeEvents: SpecialEvent[];
        total: number;
      }>(["special-events"]);

      expect(cachedData?.activeEvents).toEqual([]);
      expect(cachedData?.total).toBe(0);
    });
  });
});
