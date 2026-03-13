// src/config/database.js
const mysql = require('mysql2');
require('dotenv').config();

const dbConfig = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'admin',
    password: process.env.DB_PASSWORD || 'mot_de_passe',
    database: process.env.DB_NAME || 'mafami',
    port: process.env.DB_PORT || 3306
};

// Connexion MySQL DIRECTE (pas pool)
const db = mysql.createConnection(dbConfig);

// Test connexion
db.connect((err) => {
    if (err) {
        console.error('❌ ERREUR MySQL:', err.message);
        return;
    }
    console.log('✅ MySQL connecté - Base:', dbConfig.database);
});

module.exports = db;
