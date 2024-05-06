require('dotenv').config();
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
 const token = req.headers['authorization'];
 if (!token) return res.status(400).end();
 
 jwt.verify(token, process.env.SECRET, (err, user) => {
 if (err) return res.status(403).end();
 req.user = user;
 next();
 });
};

// const verifyToken = (req, res, next) => {
//   // Extract the token from the request headers
//   const token = req.headers.authorization;

//   if (!token) {
//     // If no token is provided, deny access
//     return res.status(401).json({ message: 'Unauthorized - No token provided' });
//   }

//   try {
//     // Verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log('Decoded token:', decoded);
//     req.user = decoded; // Attach the decoded user information to the request object
//     // Check if the user is an admin
//     if (!decoded.isAdmin) {
//       // If the user is not an admin, deny access to admin-only routes
//       return res.status(403).json({ message: 'Forbidden - User is not an admin' });
//     }
//     // If the user is an admin, proceed to the next middleware or route handler
//     next();
//   } catch (error) {
//     // If there's an error in verifying the token, deny access
//     return res.status(401).json({ message: 'Unauthorized - Invalid token' });
//   }
// };

// module.exports = verifyToken;