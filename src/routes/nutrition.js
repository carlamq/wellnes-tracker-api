const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutrition');
const { isAuthenticated } = require('../middleware/auth');

// GET routes stay public
router.get('/', nutritionController.getAll);
router.get('/:id', nutritionController.getSingle);

// POST, PUT, and DELETE are protected by OAuth
router.post('/', isAuthenticated, nutritionController.createRecord);
router.put('/:id', isAuthenticated, nutritionController.updateRecord);
router.delete('/:id', isAuthenticated, nutritionController.deleteRecord);

module.exports = router;