require('dotenv').config();
const jwt = require("jsonwebtoken");

// Middleware to verify the token provided by the user
const verifyToken = (req, res, next) => {
    // Extract the token from the request headers
    const token = req.headers['authorization'];

    if (!token) {
        // If no token is provided, deny access
        return res.status(401).json({ message: 'Unauthorized - No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log('Decoded token:', decoded);
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    } catch (error) {
        // If there's an error in verifying the token, deny access
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid token' });
        }

        // Check if user is an admin based on role information in JWT payload
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Forbidden: User is not an admin' });
        }

        // User is admin, proceed to the next middleware or route handler
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken, isAdmin;