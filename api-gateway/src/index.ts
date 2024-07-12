import express, { Express } from "express";
import dotenv from "dotenv";

import imageManager from "./components/image-manager";
import imageRetriever from "./components/image-retriever";
import { logger } from "./logger/logger";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 7001;

dotenv.config();

app.use("/api", imageManager);
// app.use('/api/retrieve', imageRetriever);

const server = app.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

process.on("uncaughtException", (err) => {
  logger.warn("Uncaught Exception:", err);
  process.exit(1); // Exit the process with a failure code
});

// Handle SIGTERM
process.on("SIGTERM", () => {
  logger.warn("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(0); // Exit the process cleanly
  });
});
