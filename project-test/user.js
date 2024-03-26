require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg'); // Import the Pool class from pg
const bcrypt = require('bcrypt');

const router = express.Router();

const pool = new Pool(JSON.parse(process.env.POSTGRES));

function makeToken(user) {
  return jwt.sign(user, process.env.SECRET, { expiresIn: '12h' });
}

// login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      // Compare the hashed password stored in the database with the plaintext password provided by the user
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // Passwords match, generate and send token
        const token = makeToken({ username: user.username });
        res.json({ token });
      } else {
        // Incorrect password
        res.status(401).end();
      }
    } else {
      // User not found
      res.status(401).end();
    }

    client.release();
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).end(); // Internal Server Error
  }
});


// register route
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const client = await pool.connect();
  
      // Check if the username already exists
      const existingUser = await client.query('SELECT * FROM users WHERE username = $1', [username]);
  
      if (existingUser.rows.length > 0) {
        // Username already exists, return an error
        res.status(409).json({ error: 'Username already exists' });
      } else {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
  
        // Insert the new user into the database with the hashed password
        const result = await client.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, hashedPassword]);
  
        // Generate and send a token for the newly registered user
        const token = makeToken({ username: result.rows[0].username });
        res.json({ token });
      }
  
      client.release();
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).end(); // Internal Server Error
    }
  });

module.exports = router;
