// postgres.js
require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool(JSON.parse(process.env.POSTGRES));

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Create the posts table
  const createPostsTable = `
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL PRIMARY KEY,
      date DATE NOT NULL,
      title VARCHAR(255) NOT NULL,
      body TEXT NOT NULL,
      uuid UUID NOT NULL DEFAULT gen_random_uuid ()
    )`;

  client.query(createPostsTable, (err, result) => {
    release(); // Release the client back to the pool
    if (err) {
      console.error('Error creating posts table:', err);
    } else {
      console.log('Posts table created successfully');
    }
  });
});

module.exports = {
  query: (sql, params) => pool.query(sql, params),
};
