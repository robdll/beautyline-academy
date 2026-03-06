// Arquivo para rodar manualmente: node createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./model/userDB.model');
const connectDB = require('./config/DBmongo');

async function createAdmin(email, name, password) {
    try {
        if (mongoose.connection.readyState === 0) {
            await connectDB();
        }

        const adminEmail = email || process.env.ADMIN_EMAIL;
        const adminName = name || process.env.ADMIN_NAME || 'Admin';
        const adminPassword = password || process.env.ADMIN_PASSWORD;

        if (!adminEmail || !adminPassword) {
            throw new Error('Admin email and password must be provided as arguments or defined in .env');
        }

        const weakPasswords = ['admin123', 'password', '123456'];
        if (weakPasswords.includes(adminPassword.toLowerCase())) {
            throw new Error('Admin password is too weak. Please use a stronger password.');
        }

        const existingAdmin = await User.findOne({ email: adminEmail });
        if (existingAdmin) {
            console.log(`User with email ${adminEmail} already exists.`);
            return existingAdmin;
        }
        const hashedPassword = bcrypt.hashSync(adminPassword, 10);
        const newAdmin = await User.create({
            name: adminName,
            email: adminEmail,
            password: hashedPassword,
            role: 'admin'
        });
        console.log('Admin created successfully!');
        return newAdmin;
    } catch (error) {
        console.error('Error creating admin:', error.message);
        throw error;
    } finally {
        if (require.main === module) {
            if (mongoose.connection.readyState !== 0) {
                await mongoose.connection.close();
                console.log('MongoDB connection closed.');
            }
            process.exit();
        }
    }
}

if (require.main === module) {
    const args = process.argv.slice(2);
    const email = args[0];
    const password = args[1];
    const name = args[2];

    if (!email || !password) {
        console.log('Usage: node createAdmin.js <email> <password> [name]');
        process.exit(1);
    }
    createAdmin(email, name, password);
}

module.exports = createAdmin;
