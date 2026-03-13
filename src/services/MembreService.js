const db = require('../config/database.js');

class MembreService {
    // GET ALL membres (avec jointures)
    static getAll() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT m.*, 
                       e.niveau, e.filiere,
                       r.nom_region,
                       c.date_deliv, c.lieu_deliv
                FROM membre m
                LEFT JOIN etude e ON m.id_etude = e.id_etude
                LEFT JOIN region_origine r ON m.id_region = r.id_region
                LEFT JOIN cin c ON m.num_cin = c.num_cin
                ORDER BY m.annee_adh DESC, m.nom
            `;
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }

    // POST nouveau membre
    static create(membreData) {
        return new Promise((resolve, reject) => {
            const { nom, prenom, sexe, date_naiss, lieu_naiss, telephone, adresse, 
                    annee_adh, id_etude, id_region, num_cin } = membreData;
            
            const query = `
                INSERT INTO membre (nom, prenom, sexe, date_naiss, lieu_naiss, 
                                  telephone, adresse, annee_adh, id_etude, 
                                  id_region, num_cin)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [nom, prenom, sexe, date_naiss, lieu_naiss, telephone, 
                           adresse, annee_adh, id_etude || null, id_region || null, 
                           num_cin || null];
            
            db.query(query, values, (err, result) => {
                if (err) reject(err);
                else resolve({ id_membre: result.insertId, ...membreData });
            });
        });
    }

    // GET membre par ID
    static getById(id) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT m.*, 
                       e.niveau, e.filiere,
                       r.nom_region,
                       c.date_deliv, c.lieu_deliv
                FROM membre m
                LEFT JOIN etude e ON m.id_etude = e.id_etude
                LEFT JOIN region_origine r ON m.id_region = r.id_region
                LEFT JOIN cin c ON m.num_cin = c.num_cin
                WHERE m.id_membre = ?
            `;
            db.query(query, [id], (err, results) => {
                if (err) reject(err);
                else resolve(results[0] || null);
            });
        });
    }
}

module.exports = MembreService;
