// 1. Set up Node.js and Express.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON body
app.use(express.json());

let posts = [ ];

// 2. Design Endpoints
// GET all posts
app.get('/posts', (req, res) => {
    res.json(posts);
});

app.get('/posts/1', (req, res) => {
    res.json("post1");
});

// GET single post by UUID
app.get('/posts/:uuid', (req, res) => {
    const post = posts.find(p => p.uuid === req.params.uuid);
    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
});

// POST create a new post
app.post('/posts', (req, res) => {
    const { date, title, body, uuid } = req.body;
    if (!date || !title || !body || !uuid) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newPost = { date, title, body, uuid };
    posts.push(newPost);
    console.log('New post created:', newPost);
    res.status(201).json(newPost);
});

// PUT update a post
app.put('/posts/:uuid', (req, res) => {
    const { date, title, body } = req.body;
    const postIndex = posts.findIndex(p => p.uuid === req.params.uuid);
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const updatedPost = { ...posts[postIndex], date, title, body };
    posts[postIndex] = updatedPost;
    console.log('Post updated:', updatedPost);
    res.json(updatedPost);
});

// DELETE a post
app.delete('/posts/:uuid', (req, res) => {
    const postIndex = posts.findIndex(p => p.uuid === req.params.uuid);
    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }
    const deletedPost = posts.splice(postIndex, 1)[0];
    console.log('Post deleted:', deletedPost);
    res.json(deletedPost);
});

// 5. Document APIs
// GET /posts - Get all posts
// GET /posts/:uuid - Get a single post by UUID
// POST /posts - Create a new post
// PUT /posts/:uuid - Update a post
// DELETE /posts/:uuid - Delete a post

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});