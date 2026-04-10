const mongoose = require('mongoose');
const dns = require('dns');
const logger = require('./logger');

if (process.env.NODE_ENV !== 'production') {
    if (dns.setDefaultResultOrder) {
        dns.setDefaultResultOrder('ipv4first');
    }
}

const connectDB = async (customUri) => {
    try {
        const options = {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        };

        if (process.env.NODE_ENV !== 'production') {
            options.family = 4;
        }

        const uri = customUri || process.env.MONGODB_URI;
        const conn = await mongoose.connect(uri, options);

        logger.info(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        logger.error(`MongoDB Connection Error: ${error.message}`);
        if (!customUri) process.exit(1);
        throw error;
    }
};

module.exports = connectDB;
