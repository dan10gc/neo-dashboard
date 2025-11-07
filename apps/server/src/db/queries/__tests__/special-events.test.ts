import { describe, it, expect, vi, beforeEach } from "vitest";
import * as queries from "../special-events.js";

import { specialEvents } from "../../schema.js";
import { db } from "../../index.js";

// Mock the database
vi.mock("../..", () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("Special Events Queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getActiveEvents", () => {
    it("should return active events ordered by priority", async () => {
      // Arrange: Set up mock data
      const mockEvents = [
        {
          id: "1",
          name: "Oumuamua",
          type: "interstellar_object",
          origin: "interstellar",
          description: "First interstellar object",
          eventDate: new Date("2017-10-19"),
          eventTimestamp: Date.parse("2017-10-19"),
          distanceValue: "0.5",
          distanceUnit: "AU",
          velocityValue: "26.0",
          velocityUnit: "km/s",
          priority: "critical",
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      // Mock the chained query methods
      const mockOrderBy = vi.fn().mockResolvedValue(mockEvents);
      const mockWhere = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      // Act: Call the function
      const result = await queries.getActiveEvents();

      // Assert: Check the results
      expect(db.select).toHaveBeenCalled();
      expect(mockFrom).toHaveBeenCalledWith(specialEvents);
      expect(mockWhere).toHaveBeenCalled();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Oumuamua");
      expect(result[0].distance.value).toBe(0.5);
      expect(result[0].distance.unit).toBe("AU");
    });

    it("should return empty array when no active events", async () => {
      // Arrange
      const mockOrderBy = vi.fn().mockResolvedValue([]);
      const mockWhere = vi.fn().mockReturnValue({ orderBy: mockOrderBy });
      const mockFrom = vi.fn().mockReturnValue({ where: mockWhere });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(db.select).mockReturnValue({ from: mockFrom } as any);

      // Act
      const result = await queries.getActiveEvents();

      // Assert
      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });
  });

  describe("createEvent", () => {
    it("should create a new event and return it", async () => {
      // Arrange
      const newEvent = {
        name: "Test Comet",
        type: "interstellar_object",
        origin: "interstellar",
        description: "Test description",
        eventDate: new Date("2025-01-01"),
        eventTimestamp: Date.parse("2025-01-01"),
        distanceValue: "1.0",
        distanceUnit: "AU",
        velocityValue: "26.0",
        velocityUnit: "km/s",
        priority: "high",
      };

      const createdEvent = {
        id: "123",
        ...newEvent,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockReturning = vi.fn().mockResolvedValue([createdEvent]);
      const mockValues = vi.fn().mockReturnValue({ returning: mockReturning });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(db.insert).mockReturnValue({ values: mockValues } as any);

      // Act
      const result = await queries.createEvent(newEvent);

      // Assert
      expect(db.insert).toHaveBeenCalledWith(specialEvents);
      expect(mockValues).toHaveBeenCalledWith(newEvent);
      expect(result.id).toBe("123");
      expect(result.name).toBe("Test Comet");
      expect(result.type).toBe("interstellar_object");
      expect(result.isActive).toBe(true);
    });
  });

  describe("deleteEvent", () => {
    it("should delete event and return defined when event exists", async () => {
      // Arrange
      const eventId = "123";
      const deletedEvent = {
        id: eventId,
        name: "Test",
        type: "interstellar_object",
        origin: "interstellar",
        description: "Test",
        eventDate: new Date(),
        eventTimestamp: Date.now(),
        distanceValue: "1.0",
        distanceUnit: "AU",
        priority: "high",
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockReturning = vi.fn().mockResolvedValue([deletedEvent]);
      const mockWhere = vi.fn().mockReturnValue({ returning: mockReturning });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(db.delete).mockReturnValue({ where: mockWhere } as any);

      // Act
      const result = await queries.deleteEventById(eventId);

      // Assert
      expect(db.delete).toHaveBeenCalledWith(specialEvents);
      expect(result).toBeDefined();
      expect(result?.id).toBe(eventId);
    });
    it("should return undefined when event does not exist", async () => {
      // Arrange
      const eventId = "non-existent";
      const mockReturning = vi.fn().mockResolvedValue([]);
      const mockWhere = vi.fn().mockReturnValue({ returning: mockReturning });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      vi.mocked(db.delete).mockReturnValue({ where: mockWhere } as any);

      // Act
      const result = await queries.deleteEventById(eventId);

      // Assert
      expect(result).toBeUndefined();
    });
  });
});
