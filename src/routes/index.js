const express = require('express');
const router = express.Router();

// Existing routes
router.use('/workouts', require('./workouts'));

// Carla's HABITS ROUTE
router.use("/habits", require("./habits"));

// MY NUTRITION ROUTE
router.use("/nutrition", require("./nutrition"));

// MY SLEEP ROUTE
router.use("/sleep", require("./sleep"));

module.exports = router;