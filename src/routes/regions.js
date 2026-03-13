const express = require('express');
const router = express.Router();
const RegionController = require('../controllers/RegionController');

// Routes
router.get('/', RegionController.getAll);
router.post('/', RegionController.create);

module.exports = router;
