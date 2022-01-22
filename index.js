import "dotenv/config";
import express from "express";
import config from "config";
import morgan from "morgan";
import logger from "./utils/logging.js";
import uploadRoutes from "./router/upload/index.js";
import apiRoutes from "./router/api/v1/index.js";

logger.info(`Starting express server at port ${config.server.port}`);
const app = express();

app.use(morgan("combined", { stream: logger.stream.write }));
app.use(uploadRoutes);
app.use("/api/v1/", apiRoutes);
app.listen(config.server.port);
