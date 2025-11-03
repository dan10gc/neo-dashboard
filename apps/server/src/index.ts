import express, { Request, Response } from "express";
import cors from "cors";
import { middlewareLogResponses } from "./utils/logger";
import { errorHandler } from "./middleware/error";
// Load environment variables
import { env } from "./config";

const app = express();
const PORT = env.API.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(middlewareLogResponses);

// Health check endpoint
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.get("/api/status", (_req: Request, res: Response) => {
  res.json({
    message: "NEO Monitor API is running",
    version: "1.0.0",
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API status: http://localhost:${PORT}/api/status`);
});
