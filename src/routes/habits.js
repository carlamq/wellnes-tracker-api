const router = require("express").Router();
const habitsController = require("../controllers/habits");
const { validateHabitBody } = require("../middleware/validateHabit");
const { isAuthenticated } = require("../middleware/auth");

// Public routes
router.get("/", habitsController.getAllHabits);
router.get("/:id", habitsController.getHabitById);

// Protected routes
router.post("/", isAuthenticated, validateHabitBody, habitsController.createHabit);
router.put("/:id", isAuthenticated, validateHabitBody, habitsController.updateHabit);
router.delete("/:id", isAuthenticated, habitsController.deleteHabit);

module.exports = router;