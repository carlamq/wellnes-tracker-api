const express = require('express');
const router = express.Router();
const sleepController = require('../controllers/sleep');
const { validateSleepBody } = require('../middleware/validateSleep');
const { isAuthenticated } = require('../middleware/auth');

// GET routes (public - no authentication required)
router.get('/', sleepController.getAllSleep);
router.get('/:id', sleepController.getSleepById);

// POST route (PROTECTED - requires authentication)
// This is one of your protected routes
router.post('/', isAuthenticated, validateSleepBody, sleepController.createSleep);

// PUT route (PROTECTED - requires authentication)
// This is one of your protected routes
router.put('/:id', isAuthenticated, validateSleepBody, sleepController.updateSleep);

// DELETE route (PROTECTED - requires authentication)
router.delete('/:id', isAuthenticated, sleepController.deleteSleep);

module.exports = router;