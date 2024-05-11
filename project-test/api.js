const isAdmin = require('./authorize');
const verifyToken= require('./authorize');
const upload = require('./multer');
const Book  = require('./book')
const router = require('express').Router();

router.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.json(["Admin page", req.user]);
    });


// GET /books - Retrieve all books
router.get('/books', async (req, res) => {
    try {
        const books = await Book.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET Retrieve a single book by uuid
router.get('/book/:uuid', async (req, res) => {
    try {
      const book = await Book.getBookByUUID(req.params.uuid);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });

// Route for searching books by title or author
router.get('/books/search', async (req, res) => {
  const searchTerm = req.query.term; // Get the search term from the query string
  try {
      // Query the database to search for books
      const books = await Book.searchBooks(searchTerm);
      res.json(books); // Return the results as JSON
  } catch (error) {
      console.error('Error searching books:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

  // POST /books - Add a new book
  router.post('/book/add', verifyToken, isAdmin, upload.single('cover'), async (req, res) => {
    try {
        const { title, author, genre } = req.body;
        const cover = req.file.path; // Uploaded cover image file path

        // Add the book with cover image
        const newBook = await Book.addBook({ title, author, genre, cover });
        
        console.log(newBook + " is added");
        res.status(201).json(newBook);
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  // PUT /books/:uuid - Update a book
  router.put('/book/update/:uuid', async (req, res) => {
    try {
      const updatedBook = await Book.updateBook(req.params.uuid, req.body);
      console.log('Book updated:', updatedBook);
      res.json(updatedBook);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });
  
  // DELETE /books/:uuid - Delete a book
  router.delete('/book/delete/:uuid', async (req, res) => {
    try {
       // Extract book UUID from the URL params
      const deletedBook = await Book.deleteBook(req.params.uuid);
      console.log('Book deleted:', deletedBook);
      res.json(deletedBook);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });

module.exports = router;