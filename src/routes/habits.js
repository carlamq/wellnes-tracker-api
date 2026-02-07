const router = require("express").Router();
const habitsController = require("../controllers/habits");
const { validateHabitBody } = require("../middleware/validateHabit"); //validation for data in the middleware

// if need for OAuth middleware please change for the next code:

// const { isAuthenticated } = require("../middleware/auth");

// router.post("/", isAuthenticated, validateHabitBody, habitsController.createHabit);
//router.put("/:id", isAuthenticated, validateHabitBody, habitsController.updateHabit);


router.get("/", habitsController.getAllHabits);

router.get("/:id", habitsController.getHabitById);

//validateHabitBody is a function in the middleware to validate the data in the entry
router.post("/", validateHabitBody, habitsController.createHabit);

router.put("/:id", validateHabitBody, habitsController.updateHabit);

router.delete("/:id", habitsController.deleteHabit);

module.exports = router;
