SELECT *
FROM posts;

INSERT INTO posts (date, title, body, uuid)
VALUES (NOW(), 'Hello, World!', 'This is my first post.','123e4567-e89b-12d3-a456-426614174000');