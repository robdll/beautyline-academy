const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
<<<<<<< Updated upstream
        if (error.name === 'ValidationError') {
            console.error(`Validation Error: ${error.message}`);
            if (process.env.NODE_ENV !== 'test') process.exit(1);
            throw error;
        }

        if (error.name === 'MongooseError' || (mongoose.Error && error instanceof mongoose.Error)) {
=======

        if (mongoose?.Error?.MongooseError && error instanceof mongoose.Error.MongooseError) {
>>>>>>> Stashed changes
            console.error(`Mongoose Error: ${error.message}`);
            if (process.env.NODE_ENV !== 'test') process.exit(1);
            throw error;
        }


        console.error(`Error: ${error.message}`);
        if (process.env.NODE_ENV !== 'test') process.exit(1);
        throw error;
    }
};

module.exports = connectDB;

