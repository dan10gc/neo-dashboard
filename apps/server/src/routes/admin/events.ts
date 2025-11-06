import { Router, type Request, type Response } from "express";
import { requireGitHubAuth } from "../../middleware/auth";
import { NotFoundError } from "../../utils/errors";
import { NewSpecialEventRow } from "../../db/schema";
import {
  createEvent,
  updateEvent,
  deleteEventById,
} from "../../db/queries/special-events";
import { sseManager } from "../../services/sse-manager";
import { respondWithJSON } from "../../utils/json";
import { logger } from "../../utils/logger";

const router = Router();

// All admin routes require GitHub authentication
router.use(requireGitHubAuth);

// POST /api/admin/events - create a new event
router.post("/", async (req: Request, res: Response) => {
  // Validate required fields
  // const { name, type, origin, description, eventDate, distance, priority } =
  //   req.body;
  // if (
  //   !name ||
  //   !type ||
  //   !origin ||
  //   !description ||
  //   !eventDate ||
  //   !distance?.value ||
  //   !priority
  // ) {
  //   throw new BadRequestError("Missing required fields");
  // }
  const eventData: NewSpecialEventRow = {
    name: req.body.name,
    type: req.body.type,
    origin: req.body.origin,
    description: req.body.description,
    eventDate: new Date(req.body.eventDate),
    eventTimestamp: Date.parse(req.body.eventDate),
    distanceValue: req.body.distance?.value.toString(),
    distanceUnit: req.body.distance?.unit,
    velocityValue: req.body.velocity?.value.toString() || null,
    velocityUnit: req.body.velocity?.unit,
    priority: req.body.priority,
    isActive: req.body.isActive,
    metadata: req.body.metadata,
  };

  const event = await createEvent(eventData);

  sseManager.broadcastNewEvent(event);

  logger.info("Event created successfully", {
    eventId: event.id,
    eventType: event.type,
  });

  respondWithJSON(res, 201, { event });
});

// PUT /api/admin/events/:id - update an existing event
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const updateData: Partial<NewSpecialEventRow> = {
    ...(req.body.name && { name: req.body.name }),
    ...(req.body.type && { type: req.body.type }),
    ...(req.body.origin && { origin: req.body.origin }),
    ...(req.body.description && { description: req.body.description }),
    ...(req.body.eventDate && {
      eventDate: new Date(req.body.eventDate),
      eventTimestamp: Date.parse(req.body.eventDate),
    }),
    ...(req.body.distance && {
      distanceUnit: req.body.distance.unit,
      distanceValue: req.body.distance.value.toString(),
    }),
    ...(req.body.priority && { priority: req.body.priority }),
    ...(typeof req.body.isActive === "boolean" && {
      isActive: req.body.isActive,
    }),
    ...(req.body.metadata && { metadata: req.body.metadata }),
    ...(req.body.velocity && {
      velocityUnit: req.body.velocity.unit,
      velocityValue: req.body.velocity.value.toString(),
    }),
  };

  const updatedEvent = await updateEvent(id, updateData);
  if (!updatedEvent) {
    throw new NotFoundError("Event not found");
  }

  sseManager.broadcastEventUpdate(updatedEvent);

  logger.info("Event updated successfully", { eventId: updatedEvent.id });

  respondWithJSON(res, 200, { event: updatedEvent });
});

// DELETE /api/admin/events/:id - delete an event
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedEvent = await deleteEventById(id);
  if (!deletedEvent) {
    throw new NotFoundError("Event not found");
  }

  sseManager.broadcastEventDeletion(id);

  logger.info("Event deleted successfully", { eventId: id });

  respondWithJSON(res, 200, { message: "Event deleted successfully" });
});

export default router;
