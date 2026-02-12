const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI, {

        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            console.error(`Validation Error: ${error.message}`);
            process.exit(1);
        }

        if (error instanceof mongoose.Error.MongooseError) {
            console.error(`Mongoose Error: ${error.message}`);
            process.exit(1);
        }


        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

