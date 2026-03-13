const db = require('../config/database.js');

class EtudeService {
    // GET ALL avec jointure niveau_etude
    static getAll() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT e.*, ne.code_niveau, ne.libelle as niveau_libelle
                FROM etude e
                LEFT JOIN niveau_etude ne ON e.id_niveau = ne.id_niveau
                ORDER BY ne.code_niveau, e.filiere
            `;
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    // POST : id_niveau (entier) + filiere
    static create(id_niveau, filiere) {
        return new Promise((resolve, reject) => {
            db.query(
                'INSERT INTO etude (id_niveau, filiere) VALUES (?, ?)',
                [id_niveau, filiere],
                (err, result) => {
                    if (err) reject(err);
                    else resolve({ 
                        id_etude: result.insertId, 
                        id_niveau,
                        filiere 
                    });
                }
            );
        });
    }

    // Vérifier si id_niveau existe
    static findNiveau(id_niveau) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM niveau_etude WHERE id_niveau = ?', [id_niveau], (err, results) => {
                if (err) reject(err);
                else resolve(results[0]);
            });
        });
    }
}

module.exports = EtudeService;
