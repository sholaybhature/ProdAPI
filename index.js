import "dotenv/config";
import express from "express";
import config from "config";
import morgan from "morgan";
import logger from "./utils/logging.js";
import uploadRoutes from "./router/upload/index.js";
// import redisRateLimiter from "./utils/rateLimit.js";

const app = express();
logger.info(`Started express server at port ${config.server.port}`);

app.use(morgan("combined", { stream: logger.stream.write }));
// app.use(redisRateLimiter);
app.use(uploadRoutes);
app.get("/", function (req, res) {
  logger.info("hello");
  res.send("Hello World!");
});
app.listen(config.server.port);
