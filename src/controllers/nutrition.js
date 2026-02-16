const Nutrition = require('../models/nutrition');

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