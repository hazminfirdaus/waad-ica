-- CREATE TABLE users (
--     id SERIAL PRIMARY KEY,
--     username VARCHAR(255) NOT NULL,
--     password VARCHAR(255) NOT NULL
-- );

-- INSERT INTO users (username, password) 
-- VALUES ('bonobo', 'secret');

CREATE TABLE IF NOT EXISTS books (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(255) NOT NULL,
      genre VARCHAR(255) NOT NULL,
      uuid UUID NOT NULL DEFAULT gen_random_uuid ()
    );