
// Priority levels in Winston

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   verbose: 4,
//   debug: 5,
//   silly: 6
// };


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
    defaultMeta: { service: "backend", environment: process.env.NODE_ENV || "development" },
    transports: [
        new DailyRotateFile({  //Priority 0
            filename: "logger/error-%DATE%.log",
            level: "error",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
        new DailyRotateFile({  // Priority 2
            filename: "logger/combined-%DATE%.log",
            level: "info",
            datePattern: "YYYY-MM-DD",
            zippedArchive: true,
            maxSize: "20m",
            maxFiles: "14d",
        }),
        new DailyRotateFile({  // Priority 5
            filename: "logger/debug-%DATE%.log",
            level: "debug",
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
