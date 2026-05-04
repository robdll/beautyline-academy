const logger = require("../config/logger");
const { v4: uuidv4 } = require("uuid");

const requestLogger = (req, res, next) => {
    const requestId = req.headers["x-request-id"] || uuidv4();
    req.requestId = requestId;

    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const msg = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;

        const meta = {
            requestId,
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            durationMs: duration,
            ip: req.ip,
            userAgent: req.get("user-agent"),
        };

        if (res.statusCode >= 400) {
            logger.error(msg, meta);
        } else {
            logger.info(msg, meta);
        }
    });

    next();
};

module.exports = requestLogger;
