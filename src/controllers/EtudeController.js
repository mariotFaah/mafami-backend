const EtudeService = require('../services/EtudeService');

class EtudeController {
    // GET /api/etudes
    static async getAll(req, res) {
        try {
            const etudes = await EtudeService.getAll();
            res.json({
                success: true,
                count: etudes.length,
                data: etudes
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // POST /api/etudes → id_niveau (1=L1, 2=L2...)
    static async create(req, res) {
        try {
            const { id_niveau, filiere } = req.body;
            
            // Validation id_niveau existe
            const niveau = await EtudeService.findNiveau(id_niveau);
            if (!niveau) {
                return res.status(400).json({ 
                    success: false, 
                    error: `id_niveau ${id_niveau} inexistant. Liste: /api/niveaux` 
                });
            }
            
            if (!filiere || filiere.trim().length < 2) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'filiere obligatoire (min 2 caractères)' 
                });
            }

            const newEtude = await EtudeService.create(id_niveau, filiere.trim());
            res.status(201).json({
                success: true,
                message: `Filière créée: ${niveau.code_niveau} - ${filiere}`,
                data: newEtude
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = EtudeController;
