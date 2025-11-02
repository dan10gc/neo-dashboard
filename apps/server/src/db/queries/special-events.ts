import { desc, eq } from "drizzle-orm";
import { NewSpecialEventRow, SpecialEventRow, specialEvents } from "../schema";
import { db } from "../index";

// get all events
export async function getAllEvents(): Promise<SpecialEventRow[]> {
  // Implementation goes here
  return db.select().from(specialEvents).orderBy(desc(specialEvents.createdAt));
}

// get active events only (sorted by priority)
export async function getActiveEvents(): Promise<SpecialEventRow[]> {
  return db
    .select()
    .from(specialEvents)
    .where(eq(specialEvents.isActive, true))
    .orderBy(desc(specialEvents.priority), desc(specialEvents.eventDate));
}

// get single event by ID
export async function getEventById(
  id: string
): Promise<SpecialEventRow | undefined> {
  const result = await db
    .select()
    .from(specialEvents)
    .where(eq(specialEvents.id, id));

  if (result.length === 0) {
    return undefined;
  }

  return result[0];
}

// create new event
export async function createEvent(
  event: NewSpecialEventRow
): Promise<SpecialEventRow> {
  const [newEvent] = await db.insert(specialEvents).values(event).returning();

  return newEvent;
}

// update existing event

export async function updateEvent(
  id: string,
  event: Partial<NewSpecialEventRow>
): Promise<SpecialEventRow | undefined> {
  const [updatedEvent] = await db
    .update(specialEvents)
    .set({
      ...event,
      updatedAt: new Date(), // manually update the timestamp
    })
    .where(eq(specialEvents.id, id))
    .returning();

  return updatedEvent;
}

// delete event by ID
export async function deleteEventById(
  id: string
): Promise<SpecialEventRow | undefined> {
  const [deletedEvent] = await db
    .delete(specialEvents)
    .where(eq(specialEvents.id, id))
    .returning();

  return deletedEvent;
}
