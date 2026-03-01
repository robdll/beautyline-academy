// Arquivo para rodar manualmente: node createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const crypto = require('crypto');
const User = require('./model/userDB.model');

async function createAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const existingAdmin = await User.findOne({ role: 'admin' });

        if (existingAdmin) {
            console.log('Admin already exists.');
            await mongoose.connection.close();
            process.exit();
        }

        const hashedPassword = crypto
            .createHash('sha256')
            .update('admin')
            .digest('hex');

        await User.create({
            name: 'Igor',
            email: 'igorrm23@gmail.com',
            password: hashedPassword,
            role: 'admin'
        });

        console.log('Admin created successfully!');
        await mongoose.connection.close();

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

createAdmin();