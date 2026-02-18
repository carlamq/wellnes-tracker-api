const express = require("express");
const router = express.Router();
const workoutsController = require("../controllers/workouts");
const { validateWorkoutBody } = require("../middleware/validateWorkout");
const { isAuthenticated } = require("../middleware/auth");

// Public routes
router.get("/", workoutsController.getAllWorkouts);
router.get("/:id", workoutsController.getWorkoutById);

// Protected routes
router.post("/", isAuthenticated, validateWorkoutBody, workoutsController.createWorkout);
router.put("/:id", isAuthenticated, validateWorkoutBody, workoutsController.updateWorkout);
router.delete("/:id", isAuthenticated, workoutsController.deleteWorkout);

module.exports = router;