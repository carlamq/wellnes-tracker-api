const isAuthenticated = (req, res, next) => {
    if (process.env.NODE_ENV === 'test' || req.session.user !== undefined) {
    return next();
  }
  return res.status(401).json("You do not have access.");
};

module.exports = { isAuthenticated };