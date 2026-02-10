const Sleep = require('../models/sleep');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
  try {
    const results = await Sleep.find();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const result = await Sleep.findById(id);
    if (!result) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: 'Invalid ID' });
  }
};

const createRecord = async (req, res) => {
  try {
    const sleep = new Sleep(req.body);
    const response = await sleep.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateRecord = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    await Sleep.findByIdAndUpdate(id, req.body);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    await Sleep.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { 
  getAll, 
  getSingle, 
  createRecord, 
  updateRecord, 
  deleteRecord 
};