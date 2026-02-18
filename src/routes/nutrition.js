const router = require("express").Router();
const nutritionController = require("../controllers/nutrition");
const { validateNutritionBody } = require("../middleware/validateNutrition");
const { isAuthenticated } = require("../middleware/auth");

// Public routes
router.get("/", nutritionController.getAllNutrition);
router.get("/:id", nutritionController.getNutritionById);

// Protected routes
router.post("/", isAuthenticated, validateNutritionBody, nutritionController.createNutrition);
router.put("/:id", isAuthenticated, validateNutritionBody, nutritionController.updateNutrition);
router.delete("/:id", isAuthenticated, nutritionController.deleteNutrition);

module.exports = router;