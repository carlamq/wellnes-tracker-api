const Workout = require('../models/workout');

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
    res.status(500).json({ message: error.message });
  }
};

// POST a new workout
const createWorkout = async (req, res) => {
  const workout = new Workout({
    userId: req.body.userId,
    date: req.body.date,
    type: req.body.type,
    durationMin: req.body.durationMin,
    exercises: req.body.exercises,
    notes: req.body.notes
  });

  try {
    //#swagger.tags=['Workouts']
    const newWorkout = await workout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.status(204).send(); // 204 means "No Content" - successful update
  } catch (error) {
    res.status(400).json({ message: error.message });
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