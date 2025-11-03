import type { Response } from "express";
import { SpecialEventRow } from "../db/schema";
import { SSEEventType } from "@neo-monitor/shared";

export class SSEManager {
  private clients: Map<string, Response> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Start the heartbeat when the manager is created
    this.startHeartbeat();
  }

  // Add a new client
  addClient(clientId: string, res: Response) {
    this.clients.set(clientId, res);
    console.log(
      `📡 SSE client connected: ${clientId} (total: ${this.clients.size})`
    );
  }

  removeClient(clientId: string) {
    this.clients.delete(clientId);
    console.log(
      `❌ SSE client disconnected: ${clientId} (total: ${this.clients.size})`
    );
  }

  broadcastNewEvent(event: SpecialEventRow): void {
    console.log(
      `📢 Broadcasting new event: ${event.id} to ${this.clients.size} clients`
    );
    this.broadcast("event:new", event);
  }

  broadcastEventUpdate(event: SpecialEventRow): void {
    console.log(
      `📢 Broadcasting event update: ${event.id} to ${this.clients.size} clients`
    );
    this.broadcast("event:update", event);
  }

  broadcastEventDeletion(eventId: string): void {
    console.log(
      `📢 Broadcasting event deletion: ${eventId} to ${this.clients.size} clients`
    );
    this.broadcast("event:delete", { id: eventId });
  }

  private broadcast(
    eventType: SSEEventType,
    data: SpecialEventRow | { id: string }
  ): void {
    const message = `event: ${eventType}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const [clientId, res] of this.clients.entries()) {
      try {
        res.write(message);
      } catch (error) {
        console.error(`Error sending message to client ${clientId}:`, error);
        this.removeClient(clientId);
      }
    }
  }

  private heartbeat() {
    const message = ": heartbeat\n\n";

    for (const [clientId, res] of this.clients.entries()) {
      try {
        res.write(message);
      } catch (error) {
        console.error(`Error sending heartbeat to client ${clientId}:`, error);
        this.removeClient(clientId);
      }
    }
  }

  // Start sending heartbeats every 30 seconds
  private startHeartbeat() {
    // if (this.heartbeatInterval) return;

    this.heartbeatInterval = setInterval(() => {
      if (this.clients.size > 0) {
        console.log(`💓 Sending heartbeat to ${this.clients.size} clients`);
        this.heartbeat();
      }
    }, 30000);
  }

  // Stop sending heartbeats
  stop() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // get connection stats
  getStats() {
    return {
      connectedClients: this.clients.size,
      clientIds: Array.from(this.clients.keys()),
    };
  }
}

// Singleton instance
export const sseManager = new SSEManager();
