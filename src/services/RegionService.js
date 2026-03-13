const db = require('../config/database.js');

class RegionService {
    // GET ALL
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM region_origine ORDER BY nom_region', (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    // POST nouvelle région
    static create(nom_region) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO region_origine (nom_region) VALUES (?)',
                [nom_region],
                (err, result) => {
                    if (err) reject(err);
                    else resolve({ id: result.insertId, nom_region });
                }
            );
        });
    }
}

module.exports = RegionService;
