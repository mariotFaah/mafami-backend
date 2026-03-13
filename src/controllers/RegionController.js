const RegionService = require('../services/RegionService');

class RegionController {
    // GET /api/regions
    static async getAll(req, res) {
        try {
            const regions = await RegionService.getAll();
            res.json({
                success: true,
                count: regions.length,
                data: regions
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }

    // POST /api/regions
    static async create(req, res) {
        try {
            const { nom_region } = req.body;
            
            if (!nom_region || nom_region.trim().length < 2) {
                return res.status(400).json({ 
                    success: false, 
                    error: 'nom_region obligatoire (min 2 caractères)' 
                });
            }

            const newRegion = await RegionService.create(nom_region.trim());
            res.status(201).json({
                success: true,
                message: 'Région créée',
                data: newRegion
            });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = RegionController;
