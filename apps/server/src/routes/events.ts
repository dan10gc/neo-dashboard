import { randomUUID } from "crypto";
import { Router, type Request, type Response } from "express";
import {
  getActiveEvents,
  getAllEvents,
  getEventById,
} from "../db/queries/special-events.js";
import { InternalServerError, NotFoundError } from "../utils/errors.js";
import { respondWithJSON } from "../utils/json.js";
import { sseManager } from "../services/sse-manager.js";

const router = Router();

// GET /api/events
router.get("/", async (_req: Request, res: Response) => {
  // Implementation goes here
  try {
    const events = await getAllEvents();
    res.json({ events, total: events.length });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/events/stream - SSE endpoint for events stream
router.get("/stream", async (req: Request, res: Response) => {
  const clientId = randomUUID();

  // Set headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // Disable buffering for Nginx

  // send initial comment to establish the connection
  res.write(`event: connected\ndata: ${JSON.stringify({ clientId })}\n\n`);

  // send initial batch of active events
  try {
    const events = await getActiveEvents();
    res.write(`event: event:batch\ndata: ${JSON.stringify(events)}\n\n`);
  } catch (error) {
    console.error("Error fetching initial active events:", error);
  }

  // add client to SSE manager
  sseManager.addClient(clientId, res);

  // handle client disconnect
  req.on("close", () => {
    sseManager.removeClient(clientId);
  });
});

// GET /api/events/active - get active events only
router.get("/active", async (_req: Request, res: Response) => {
  try {
    const activeEvents = await getActiveEvents();
    res.json({ activeEvents, total: activeEvents.length });
  } catch (error) {
    console.error("Error fetching active events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /api/events/:id - get single event by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Fetching event with ID:", id);
    const event = await getEventById(id);

    if (!event) {
      throw new NotFoundError("Event not found");
    }

    respondWithJSON(res, 200, { event });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw new InternalServerError("Failed to fetch event by ID");
  }
});

export default router;
