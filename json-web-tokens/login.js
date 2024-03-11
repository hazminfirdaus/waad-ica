require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg'); // Import the Pool class from pg

const router = express.Router();

const pool = new Pool(JSON.parse(process.env.POSTGRES));

function makeToken(user) {
  return jwt.sign(user, process.env.SECRET, { expiresIn: '12h' });
}

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length > 0) {
      // User exists, generate and send token
      const token = makeToken({ username: result.rows[0].username });
      res.json({ token });
    } else {
      // User not found or incorrect password
      res.status(401).end();
    }

    client.release();
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).end(); // Internal Server Error
  }
});

module.exports = router;
