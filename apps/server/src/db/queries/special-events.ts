import { desc, eq } from "drizzle-orm";
import { NewSpecialEventRow, specialEvents } from "../schema.js";
import { db } from "../index.js";
import { SpecialEvent } from "@neo-monitor/shared";
import {
  mapRowToSpecialEvent,
  mapRowsToSpecialEvents,
} from "../mappers/special-events.js";

// get all events
export async function getAllEvents(): Promise<SpecialEvent[]> {
  const rows = await db
    .select()
    .from(specialEvents)
    .orderBy(desc(specialEvents.createdAt));
  return mapRowsToSpecialEvents(rows);
}

// get active events only (sorted by priority)
export async function getActiveEvents(): Promise<SpecialEvent[]> {
  const rows = await db
    .select()
    .from(specialEvents)
    .where(eq(specialEvents.isActive, true))
    .orderBy(desc(specialEvents.priority), desc(specialEvents.eventDate));
  return mapRowsToSpecialEvents(rows);
}

// get single event by ID
export async function getEventById(
  id: string
): Promise<SpecialEvent | undefined> {
  const result = await db
    .select()
    .from(specialEvents)
    .where(eq(specialEvents.id, id))
    .limit(1);

  if (result.length === 0) {
    return undefined;
  }

  return mapRowToSpecialEvent(result[0]);
}

// create new event
export async function createEvent(
  event: NewSpecialEventRow
): Promise<SpecialEvent> {
  const [newEvent] = await db.insert(specialEvents).values(event).returning();

  return mapRowToSpecialEvent(newEvent);
}

// update existing event
export async function updateEvent(
  id: string,
  event: Partial<NewSpecialEventRow>
): Promise<SpecialEvent | undefined> {
  const [updatedEvent] = await db
    .update(specialEvents)
    .set({
      ...event,
      updatedAt: new Date(), // manually update the timestamp
    })
    .where(eq(specialEvents.id, id))
    .returning();

  if (!updatedEvent) {
    return undefined;
  }

  return mapRowToSpecialEvent(updatedEvent);
}

// delete event by ID
export async function deleteEventById(
  id: string
): Promise<SpecialEvent | undefined> {
  const [deletedEvent] = await db
    .delete(specialEvents)
    .where(eq(specialEvents.id, id))
    .returning();

  if (!deletedEvent) {
    return undefined;
  }

  return mapRowToSpecialEvent(deletedEvent);
}
