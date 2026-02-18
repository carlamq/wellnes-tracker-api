const express = require("express");
const router = express.Router();
const { validateWorkoutBody } = require("../middleware/validateWorkout");
const workoutsController = require("../controllers/workouts");
<<<<<<< David's-contribution
const { validateWorkoutBody } = require("../middleware/validateWorkout");
=======
const { isAuthenticated } = require('../middleware/auth'); // Added this import
>>>>>>> main

// Route to get all workouts
router.get("/", workoutsController.getAllWorkouts);

// Route to get a specific workout by ID
router.get("/:id", workoutsController.getWorkoutById);

// Route to create a new workout
<<<<<<< David's-contribution
router.post("/", validateWorkoutBody, workoutsController.createWorkout);

// Route to update an existing workout
router.put("/:id", validateWorkoutBody, workoutsController.updateWorkout);
=======
router.post("/", isAuthenticated, validateWorkoutBody, workoutsController.createWorkout);

// Route to update an existing workout
router.put("/:id", isAuthenticated, validateWorkoutBody, workoutsController.updateWorkout);
>>>>>>> main

// Route to delete a workout
router.delete("/:id", isAuthenticated, workoutsController.deleteWorkout);

module.exports = router;