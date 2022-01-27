import morgan from "morgan";
import logger from "./logging.js";

const message =
  process.env.NODE_ENV === "production"
    ? ":method :url :status :res[content-length] - :response-time ms"
    : "combined";

const skipSuccess = (req, res) => res.statusCode >= 400;
const skipError = (req, res) => res.statusCode < 400;

export const morganSuccessHandler = morgan(message, {
  skip: skipSuccess,
  stream: { write: (log) => logger.info(log) },
});

export const morganErrorHandler = morgan(message, {
  skip: skipError,
  stream: { write: (log) => logger.error(log) },
});
