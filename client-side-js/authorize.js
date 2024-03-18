require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Authorization token missing' });
  }
  
  // Check if token starts with 'Bearer'
  if (!token.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid authorization header format' });
  }

  // Extract the token
  const accessToken = token.split(' ')[1];

  jwt.verify(accessToken, process.env.SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};
