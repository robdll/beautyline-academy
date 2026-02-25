const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
    console.log("URI:", process.env.MONGODB_URI);
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000
        });
        console.log("✅ Conexão estabelecida com sucesso!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Falha na conexão!");
        console.error("Nome do erro:", err.name);
        console.error("Mensagem:", err.message);
        process.exit(1);
    }
}

testConnection();
