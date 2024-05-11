const db = require('./db');

module.exports = {

    async getAllBooks() {
        const sql = `SELECT * FROM books ORDER BY title ASC`;
        const result = await db.query(sql);
        return result.rows;
    },

    async getBookByUUID(uuid) {
        const sql = `SELECT * FROM books WHERE uuid = $1`;
        const result = await db.query(sql, [uuid]);
        return result.rows[0];
    },

    // async getBookByID(id) {
    //     const sql = `SELECT * FROM books WHERE id = $1`;
    //     const result = await db.query(sql, [id]);
    //     return result.rows[0];
    // },

    async addBook(book) {
        const { title, author, genre } = book;
        const sql = `INSERT INTO books (title, author, genre) VALUES ($1, $2, $3) RETURNING *`;
        const result = await db.query(sql, [title, author, genre]);
        return result.rows[0];
    },

    async updateBook(uuid, book) {
        const { title, author, genre } = book;
        const sql = `UPDATE books SET title = $1, author = $2, genre = $3 WHERE uuid = $4 RETURNING *`;
        const result = await db.query(sql, [title, author, genre, uuid]);
        return result.rows[0];
    },    
         
    async deleteBook(uuid) {
        const sql = 'DELETE FROM books WHERE uuid = $1 RETURNING *';
        const result = await db.query(sql, [uuid]);
        return result.rows[0];
    },

    async searchBooks(searchTerm) {
        const sql = `SELECT * FROM books WHERE title ILIKE $1 OR author ILIKE $1 or genre ILIKE $1 ORDER BY title ASC`;
        const result = await db.query(sql, [`%${searchTerm}%`]);   
        return result.rows;
    },

    async getBooksByGenre(genre) {
        const sql = `SELECT * FROM books WHERE genre = $1`;
        const result = await db.query(sql, [genre]);
        return result.rows;
    },

};
