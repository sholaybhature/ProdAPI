import { APIError } from "../utils/apiError.js";
import { ValidationError } from "express-validation";
import logger from "../config/logging.js";

export const errorHandler = (err, req, res, next) => {
  console.log("what");
  logger.error(err);
  if (!(err instanceof APIError)) {
    err.status = 500;
    err.message = "Something went wrong.";
  }
  res.status(err.status || 500);
  res.send({
    status: err.status,
    message: err.message,
  });
};
