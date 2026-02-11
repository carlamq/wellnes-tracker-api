const jwt = require('jsonwebtoken');

/**
 * Middleware to check if user is authenticated via JWT token
 * This protects routes that require authentication
 */
const isAuthenticated = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'No authentication token provided. Please login first.' 
      });
    }
    
    // Extract token (remove 'Bearer ' prefix)
    const token = authHeader.substring(7);
    
    // Verify token using the secret session key
    const decoded = jwt.verify(token, process.env.SECRET_SESSION);
    
    // Attach user info to request object
    req.user = decoded;
    
    // Continue to next middleware/route handler
    next();
    
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Invalid authentication token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: 'Authentication token has expired. Please login again.' 
      });
    }
    
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'Error verifying authentication token' 
    });
  }
};

module.exports = { isAuthenticated };