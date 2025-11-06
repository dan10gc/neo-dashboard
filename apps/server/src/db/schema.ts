import {
  bigint,
  boolean,
  index,
  jsonb,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import type { EventMetadata } from "@neo-monitor/shared";

export const specialEvents = pgTable(
  "special_events",
  {
    // Primary Key
    id: uuid("id").primaryKey().defaultRandom(),

    // Basic information
    name: varchar("name", { length: 255 }).notNull(),
    type: varchar("type", { length: 50 }).notNull(),
    origin: varchar("origin", { length: 50 }).notNull(),
    description: varchar("description").notNull(),

    // Event timing
    eventDate: timestamp("event_date", { withTimezone: true }).notNull(),
    eventTimestamp: bigint("event_timestamp", { mode: "number" }).notNull(),

    // Scientific measurements
    distanceValue: numeric("distance_value").notNull(),
    distanceUnit: varchar("distance_unit", { length: 10 })
      .notNull()
      .default("AU"),
    velocityValue: numeric("velocity_value"),
    velocityUnit: varchar("velocity_unit", { length: 10 }).default("km/s"),

    // display properties
    priority: varchar("priority", { length: 20 }).notNull(),
    isActive: boolean("is_active").default(true),

    // metadata
    metadata: jsonb("metadata").$type<EventMetadata>(),

    // timestamps
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at")
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    // Indexes for query performance
    index("idx_special_events_active").on(table.isActive),
    index("idx_special_events_priority").on(table.priority),
    index("idx_special_events_type").on(table.type),
    index("idx_special_events_event_date").on(table.eventDate),
  ]
);

export type SpecialEventRow = typeof specialEvents.$inferSelect;
export type NewSpecialEventRow = typeof specialEvents.$inferInsert;
