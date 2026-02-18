const express = require('express');
const router = express.Router();

// Authentication routes (for GitHub OAuth login)
router.use('/auth', require('./auth'));  // ← was '../middleware/auth' (wrong!)

// All 4 collection routes
router.use('/workouts', require('./workouts'));
router.use('/habits', require('./habits'));
router.use('/nutrition', require('./nutrition'));  // ← uncommented
router.use('/sleep', require('./sleep'));           // ← uncommented

module.exports = router;