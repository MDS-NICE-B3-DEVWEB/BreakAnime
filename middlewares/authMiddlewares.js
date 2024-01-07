const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, config.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
};


const isAdmin = (req, res, next) => { 
  if (req.user.role == 0) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};


const isIdRelatedToUser = (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};

module.exports = {
  authenticateToken, isAdmin, isIdRelatedToUser
};
