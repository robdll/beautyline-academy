const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const { combine, timestamp, errors, json, colorize, printf } = winston.format;

const jsonFormat = combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    json()
);

const devFormat = combine(
    colorize(),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(({ timestamp, level, message, stack, ...meta }) => {
        const metaStr = Object.keys(meta).length ? JSON.stringify(meta) : "";
        return `${timestamp} [${level}]: ${message} ${metaStr} ${stack ? `\n${stack}` : ""}`;
    })
);

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "info",
    format: jsonFormat,
    defaultMeta: { service: "user-service", environment: process.env.NODE_ENV || "development" },
    transports: [
        new DailyRotateFile({
            filename: "logger/error-%DATE%.log",
            level: "error",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
        new DailyRotateFile({
            filename: "logger/combined-%DATE%.log",
            level: "info",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: devFormat,
        })
    );
}

module.exports = logger;
