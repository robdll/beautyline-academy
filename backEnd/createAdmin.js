// Arquivo para rodar manualmente: node createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/userDB.model');

async function createAdmin() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in .env');
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
        const adminName = process.env.ADMIN_NAME || 'Admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log('User with this email already exists.');
            return;
        }
        const hashedPassword = bcrypt.hashSync(adminPassword, 10);
        await User.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });
        console.log('Admin created successfully!');
    } catch (error) {
        console.error('Error creating admin:', error.message);
    } finally {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
            console.log('MongoDB connection closed.');
        }
        process.exit();
    }
}
createAdmin();