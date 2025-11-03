import { Router, type Request, type Response } from "express";
import {
  getActiveEvents,
  getAllEvents,
  getEventById,
} from "../db/queries/special-events";

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
    const event = await getEventById(id);

    if (!event) {
      res.status(404).json({ error: "Event not found" });
    }

    res.json({ event });
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
