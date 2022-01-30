import express from "express";
import bodyParser from "body-parser";
import xss from "xss-clean";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";

import apiRoutes from "./router/v1/index.js";

import { morganSuccessHandler, morganErrorHandler } from "./config/morgan.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morganSuccessHandler);
app.use(morganErrorHandler);
app.use("/api/v1", apiRoutes);
app.use(errorHandler);

export default app;
