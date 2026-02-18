const isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized - please log in' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.SECRET_SESSION);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized - please log in' });
  }
};

module.exports = { isAuthenticated };