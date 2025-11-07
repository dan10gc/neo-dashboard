import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { SpecialEvent } from "@/types/special-events";

interface ConnectionStatus {
  isConnected: boolean;
  lastHeartbeat: number | null;
  reconnectAttempts: number;
}
export const useSpecialEventsSSE = () => {
  // Implementation for connecting to the SSE endpoint for special events
  const [status, setStatus] = useState<ConnectionStatus>({
    isConnected: false,
    lastHeartbeat: null,
    reconnectAttempts: 0,
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const eventSource = new EventSource(`${apiUrl}/api/events/stream`);

    //connection opened
    eventSource.onopen = () => {
      console.log("🔌 SSE connection opened.");
      setStatus((prev) => ({
        ...prev,
        isConnected: true,
        reconnectAttempts: 0,
      }));
    };

    // connection error
    eventSource.onerror = () => {
      console.error("❌ SSE connection error.");
      setStatus((prev) => ({
        ...prev,
        isConnected: false,
        reconnectAttempts: prev.reconnectAttempts + 1,
      }));
    };

    //listed for connected event
    eventSource.addEventListener("connected", (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      console.log("✅ SSE connected event:", data);
    });

    // listen for initial batch of events
    eventSource.addEventListener("event:batch", (event: MessageEvent) => {
      const events = JSON.parse(event.data);
      // console.log(
      //   `📥 Initial batch of ${events.length} special events received via SSE.`
      // );

      // populate cache with correct format
      queryClient.setQueryData(["special-events"], {
        activeEvents: events,
        total: events.length,
      });
    });

    // listen for new events
    eventSource.addEventListener("event:new", (event: MessageEvent) => {
      const newEvent = JSON.parse(event.data);
      // console.log("🆕 New special event received via SSE:", newEvent);

      //   // Show browser notification if supported
      //   if (event.priority === 'critical' && 'Notification' in window && Notification.permission === 'granted') {
      //     new Notification('New Space Event!', {
      //       body: event.name,
      //       icon: '/favicon.ico',
      //     });
      //   }
      // add to cache
      queryClient.setQueryData(
        ["special-events"],
        (oldData: { activeEvents: SpecialEvent[]; total: number } | undefined) => {
          const events = [newEvent, ...(oldData?.activeEvents || [])];
          return { activeEvents: events, total: events.length };
        }
      );
      //   queryClient.invalidateQueries({ queryKey: ["special-events"] });
    });

    // listen for event updates
    eventSource.addEventListener("event:update", (event: MessageEvent) => {
      const updatedEvent = JSON.parse(event.data);
      // console.log("✏️ Special event update received via SSE:", updatedEvent);

      // update cache
      queryClient.setQueryData(
        ["special-events"],
        (oldData: { activeEvents: SpecialEvent[]; total: number } | undefined) => {
          if (!oldData) return { activeEvents: [], total: 0 };
          const events = oldData.activeEvents.map((evt) =>
            evt.id === updatedEvent.id ? updatedEvent : evt
          );
          return { activeEvents: events, total: events.length };
        }
      );
      //   queryClient.invalidateQueries({ queryKey: ["special-events"] });
    });

    // listen for event deletions
    eventSource.addEventListener("event:delete", (event: MessageEvent) => {
      const deletedData = JSON.parse(event.data);
      // console.log("🗑️ Special event deletion received via SSE:", deletedData);

      // remove from cache
      queryClient.setQueryData(
        ["special-events"],
        (oldData: { activeEvents: SpecialEvent[]; total: number } | undefined) => {
          if (!oldData) return { activeEvents: [], total: 0 };
          const events = oldData.activeEvents.filter((evt) => evt.id !== deletedData.id);
          return { activeEvents: events, total: events.length };
        }
      );
    });

    // update heartbeat timestamp (for connection monitoring)
    const heartbeatInterval = setInterval(() => {
      setStatus((prev) => ({
        ...prev,
        lastHeartbeat: Date.now(),
      }));
    }, 30000); // every 30 seconds

    return () => {
      eventSource.close();
      clearInterval(heartbeatInterval);
      console.log("🔌 SSE connection closed.");
    };
    //   queryClient.invalidateQueries({ queryKey
  }, [queryClient]);

  return { status };
};
