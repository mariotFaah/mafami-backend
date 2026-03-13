const CinService = require('../services/CinService');

class CinController {
    // GET /api/cins
    static async getAll(req, res) {
        try {
            const cins = await CinService.getAll();
            res.json({
                success: true,
                count: cins.length,
                data: cins
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // GET /api/cins/:num_cin
    static async getByNum(req, res) {
        try {
            const cin = await CinService.getByNum(req.params.num_cin);
            if (!cin) {
                return res.status(404).json({ 
                    success: false, 
                    error: 'CIN non trouvé' 
                });
            }
            res.json({
                success: true,
                data: cin
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // POST /api/cins
    static async create(req, res) {
        try {
            const { num_cin, date_deliv, lieu_deliv } = req.body;
            
            // Validation
            if (!num_cin) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'num_cin obligatoire' 
                });
            }
            
            const newCin = await CinService.create(num_cin, date_deliv, lieu_deliv || null);
            res.status(201).json({
                success: true,
                message: 'CIN créé avec succès',
                data: newCin
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = CinController;
