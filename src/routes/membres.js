const express = require('express');
const router = express.Router();
const MembreController = require('../controllers/MembreController');

// Routes CRUD
router.get('/', MembreController.getAll);
router.get('/:id', MembreController.getById);
router.post('/', MembreController.create);

module.exports = router;
