const express = require('express');
const router = express.Router();
const EtudeController = require('../controllers/EtudeController');

// Routes
router.get('/', EtudeController.getAll);
router.post('/', EtudeController.create);

module.exports = router;
