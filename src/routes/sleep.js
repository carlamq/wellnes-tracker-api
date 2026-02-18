const router = require("express").Router();
const sleepController = require("../controllers/sleep");
const { validateSleepBody } = require("../middleware/validateSleep");
const { isAuthenticated } = require("../middleware/auth");

// Public routes
router.get("/", sleepController.getAllSleep);
router.get("/:id", sleepController.getSleepById);

// Protected routes
router.post("/", isAuthenticated, validateSleepBody, sleepController.createSleep);
router.put("/:id", isAuthenticated, validateSleepBody, sleepController.updateSleep);
router.delete("/:id", isAuthenticated, sleepController.deleteSleep);

module.exports = router;