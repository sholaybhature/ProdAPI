import "dotenv/config";
import express from "express";
import config from "config";
import morgan from "morgan";
import logger from "./utils/logging.js";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import uploadRoutes from "./router/upload/index.js";
import apiRoutes from "./router/api/v1/index.js";
import verifyToken from "./utils/JWTVerify.js";

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(verifyToken);
app.use(morgan("combined", { stream: logger.stream.write }));
app.use(uploadRoutes);
app.use("/api/v1/", apiRoutes);
app.listen(config.server.port);
