require('dotenv').config();
const express = require('express');
const app = express();
const api = require('./api.js')
const authorize = require('./authorize.js');
const user= require('./user.js');

app.use(express.json());
app.use('/user', user);
app.use('/api', authorize, api);


app.listen(process.env.PORT, () => {
 console.log("Server is listening on port %s", process.env.PORT);
});