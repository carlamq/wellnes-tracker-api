const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));

router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/auth/failure' }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user.id, username: req.user.username, email: req.user.email },
        process.env.SECRET_SESSION,
        { expiresIn: '24h' }
      );
      res.json({ success: true, token, user: req.user });
    } catch (error) {
      res.status(500).json({ message: 'Error generating token' });
    }
  }
);

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'GitHub authentication failed' });
});

router.get('/verify', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false, message: 'No token provided' });
    }
    const decoded = jwt.verify(authHeader.substring(7), process.env.SECRET_SESSION);
    res.json({ valid: true, user: decoded });
  } catch {
    res.status(401).json({ valid: false, message: 'Invalid or expired token' });
  }
});

router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out. Please delete your token.' });
});

module.exports = router;