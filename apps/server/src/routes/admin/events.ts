import { Router, type Request, type Response } from "express";
import { requireGitHubAuth } from "../../middleware/auth";
import { InternalServerError, NotFoundError } from "../../utils/errors";
import { NewSpecialEventRow } from "../../db/schema";
import { createEvent, updateEvent } from "../../db/queries/special-events";
import { sseManager } from "../../services/sse-manager";
import { respondWithJSON } from "../../utils/json";

const router = Router();

// All admin routes require GitHub authentication
router.use(requireGitHubAuth);

// POST /api/admin/events - create a new event
router.post("/", async (req: Request, res: Response) => {
  try {
    const eventData: NewSpecialEventRow = {
      name: req.body.name,
      type: req.body.type,
      origin: req.body.origin,
      description: req.body.description,
      eventDate: new Date(req.body.eventDate),
      eventTimestamp: Date.parse(req.body.eventDate),
      distanceValue: req.body.distanceValue.value.toString(),
      distanceUnit: req.body.distanceValue.unit,
      velocityValue: req.body.velocityValue?.value.toString() || null,
      velocityUnit: req.body.velocityValue?.unit,
      priority: req.body.priority,
      isActive: req.body.isActive,
      metadata: req.body.metadata,
    };

    const event = await createEvent(eventData);

    sseManager.broadcastNewEvent(event);

    console.log("Event created successfully:", event.id);

    respondWithJSON(res, 201, { event });
  } catch (error) {
    console.log("Error creating event:", error);
    throw new InternalServerError("Failed to create event");
  }
});

// PUT /api/admin/events/:id - update an existing event
router.put("/:id", async (req: Request, res: Response) => {
  try {
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

    console.log("Event updated successfully:", updatedEvent.id);

    respondWithJSON(res, 200, { event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    throw new InternalServerError("Failed to update event");
  }
});

// DELETE /api/admin/events/:id - delete an event
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedEvent = await updateEvent(id, { isActive: false });
    if (!deletedEvent) {
      throw new NotFoundError("Event not found");
    }

    sseManager.broadcastEventDeletion(id);

    console.log("Event deleted successfully:", id);

    respondWithJSON(res, 200, { event: deletedEvent });
  } catch (error) {
    console.error("Error deleting event:", error);
    throw new InternalServerError("Failed to delete event");
  }
});

export default router;
