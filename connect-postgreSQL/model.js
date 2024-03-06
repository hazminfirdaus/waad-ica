const db = require('./postgres');

module.exports = {
    async getPosts() {
      const sql = 'SELECT * FROM posts';
      const result = await db.query(sql);
      return result.rows;
    },
  
    async getPostByUUID(uuid) {
      const sql = 'SELECT * FROM posts WHERE uuid = $1';
      const result = await db.query(sql, [uuid]);
      return result.rows[0];
    },
  
    async createPost(post) {
      const { date, title, body, uuid } = post;
      const sql = 'INSERT INTO posts (date, title, body, uuid) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await db.query(sql, [date, title, body, uuid]);
      return result.rows[0];
    },
  
    async updatePost(uuid, post) {
      const { date, title, body } = post;
      const sql = 'UPDATE posts SET date = $1, title = $2, body = $3 WHERE uuid = $4 RETURNING *';
      const result = await db.query(sql, [date, title, body, uuid]);
      return result.rows[0];
    },
  
    async deletePost(uuid) {
      const sql = 'DELETE FROM posts WHERE uuid = $1 RETURNING *';
      const result = await db.query(sql, [uuid]);
      return result.rows[0];
    },
  };