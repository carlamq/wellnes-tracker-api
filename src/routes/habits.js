const router = require("express").Router();
const habitsController = require("../controllers/habits");
const { validateHabitBody } = require("../middleware/validateHabit"); //validation for data in the middleware
const { isAuthenticated } = require("../middleware/auth");

router.get("/", habitsController.getAllHabits);

router.get("/:id", habitsController.getHabitById);

//validateHabitBody is a function in the middleware to validate the data in the entry
router.post("/", isAuthenticated, validateHabitBody, habitsController.createHabit);

router.put("/:id", isAuthenticated, validateHabitBody, habitsController.updateHabit);

router.delete("/:id", isAuthenticated, habitsController.deleteHabit);

module.exports = router;
