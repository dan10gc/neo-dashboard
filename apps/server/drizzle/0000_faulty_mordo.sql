CREATE TABLE "special_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" varchar(50) NOT NULL,
	"origin" varchar(50) NOT NULL,
	"description" varchar NOT NULL,
	"event_date" timestamp with time zone NOT NULL,
	"event_timestamp" bigint NOT NULL,
	"distance_value" numeric NOT NULL,
	"distance_unit" varchar(10) DEFAULT 'AU' NOT NULL,
	"velocity_value" numeric,
	"velocity_unit" varchar(10) DEFAULT 'km/s',
	"priority" varchar(20) NOT NULL,
	"is_active" boolean DEFAULT true,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_special_events_active" ON "special_events" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "idx_special_events_priority" ON "special_events" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "idx_special_events_type" ON "special_events" USING btree ("type");--> statement-breakpoint
CREATE INDEX "idx_special_events_event_date" ON "special_events" USING btree ("event_date");