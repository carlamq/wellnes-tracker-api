const express = require("express");
const router = express.Router();
const { validateWorkoutBody } = require("../middleware/validateWorkout");
const workoutsController = require("../controllers/workouts");
const { isAuthenticated } = require('../middleware/auth'); // Added this import

// Route to get all workouts
router.get("/", workoutsController.getAllWorkouts);

// Route to get a specific workout by ID
router.get("/:id", workoutsController.getWorkoutById);

// Route to create a new workout
router.post("/", isAuthenticated, validateWorkoutBody, workoutsController.createWorkout);

// Route to update an existing workout
router.put("/:id", isAuthenticated, validateWorkoutBody, workoutsController.updateWorkout);

// Route to delete a workout
router.delete("/:id", isAuthenticated, workoutsController.deleteWorkout);

module.exports = router;
