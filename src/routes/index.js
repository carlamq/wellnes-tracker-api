const express = require('express');
const router = express.Router();

// Authentication routes (for GitHub OAuth login)
// router.use('/auth', require('./auth'));

// Existing routes (workouts and habits)
router.use('/workouts', require('./workouts'));
router.use('/habits', require('./habits'));

// New routes (nutrition and sleep) - completing the 4 collections requirement
// router.use('/nutrition', require('./nutrition'));
// router.use('/sleep', require('./sleep'));

module.exports = router;