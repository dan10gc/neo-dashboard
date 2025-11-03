import express, { Request, Response } from "express";
import cors from "cors";
import { middlewareLogResponses } from "./utils/logger";
import { errorHandler } from "./middleware/error";
// Load environment variables
import { env } from "./config";
import { sseManager } from "./services/sse-manager";
import eventsRouter from "./routes/events";
import eventsStreamRouter from "./routes/events-stream";
import adminEventsRouter from "./routes/admin/events";

const app = express();
const PORT = env.API.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: env.API.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(middlewareLogResponses);

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    sseClients: sseManager.getStats().connectedClients,
  });
});

// API routes
app.get("/api/status", (_req: Request, res: Response) => {
  res.json({
    message: "NEO Monitor API is running",
    version: "1.0.0",
    sse: sseManager.getStats(),
  });
});

app.use("/api/events", eventsStreamRouter);
app.use("/api/events", eventsRouter);
app.use("/api/admin/events", adminEventsRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API status: http://localhost:${PORT}/api/status`);
});

const shutdown = () => {
  console.log("Shutting down server...");
  sseManager.stop();
  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
