const express = require('express');
const router = express.Router();
const nutritionController = require('../controllers/nutrition');
const { validateNutritionBody } = require('../middleware/validateNutrition');
const { isAuthenticated } = require('../middleware/auth');

// GET routes (public - no authentication required)
router.get('/', nutritionController.getAllNutrition);
router.get('/:id', nutritionController.getNutritionById);

// POST route (PROTECTED - requires authentication)
// This is one of your protected routes
router.post('/', isAuthenticated, validateNutritionBody, nutritionController.createNutrition);

// PUT route (PROTECTED - requires authentication)
// This is one of your protected routes
router.put('/:id', isAuthenticated, validateNutritionBody, nutritionController.updateNutrition);

// DELETE route (PROTECTED - requires authentication)
router.delete('/:id', isAuthenticated, nutritionController.deleteNutrition);

module.exports = router;