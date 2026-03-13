// src/index.js
const express = require('express');
const db = require('./config/database.js');  
require('dotenv').config();

// Importer les routes 
const regionRoutes = require('./routes/regions.js');
const etudeRoutes = require("./routes/etudes.js");
const membreRoutes = require('./routes/membres.js');
const cinRoutes = require('./routes/cins.js');
const niveauRoutes = require('./routes/niveaux.js');



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes API
app.get('/', (req, res) => {
    res.json({ 
        message: 'API Mafami ✅',
        database: process.env.DB_NAME || 'mafami',
        endpoints: {
            regions: '/api/regions (GET/POST)'
        }
    });
});

// === ROUTES  ===
app.use('/api/regions', regionRoutes);
app.use('/api/etude', etudeRoutes);
app.use('/api/membres', membreRoutes);
app.use('/api/cins', cinRoutes);
app.use('/api/niveaux', niveauRoutes);



app.listen(PORT, () => {
    console.log(`🚀 Backend sur http://localhost:${PORT}`);
});
