import { createLogger, format, transports } from "winston";

const { combine, timestamp, errors, printf } = format;

const logFormat = combine(
  timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  errors({ stack: true }),
  printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);

const logTransports = [
  new transports.File({ filename: "logs/error.log", level: "error" }),
  new transports.File({ filename: "logs/combined.log" }),
];

const logger = createLogger({
  format: logFormat,
  transports: logTransports,
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: logFormat,
    })
  );
}

export default logger;
