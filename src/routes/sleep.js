const express = require('express');
const router = express.Router();
const sleepController = require('../controllers/sleep');
const { isAuthenticated } = require('../middleware/auth'); // Added this import

// Thi is the CRUD endpoints for the Sleep collection
router.get('/', sleepController.getAll);
router.get('/:id', sleepController.getSingle);

// THESE ARE PROTECTED ROUTES: Requires OAuth login
router.post('/', isAuthenticated, sleepController.createRecord);
router.put('/:id', isAuthenticated, sleepController.updateRecord);
router.delete('/:id', isAuthenticated, sleepController.deleteRecord);

module.exports = router;