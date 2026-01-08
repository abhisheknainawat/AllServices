const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.role = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const isProvider = (req, res, next) => {
  if (req.role !== 'provider') {
    return res.status(403).json({ message: 'Only providers can access this resource' });
  }
  next();
};

const isClient = (req, res, next) => {
  if (req.role !== 'client') {
    return res.status(403).json({ message: 'Only clients can access this resource' });
  }
  next();
};

module.exports = { authMiddleware, isProvider, isClient };
