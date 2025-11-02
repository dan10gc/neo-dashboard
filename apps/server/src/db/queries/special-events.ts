import { desc, eq } from "drizzle-orm";
import { SpecialEventRow, specialEvents } from "../schema";
import { db } from "../index";

// get all events
export async function getAllEvents(): Promise<SpecialEventRow[]> {
  // Implementation goes here
  return db.select().from(specialEvents).orderBy(desc(specialEvents.createdAt));
}

// get active events only (sorted by priority)

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

// update existing event

// delete event by ID
