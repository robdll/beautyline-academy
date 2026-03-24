const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
    defaultMeta: { service: "user-service" },
    transports: [
        new DailyRotateFile({
            filename: "logger/error-%DATE%.json",
            level: "error",
            format: winston.format.json(),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "7d",
        }),
        new DailyRotateFile({
            filename: "logger/combined-%DATE%.json",
            level: "info",
            format: winston.format.json(),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "7d",
        }),
        new DailyRotateFile({
            filename: "logger/success-%DATE%.json",
            level: "info",
            format: winston.format.json(),
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "7d",
        }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple(),
        })
    );
}

module.exports = logger;