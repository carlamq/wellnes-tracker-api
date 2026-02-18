<<<<<<< David's-contribution
const express = require('express');
const router = express.Router();
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const jwt = require('jsonwebtoken');

// Configure GitHub OAuth Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Create user object from GitHub profile
    const user = {
      id: profile.id,
      username: profile.username,
      email: profile.emails && profile.emails[0] ? profile.emails[0].value : null,
      name: profile.displayName || profile.username,
      avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
      profileUrl: profile.profileUrl
    };
    return done(null, user);
  }
));

// Route to initiate GitHub OAuth login
router.get('/github',
  passport.authenticate('github', { 
    scope: ['user:email'],
    session: false 
  })
);

// GitHub OAuth callback route
router.get('/github/callback',
  passport.authenticate('github', { 
    session: false, 
    failureRedirect: '/auth/failure' 
  }),
  (req, res) => {
    try {
      // Create JWT token
      const token = jwt.sign(
        { 
          id: req.user.id, 
          username: req.user.username,
          email: req.user.email,
          name: req.user.name 
        },
        process.env.SECRET_SESSION,
        { expiresIn: '24h' }
      );
      
      // Send token and user info
      res.json({ 
        success: true,
        token,
        user: req.user,
        message: 'Authentication successful' 
      });
      
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ 
        error: 'Internal Server Error',
        message: 'Error generating authentication token' 
      });
    }
  }
);

// Route for failed authentication
router.get('/failure', (req, res) => {
  res.status(401).json({ 
    error: 'Authentication Failed',
    message: 'GitHub authentication was unsuccessful' 
  });
});

// Route to verify if token is valid
router.get('/verify', (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        valid: false,
        message: 'No token provided' 
      });
    }
    
    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.SECRET_SESSION);
    
    res.json({ 
      valid: true,
      user: decoded 
    });
    
  } catch (error) {
    res.status(401).json({ 
      valid: false,
      message: 'Invalid or expired token' 
    });
  }
});

// Logout route (client should delete token)
router.post('/logout', (req, res) => {
  res.json({ 
    success: true,
    message: 'Logged out successfully. Please delete your token.' 
  });
});

module.exports = router;
=======
const isAuthenticated = (req, res, next) => {
    if (process.env.NODE_ENV === 'test' || req.session.user !== undefined) {
    return next();
    }
  // Added to stores the user here after GitHub callback, so we can confirm who is logged and confirm multiple logs 
    if (req.session && req.session.user) {
      return next();
    }

    return res.status(401).json({ message: "Unauthorized - please log in" });
};

module.exports = { isAuthenticated };
>>>>>>> main
