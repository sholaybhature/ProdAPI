import { APIError } from "../utils/apiError.js";
import logger from "../config/logging.js";

export const errorHandler = (err, req, res, next) => {
  logger.warn(err);
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
