const MembreService = require('../services/MembreService');

class MembreController {
    // GET /api/membres
    static async getAll(req, res) {
        try {
            const membres = await MembreService.getAll();
            res.json({
                success: true,
                count: membres.length,
                data: membres
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // GET /api/membres/:id
    static async getById(req, res) {
        try {
            const membre = await MembreService.getById(req.params.id);
            if (!membre) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'Membre non trouvé' 
                });
            }
            res.json({
                success: true,
                data: membre
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // POST /api/membres
    static async create(req, res) {
        try {
            const membreData = req.body;
            
            // Validation rapide
            const required = ['nom', 'prenom', 'sexe', 'date_naiss', 'annee_adh'];
            for (let field of required) {
                if (!membreData[field]) {
                    return res.status(400).json({
                        success: false,
                        error: `${field} obligatoire`
                    });
                }
            }

            const newMembre = await MembreService.create(membreData);
            res.status(201).json({
                success: true,
                message: 'Membre créé avec succès',
                data: newMembre
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = MembreController;
