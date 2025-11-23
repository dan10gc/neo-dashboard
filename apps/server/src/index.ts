import * as Sentry from "@sentry/node";
import express, { Request, Response } from "express";
import cors from "cors";
import { middlewareLogResponses } from "./utils/logger.js";
import { errorHandler } from "./middleware/error.js";
// Load environment variables
import { env } from "./config.js";
import { sseManager } from "./services/sse-manager.js";
import eventsRouter from "./routes/events.js";
import adminEventsRouter from "./routes/admin/events.js";

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

// robots.txt - disallow all crawlers from API
app.get("/robots.txt", (_req: Request, res: Response) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /\n");
});

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

app.use("/api/events", eventsRouter);
app.use("/api/admin/events", adminEventsRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Sentry error handler must be before custom error handlers
Sentry.setupExpressErrorHandler(app);

app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API status: http://localhost:${PORT}/api/status`);
});

const shutdown = async () => {
  console.log("Shutting down server...");
  sseManager.stop();

  // Flush any pending Sentry events
  await Sentry.close(2000); // Wait up to 2 seconds for events to be sent

  server.close(() => {
    console.log("Server closed.");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
