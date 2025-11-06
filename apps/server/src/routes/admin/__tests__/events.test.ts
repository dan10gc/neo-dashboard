import { describe, it, expect, vi, beforeEach } from "vitest";
import request from "supertest";
import express from "express";
import type { Express } from "express";
import router from "../events";
import { requireGitHubAuth } from "../../../middleware/auth";
import {
  createEvent,
  updateEvent,
  deleteEventById,
} from "../../../db/queries/special-events";
import { sseManager } from "../../../services/sse-manager";
import type { SpecialEvent } from "@neo-monitor/shared";
import { errorHandler } from "../../../middleware/error";

// Mock dependencies
vi.mock("../../../db/queries/special-events");
vi.mock("../../../middleware/auth");
vi.mock("../../../services/sse-manager", () => ({
  sseManager: {
    broadcastNewEvent: vi.fn(),
    broadcastEventUpdate: vi.fn(),
    broadcastEventDeletion: vi.fn(),
  },
}));

// Mock JSON utility functions to use actual Express json methods
vi.mock("../../../utils/json", () => ({
  respondWithJSON: (
    res: express.Response,
    statusCode: number,
    data: unknown
  ) => {
    res.status(statusCode).json(data);
  },
  respondWithError: (
    res: express.Response,
    statusCode: number,
    message: string
  ) => {
    res.status(statusCode).json({ error: message });
  },
}));

describe("Admin Events Routes", () => {
  let app: Express;

  beforeEach(() => {
    vi.clearAllMocks();

    // Create test Express app
    app = express();
    app.use(express.json());
    app.use("/api/admin/events", router);

    // Add error handler middleware (must be after routes)
    app.use(errorHandler);

    // Mock auth middleware to always pass
    vi.mocked(requireGitHubAuth).mockImplementation(async (req, _res, next) => {
      next();
    });
  });

  describe("POST /api/admin/events", () => {
    it("should create a new event and broadcast it", async () => {
      // Arrange
      // API payload format (nested distance/velocity objects)
      const newEventPayload = {
        eventDate: "2025-01-01T00:00:00Z",
        description: "Test description",
        name: "Test Object",
        type: "interstellar_object",
        distance: {
          value: 0.5,
          unit: "AU",
        },
        velocity: {
          value: 26.0,
          unit: "km/s",
        },
        priority: "high",
        origin: "interstellar",
        isActive: true,
      };

      const createdEvent: SpecialEvent = {
        description: "Test description",
        id: "123",
        name: "Test Object",
        type: "interstellar_object",
        distance: {
          value: 0.5,
          unit: "AU",
        },
        velocity: {
          value: 26,
          unit: "km/s",
        },
        priority: "high",
        origin: "interstellar",
        isActive: true,
        metadata: undefined,
        eventDate: new Date().toISOString(),
        eventTimestamp: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      vi.mocked(createEvent).mockResolvedValue(createdEvent);

      // Act
      const response = await request(app)
        .post("/api/admin/events")
        .send(newEventPayload)
        .expect(201);

      // Assert
      expect(response.body.event).toEqual(createdEvent);
      expect(createEvent).toHaveBeenCalledWith({
        name: "Test Object",
        type: "interstellar_object",
        origin: "interstellar",
        description: "Test description",
        eventDate: expect.any(Date),
        eventTimestamp: expect.any(Number),
        distanceValue: "0.5",
        distanceUnit: "AU",
        velocityValue: "26",
        velocityUnit: "km/s",
        priority: "high",
        isActive: true,
        metadata: undefined,
      });
      expect(sseManager.broadcastNewEvent).toHaveBeenCalledWith(createdEvent);
    });

    // TODO: Add validation middleware (Zod) and re-enable this test
    it.skip("should return 400 when required fields are missing", async () => {
      // Arrange
      const invalidPayload = {
        name: "Test Object",
        // Missing type, distance, etc.
      };

      // Act
      const response = await request(app)
        .post("/api/admin/events")
        .send(invalidPayload)
        .expect(400);

      // Assert
      expect(response.body.error).toBeDefined();
      expect(createEvent).not.toHaveBeenCalled();
      expect(sseManager.broadcastNewEvent).not.toHaveBeenCalled();
    });

    it("should return 500 when database error occurs", async () => {
      // Arrange
      const validPayload = {
        name: "Test Object",
        type: "interstellar_object",
        distance: { value: 0.5, unit: "AU" },
        velocity: { value: 26.0, unit: "km/s" },
        priority: "high",
        origin: "interstellar",
        eventDate: "2025-01-01",
        description: "Test",
      };

      vi.mocked(createEvent).mockRejectedValue(
        new Error("Database connection failed")
      );

      // Act
      const response = await request(app)
        .post("/api/admin/events")
        .send(validPayload)
        .expect(500);
      // Generic message protects against internal error details leaking
      expect(response.body.error).toBe(
        "An unexpected error occurred. Please try again later."
      );
    });
  });

  describe("PUT /api/admin/events/:id", () => {
    it("should update an existing event and broadcast update", async () => {
      // Arrange
      const eventId = "123";
      const updatePayload = {
        name: "Updated Name",
        priority: "critical",
      };

      const updatedEvent: SpecialEvent = {
        id: eventId,
        name: "Updated Name",
        type: "interstellar_object",
        distance: {
          value: 0.5,
          unit: "AU",
        },
        velocity: {
          value: 26.0,
          unit: "km/s",
        },
        priority: "critical",
        origin: "interstellar",
        isActive: true,
        description: "Test description",
        eventDate: "2025-01-01",
        eventTimestamp: Date.parse("2025-01-01"),
        createdAt: Date.parse("2025-01-01T00:00:00Z"),
        updatedAt: Date.parse("2025-01-05T00:00:00Z"),
      };

      vi.mocked(updateEvent).mockResolvedValue(updatedEvent);

      // Act
      const response = await request(app)
        .put(`/api/admin/events/${eventId}`)
        .send(updatePayload)
        .expect(200);

      // Assert
      expect(response.body.event).toEqual(updatedEvent);
      expect(updateEvent).toHaveBeenCalledWith(eventId, updatePayload);
      expect(sseManager.broadcastEventUpdate).toHaveBeenCalledWith(
        updatedEvent
      );
    });

    it("should return 404 when event not found", async () => {
      // Arrange
      const eventId = "non-existent";
      vi.mocked(updateEvent).mockResolvedValue(undefined);

      // Act
      const response = await request(app)
        .put(`/api/admin/events/${eventId}`)
        .send({ name: "New Name" })
        .expect(404);

      // Assert
      expect(response.body.error).toBe("Event not found");
    });
  });

  describe("DELETE /api/admin/events/:id", () => {
    it("should delete event and broadcast deletion", async () => {
      // Arrange
      const eventId = "123";
      const deletedEvent: SpecialEvent = {
        id: eventId,
        name: "Test Event",
        type: "interstellar_object",
        distance: { value: 0.5, unit: "AU" },
        priority: "high",
        origin: "interstellar",
        isActive: false,
        eventDate: "2025-01-01",
        eventTimestamp: Date.parse("2025-01-01"),
        description: "Test description",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      vi.mocked(deleteEventById).mockResolvedValue(deletedEvent);

      // Act
      const response = await request(app)
        .delete(`/api/admin/events/${eventId}`)
        .expect(200);

      // Assert
      expect(response.body.message).toBe("Event deleted successfully");
      expect(deleteEventById).toHaveBeenCalledWith(eventId);
      expect(sseManager.broadcastEventDeletion).toHaveBeenCalledWith(eventId);
    });

    it("should return 404 when event does not exist", async () => {
      // Arrange
      const eventId = "non-existent";
      vi.mocked(deleteEventById).mockResolvedValue(undefined);

      // Act
      const response = await request(app)
        .delete(`/api/admin/events/${eventId}`)
        .expect(404);

      // Assert
      expect(response.body.error).toBe("Event not found");
      expect(sseManager.broadcastEventDeletion).not.toHaveBeenCalled();
    });
  });
});
