const Sleep = require('../models/sleep');

const isCastError = (err) => err && err.name === "CastError";
const isValidationError = (err) => err && err.name === "ValidationError";

/**
 * Get all sleep entries
 */
const getAllSleep = async (req, res) => {
  try {
    //#swagger.tags=['Sleep']
    const sleep = await Sleep.find().sort({ date: -1 });
    res.status(200).json(sleep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get sleep entry by ID
 */
const getSleepById = async (req, res) => {
  try {
    //#swagger.tags=['Sleep']
    const sleep = await Sleep.findById(req.params.id);
    
    if (!sleep) {
      return res.status(404).json({ message: 'Sleep entry not found' });
    }
    
    res.status(200).json(sleep);
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid sleep ID" });
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create new sleep entry
 * Validation handled by middleware
 */
const createSleep = async (req, res) => {
  try {
    //#swagger.tags=['Sleep']
    const sleep = new Sleep({
      userId: req.body.userId,
      date: req.body.date,
      bedtime: req.body.bedtime,
      wakeTime: req.body.wakeTime,
      durationHours: req.body.durationHours,
      quality: req.body.quality,
      interruptions: req.body.interruptions,
      sleepStages: req.body.sleepStages,
      notes: req.body.notes,
      feltRested: req.body.feltRested
    });
    
    const newSleep = await sleep.save();
    res.status(201).json(newSleep);
  } catch (error) {
    if (isValidationError(error)) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update sleep entry
 * Validation handled by middleware
 */
const updateSleep = async (req, res) => {
  try {
    //#swagger.tags=['Sleep']
    const updatedSleep = await Sleep.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedSleep) {
      return res.status(404).json({ message: 'Sleep entry not found' });
    }
    
    res.status(200).json(updatedSleep);
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid sleep ID" });
    if (isValidationError(error)) return res.status(400).json({ message: error.message });
    res.status(500).json({ message: error.message });
  }
};

/**
 * Delete sleep entry
 */
const deleteSleep = async (req, res) => {
  try {
    //#swagger.tags=['Sleep']
    const deletedSleep = await Sleep.findByIdAndDelete(req.params.id);
    
    if (!deletedSleep) {
      return res.status(404).json({ message: 'Sleep entry not found' });
    }
    
    res.status(200).json({ message: 'Sleep entry deleted successfully' });
  } catch (error) {
    if (isCastError(error)) return res.status(400).json({ message: "Invalid sleep ID" });
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSleep,
  getSleepById,
  createSleep,
  updateSleep,
  deleteSleep
};