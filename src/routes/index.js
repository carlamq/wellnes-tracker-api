const express = require('express');
const router = express.Router();

<<<<<<< David's-contribution
// Authentication routes (for GitHub OAuth login)
// router.use('/auth', require('./auth'));

// Existing routes (workouts and habits)
=======
// Existing routes
>>>>>>> main
router.use('/workouts', require('./workouts'));
router.use('/habits', require('./habits'));

<<<<<<< David's-contribution
// New routes (nutrition and sleep) - completing the 4 collections requirement
// router.use('/nutrition', require('./nutrition'));
// router.use('/sleep', require('./sleep'));
=======
// Carla's HABITS ROUTE
router.use("/habits", require("./habits"));
>>>>>>> main

// MY NUTRITION ROUTE
router.use("/nutrition", require("./nutrition"));

// MY SLEEP ROUTE
router.use("/sleep", require("./sleep"));

module.exports = router;