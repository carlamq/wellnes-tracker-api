const Nutrition = require('../models/nutrition');

/**
 * Get all nutrition entries
 */
const getAllNutrition = async (req, res) => {
  try {
    const nutrition = await Nutrition.find().sort({ date: -1 });
    res.status(200).json(nutrition);
  } catch (error) {
    console.error('Error fetching nutrition entries:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch nutrition entries',
      details: error.message
    });
  }
};

/**
 * Get nutrition entry by ID
 */
const getNutritionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const nutrition = await Nutrition.findById(id);
    
    if (!nutrition) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Nutrition entry with ID ${id} not found`
      });
    }
    
    res.status(200).json(nutrition);
  } catch (error) {
    console.error('Error fetching nutrition entry:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid nutrition entry ID format'
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch nutrition entry',
      details: error.message
    });
  }
};

/**
 * Create new nutrition entry
 * Validation handled by middleware
 */
const createNutrition = async (req, res) => {
  try {
    const nutritionData = req.body;
    
    const newNutrition = new Nutrition(nutritionData);
    const savedNutrition = await newNutrition.save();
    
    res.status(201).json({
      message: 'Nutrition entry created successfully',
      data: savedNutrition
    });
  } catch (error) {
    console.error('Error creating nutrition entry:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Failed to create nutrition entry',
        details: errors
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create nutrition entry',
      details: error.message
    });
  }
};

/**
 * Update nutrition entry
 * Validation handled by middleware
 */
const updateNutrition = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedNutrition = await Nutrition.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedNutrition) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Nutrition entry with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      message: 'Nutrition entry updated successfully',
      data: updatedNutrition
    });
  } catch (error) {
    console.error('Error updating nutrition entry:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid nutrition entry ID format'
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Failed to update nutrition entry',
        details: errors
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update nutrition entry',
      details: error.message
    });
  }
};

/**
 * Delete nutrition entry
 */
const deleteNutrition = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedNutrition = await Nutrition.findByIdAndDelete(id);
    
    if (!deletedNutrition) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Nutrition entry with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      message: 'Nutrition entry deleted successfully',
      data: deletedNutrition
    });
  } catch (error) {
    console.error('Error deleting nutrition entry:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid nutrition entry ID format'
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete nutrition entry',
      details: error.message
    });
  }
};

module.exports = {
  getAllNutrition,
  getNutritionById,
  createNutrition,
  updateNutrition,
  deleteNutrition
};