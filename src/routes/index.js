const express = require('express');
const router = express.Router();

// Existing routes (Carla's journal entries, etc.)
router.use('/workouts', require('./workouts'));

module.exports = router;