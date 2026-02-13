const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutrition');
const { validateNutritionBody } = require("../middleware/validateNutrition");
const { isAuthenticated } = require('../middleware/auth');

// GET routes stay public
router.get('/', nutritionController.getAll);
router.get('/:id', nutritionController.getSingle);

// POST, PUT, and DELETE are protected by OAuth
router.post('/', isAuthenticated, validateNutritionBody, nutritionController.createRecord);
router.put('/:id', isAuthenticated, validateNutritionBody, nutritionController.updateRecord);
router.delete('/:id', isAuthenticated, nutritionController.deleteRecord);

module.exports = router;