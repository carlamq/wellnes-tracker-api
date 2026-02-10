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