const db = require('../config/database.js');

class CinService {
    // GET ALL CINs
    static getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM cin ORDER BY date_deliv DESC', (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    // GET CIN par numéro
    static getByNum(num_cin) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM cin WHERE num_cin = ?', [num_cin], (err, results) => {
                if (err) reject(err);
                else resolve(results[0] || null);
            });
        });
    }

    // POST nouveau CIN
    static create(num_cin, date_deliv, lieu_deliv) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO cin (num_cin, date_deliv, lieu_deliv) VALUES (?, ?, ?)',
                [num_cin, date_deliv, lieu_deliv],
                (err, result) => {
                    if (err) reject(err);
                    else resolve({ 
                        num_cin, 
                        date_deliv, 
                        lieu_deliv 
                    });
                }
            );
        });
    }
}

module.exports = CinService;
