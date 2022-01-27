import "dotenv/config";
import express from "express";
import config from "config";
import logger from "./config/logging.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import xss from "xss-clean";
import cors from "cors";
import helmet from "helmet";
import { morganSuccessHandler, morganErrorHandler } from "./config/morgan.js";

import uploadRoutes from "./router/upload/index.js";
import apiRoutes from "./router/api/v1/index.js";
import verifyToken from "./middlewares/JWTVerify.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { APIError } from "./utils/apiError.js";

mongoose.connect(config.server.db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", function () {
  console.log("error connecting to db");
});
db.once("open", function () {
  console.log("Connected successfully");
});
logger.info(`Starting express server at port ${config.server.port}`);
const app = express();
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(verifyToken);
app.use(morganSuccessHandler);
app.use(morganErrorHandler);
app.use(uploadRoutes);
app.use("/api/v1/", apiRoutes);
app.use((req, res, next) => {
  next(new APIError("Not found", 404));
});
app.use(errorHandler);
app.listen(config.server.port);
