import "dotenv/config";
import logger from "./config/logging.js";
import config from "config";
import mongoose from "mongoose";
import app from "./app.js";

let server;
mongoose
  .connect(config.server.db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    logger.info("Connected to MongoDB");
    server = app.listen(config.server.port, () => {
      logger.info(`Listening to port ${config.server.port}`);
    });
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
