const Workout = require('../models/workout');

const isCastError = (err) => err && err.name === "CastError";
const isValidationError = (err) => err && err.name === "ValidationError";

// GET all workouts
const getAllWorkouts = async (req, res) => {
  try {
    //#swagger.tags=['Workouts']
    const workouts = await Workout.find();
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single workout by ID
const getWorkoutById = async (req, res) => {
  try {
    //#swagger.tags=['Workouts']
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid workout ID" });
    res.status(500).json({ message: error.message });
  }
};

// POST a new workout
const createWorkout = async (req, res) => {
  try {
<<<<<<< David's-contribution
    const workout = new Workout({
      userId: req.body.userId,
      date: req.body.date,
      type: req.body.type,
      durationMin: req.body.durationMin,
      exercises: req.body.exercises,
      notes: req.body.notes
    });

=======
    //#swagger.tags=['Workouts']
>>>>>>> main
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    if (isValidationError(error)) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

// PUT (Update) a workout
const updateWorkout = async (req, res) => {
  try {
    //#swagger.tags=['Workouts']
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(updatedWorkout);
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid workout ID" });
    if (isValidationError(error)) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

// DELETE a workout
const deleteWorkout = async (req, res) => {
  try {
    //#swagger.tags=['Workouts']
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid workout ID" });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
};