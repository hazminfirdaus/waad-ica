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
      const book = await Book.getBookByUuid(req.params.uuid);
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });

// Route for searching books by title or author or genre
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


  router.put('/book/update/:uuid', verifyToken, isAdmin, upload.single('cover'), async (req, res) => {
    try {
      const { title, author, genre } = req.body;
      let cover = null; // Initialize cover to null
  
      // Retrieve the existing cover image path from the database
      const existingBook = await Book.getBookByUuid(req.params.uuid);
      cover = existingBook.cover; // Assign the existing cover image path
  
      // If a file was uploaded, update the cover with the new file path
      if (req.file) {
        cover = req.file.path; // Uploaded cover image file path
      }
  
      // Update the book with the new or existing cover image path
      const updatedBookData = { title, author, genre, cover };
      const updatedBook = await Book.updateBook(req.params.uuid, updatedBookData);
  
      // Fetch the updated book data, including the new cover image path
      const updatedBookWithCover = await Book.getBookByUuid(req.params.uuid);
  
      // Send the updated book data as the response
      res.json(updatedBookWithCover);
    } catch (e) {
      console.error('Error updating book:', e);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  
  // DELETE /books/:uuid - Delete a book
  router.delete('/book/delete/:uuid', verifyToken, isAdmin, async (req, res) => {
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