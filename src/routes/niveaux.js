const express = require('express');
const router = express.Router();
const db = require('../config/database.js');

// GET /api/niveaux
router.get('/', (req, res) => {
    db.query('SELECT * FROM niveau_etude ORDER BY code_niveau', (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, error: err.message });
        }
        res.json({
            success: true,
            count: results.length,
            data: results
        });
    });
});

module.exports = router;
