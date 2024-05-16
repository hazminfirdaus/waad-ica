// postgresql database connection
require('dotenv').config();
const { Pool } = require('pg');
const pool = new Pool(JSON.parse(process.env.POSTGRES));

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  // Create the users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )`;

  // Create the admins table
  const createAdminsTable = `
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      lib_id INT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )`;

  // Create the books table
  const createBooksTable = `
    CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      genre VARCHAR(255) NOT NULL,
      uuid UUID NOT NULL DEFAULT gen_random_uuid()
    )`;

  client.query(createUsersTable, (err, result) => {
    if (err) {
      console.error('Error creating users table:', err);
    } else {
      console.log('Users table created successfully');
    }
  });

  client.query(createAdminsTable, (err, result) => {
    if (err) {
      console.error('Error creating admins table:', err);
    } else {
      console.log('Admins table created successfully');
    }
  });

  client.query(createBooksTable, (err, result) => {
    release(); // Release the client back to the pool
    if (err) {
      console.error('Error creating books table:', err);
    } else {
      console.log('Books table created successfully');
    }
  });
});

module.exports = {
  query: (sql, params) => pool.query(sql, params),
};
