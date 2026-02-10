const Nutrition = require('../models/nutrition');
const { ObjectId } = require('mongodb');

// Get all nutrition records
const getAll = async (req, res) => {
  try {
    const results = await Nutrition.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single nutrition record by ID
const getSingle = async (req, res) => {
  try {
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