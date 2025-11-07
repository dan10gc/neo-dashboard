import { randomUUID } from "crypto";
import { Router, type Request, type Response } from "express";
import { sseManager } from "../services/sse-manager.js";
import { getActiveEvents } from "../db/queries/special-events.js";

const router = Router();

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

export default router;
