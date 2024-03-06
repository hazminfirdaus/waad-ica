const model = require('./model');
const router = require('express').Router();

router.get('/posts', async (req, res) => {
  try {
    const posts = await model.getPosts();
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

router.get('/posts/:uuid', async (req, res) => {
  try {
    const post = await model.getPostByUUID(req.params.uuid);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    res.json(post);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

router.post('/posts', async (req, res) => {
  try {
    const newPost = await model.createPost(req.body);
    console.log('New post created:', newPost);
    res.status(201).json(newPost);
  } catch (e) {
    console.error(e);
    res.status(400).json({ "Missing required fields": "date, title, body" });
  }
});

router.put('/posts/:uuid', async (req, res) => {
  try {
    const updatedPost = await model.updatePost(req.params.uuid, req.body);
    console.log('Post updated:', updatedPost);
    res.json(updatedPost);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

router.delete('/posts/:uuid', async (req, res) => {
  try {
    const deletedPost = await model.deletePost(req.params.uuid);
    console.log('Post deleted:', deletedPost);
    res.json(deletedPost);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
});

module.exports = router;
