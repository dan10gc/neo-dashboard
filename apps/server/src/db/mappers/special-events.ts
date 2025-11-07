import { SpecialEvent } from "@neo-monitor/shared";
import { SpecialEventRow } from "../schema.js";

/**
 * Maps a database row to the API SpecialEvent format
 * Transforms flat database fields into nested objects
 */
export function mapRowToSpecialEvent(row: SpecialEventRow): SpecialEvent {
  return {
    id: row.id,
    name: row.name,
    type: row.type as SpecialEvent["type"],
    origin: row.origin as SpecialEvent["origin"],
    description: row.description,
    eventDate: row.eventDate.toISOString(),
    eventTimestamp: row.eventTimestamp,
    distance: {
      value: Number(row.distanceValue),
      unit: row.distanceUnit as SpecialEvent["distance"]["unit"],
    },
    velocity: row.velocityValue && row.velocityUnit
      ? {
          value: Number(row.velocityValue),
          unit: row.velocityUnit as NonNullable<SpecialEvent["velocity"]>["unit"],
        }
      : undefined,
    priority: row.priority as SpecialEvent["priority"],
    isActive: row.isActive ?? true,
    metadata: row.metadata ?? undefined,
    createdAt: row.createdAt.getTime(),
    updatedAt: row.updatedAt.getTime(),
  };
}

/**
 * Maps an array of database rows to API SpecialEvent format
 */
export function mapRowsToSpecialEvents(rows: SpecialEventRow[]): SpecialEvent[] {
  return rows.map(mapRowToSpecialEvent);
}
