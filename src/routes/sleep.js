<<<<<<< David's-contribution
const Sleep = require('../models/sleep');

/**
 * Get all sleep entries
 */
const getAllSleep = async (req, res) => {
  try {
    const sleep = await Sleep.find().sort({ date: -1 });
    res.status(200).json(sleep);
  } catch (error) {
    console.error('Error fetching sleep entries:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch sleep entries',
      details: error.message
    });
  }
};

/**
 * Get sleep entry by ID
 */
const getSleepById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const sleep = await Sleep.findById(id);
    
    if (!sleep) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Sleep entry with ID ${id} not found`
      });
    }
    
    res.status(200).json(sleep);
  } catch (error) {
    console.error('Error fetching sleep entry:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid sleep entry ID format'
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to fetch sleep entry',
      details: error.message
    });
  }
};

/**
 * Create new sleep entry
 * Validation handled by middleware
 */
const createSleep = async (req, res) => {
  try {
    const sleepData = req.body;
    
    const newSleep = new Sleep(sleepData);
    const savedSleep = await newSleep.save();
    
    res.status(201).json({
      message: 'Sleep entry created successfully',
      data: savedSleep
    });
  } catch (error) {
    console.error('Error creating sleep entry:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Failed to create sleep entry',
        details: errors
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create sleep entry',
      details: error.message
    });
  }
};

/**
 * Update sleep entry
 * Validation handled by middleware
 */
const updateSleep = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedSleep = await Sleep.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedSleep) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Sleep entry with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      message: 'Sleep entry updated successfully',
      data: updatedSleep
    });
  } catch (error) {
    console.error('Error updating sleep entry:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid sleep entry ID format'
      });
    }
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        error: 'Validation Error',
        message: 'Failed to update sleep entry',
        details: errors
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to update sleep entry',
      details: error.message
    });
  }
};

/**
 * Delete sleep entry
 */
const deleteSleep = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedSleep = await Sleep.findByIdAndDelete(id);
    
    if (!deletedSleep) {
      return res.status(404).json({
        error: 'Not Found',
        message: `Sleep entry with ID ${id} not found`
      });
    }
    
    res.status(200).json({
      message: 'Sleep entry deleted successfully',
      data: deletedSleep
    });
  } catch (error) {
    console.error('Error deleting sleep entry:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid sleep entry ID format'
      });
    }
    
    res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to delete sleep entry',
      details: error.message
    });
  }
};

module.exports = {
  getAllSleep,
  getSleepById,
  createSleep,
  updateSleep,
  deleteSleep
};
=======
const express = require('express');
const router = express.Router();
const sleepController = require('../controllers/sleep');
const { validateSleepBody } = require("../middleware/validateSleep");
const { isAuthenticated } = require('../middleware/auth'); // Added this import

// Thi is the CRUD endpoints for the Sleep collection
router.get('/', sleepController.getAll);
router.get('/:id', sleepController.getSingle);

// THESE ARE PROTECTED ROUTES: Requires OAuth login
router.post('/', isAuthenticated, validateSleepBody, sleepController.createRecord);
router.put('/:id', isAuthenticated, validateSleepBody, sleepController.updateRecord);
router.delete('/:id', isAuthenticated, sleepController.deleteRecord);

module.exports = router;
>>>>>>> main
