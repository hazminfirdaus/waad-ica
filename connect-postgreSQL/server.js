require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');

// Middleware to parse JSON request bodies
app.use(express.json());

// Use routes defined in routes.js under the /api path
app.use('/api', routes);

// Serve static files from the app directory
app.use(express.static('app'));

// Start the server
app.listen(process.env.PORT, () => {
 console.log(`Server is running on port ${process.env.PORT}`)
});