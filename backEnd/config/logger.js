const winston = require("winston");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
    ),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.File({ filename: "logger/error.loger.json", level: "error" }),
        new winston.transports.File({ filename: "logger/combined.log" }),
        new winston.transports.File({ filename: "logger/sucess.logger.json" }),
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