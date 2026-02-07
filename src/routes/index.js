const express = require('express');
const router = express.Router();

// Existing routes (Carla's journal entries, etc.)
router.use('/workouts', require('./workouts'));

//Carla's HABITS ROUTE
router.use("/habits", require("./habits"));

module.exports = router;