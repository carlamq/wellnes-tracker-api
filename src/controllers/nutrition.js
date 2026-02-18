const Nutrition = require('../models/nutrition');
<<<<<<< David's-contribution

const isCastError = (err) => err && err.name === "CastError";
const isValidationError = (err) => err && err.name === "ValidationError";

/**
 * Get all nutrition entries
 */
const getAllNutrition = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const nutrition = await Nutrition.find().sort({ date: -1 });
    res.status(200).json(nutrition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get nutrition entry by ID
 */
const getNutritionById = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const nutrition = await Nutrition.findById(req.params.id);
    
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    
    res.status(200).json(nutrition);
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid nutrition ID" });
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create new nutrition entry
 * Validation handled by middleware
 */
const createNutrition = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const nutrition = new Nutrition({
      userId: req.body.userId,
      date: req.body.date,
      mealType: req.body.mealType,
      foods: req.body.foods,
      totalCalories: req.body.totalCalories,
      waterIntakeMl: req.body.waterIntakeMl,
      notes: req.body.notes
    });
    
    const newNutrition = await nutrition.save();
    res.status(201).json(newNutrition);
  } catch (error) {
    if (isValidationError(error)) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update nutrition entry
 * Validation handled by middleware
 */
const updateNutrition = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const updatedNutrition = await Nutrition.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedNutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    
    res.status(200).json(updatedNutrition);
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid nutrition ID" });
    if (isValidationError(error)) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete nutrition entry
 */
const deleteNutrition = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const deletedNutrition = await Nutrition.findByIdAndDelete(req.params.id);
    
    if (!deletedNutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found' });
    }
    
    res.status(200).json({ message: 'Nutrition entry deleted successfully' });
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid nutrition ID" });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNutrition,
  getNutritionById,
  createNutrition,
  updateNutrition,
  deleteNutrition
};
=======
const { ObjectId } = require('mongodb');

// Get all nutrition records
const getAll = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const results = await Nutrition.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single nutrition record by ID
const getSingle = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const id = new ObjectId(req.params.id);
    const result = await Nutrition.findById(id);
    if (!result) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID format' });
  }
};

// Create a new nutrition record
const createRecord = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const { userId, foodItem, calories } = req.body;
    // Data Validation: Return 400 if required fields are missing
    if (!userId || !foodItem || !calories) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }
    const nutrition = new Nutrition(req.body);
    const response = await nutrition.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update an existing record
const updateRecord = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const id = new ObjectId(req.params.id);
    const response = await Nutrition.findByIdAndUpdate(id, req.body, { new: true });
    if (!response) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a record
const deleteRecord = async (req, res) => {
  try {
    //#swagger.tags=['Nutrition']
    const id = new ObjectId(req.params.id);
    const response = await Nutrition.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createRecord, updateRecord, deleteRecord };
>>>>>>> main
