require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('./authorize');
const { Pool } = require('pg'); // Import the Pool class from pg
const bcrypt = require('bcrypt');

const router = express.Router();

const pool = new Pool(JSON.parse(process.env.POSTGRES));

function makeToken(user) {
  return jwt.sign(user, process.env.SECRET, { expiresIn: '12h' });
}

// login route
router.get('/login', (req, res) => {
  res.redirect('/login.html');
});

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
        res.status(401).json({ error: 'Incorrect password' });
      }
    } else {
      // User not found
      res.status(401).json({ error: 'User not found' });
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

  // Verify token route
  router.post('/verify-token', verifyToken, async (req, res) => {
    try {
      const token = req.headers['authorization'];
      const decoded = jwt.verify(token, process.env.SECRET);
      const username = decoded.username;
  
      // Query database to check if user is admin
      const client = await pool.connect();
      const isAdminQuery = await client.query('SELECT * FROM users u JOIN admins a ON u.id = a.user_id WHERE u.username = $1', [username]);
      client.release();
  
      const isAdmin = isAdminQuery.rows.length > 0;
      res.json({ isAdmin });
    } catch (error) {
      console.error('Error verifying token:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

module.exports = router;
