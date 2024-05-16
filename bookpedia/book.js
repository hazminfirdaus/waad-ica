const db = require('./db');

module.exports = {

    async getAllBooks() {
        const sql = `SELECT * FROM books ORDER BY title ASC`;
        const result = await db.query(sql);
        return result.rows;
    },

    async getBookByUuid(uuid) {
        const sql = `SELECT * FROM books WHERE uuid = $1`;
        const result = await db.query(sql, [uuid]);
        return result.rows[0];
    },

    async addBook(book) {
        const { title, author, genre, cover } = book;
        const sql = `INSERT INTO books (title, author, genre, cover) VALUES ($1, $2, $3, $4) RETURNING *`;
        const result = await db.query(sql, [title, author, genre, cover]);
        return result.rows[0];
    },

    async updateBook(uuid, book) {
        try {
            const { title, author, genre, cover } = book;
    
            let sql;
            let result;
            let params;
    
            // Check if cover is provided
            if (cover) {
                sql = `UPDATE books SET title = $1, author = $2, genre = $3, cover = $4 WHERE uuid = $5 RETURNING *`;
                params = [title, author, genre, cover, uuid];
            } else {
                sql = `UPDATE books SET title = $1, author = $2, genre = $3 WHERE uuid = $4 RETURNING *`;
                params = [title, author, genre, uuid];
            }
    
            result = await db.query(sql, params);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating book:', error);
            throw error;
        }
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
    }

};
