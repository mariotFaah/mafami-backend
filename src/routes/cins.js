const express = require('express');
const router = express.Router();
const CinController = require('../controllers/CinController');

// Routes CRUD
router.get('/', CinController.getAll);
router.get('/:num_cin', CinController.getByNum);
router.post('/', CinController.create);

module.exports = router;
