require('dotenv').config();
const express = require('express');
const app = express();
const api = require('./routes/api.js');
const user = require('./routes/user.js');


app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Use the user routes with a base path '/user'
app.use('/user', user);

// Use the authorize middleware for the /api route
app.use('/api', api);

app.listen(process.env.PORT, () => {
  console.log("Server is listening on port %s", process.env.PORT);
});

