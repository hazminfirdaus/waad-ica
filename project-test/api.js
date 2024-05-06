const verifyToken = require('./authorize');
const authorize = require('./authorize');
const Book  = require('./book')
const router = require('express').Router();

router.get('/hello', (req, res) => {
    res.json(["Hello!", req.user]);
    });

router.get('/admin', (req, res) => {
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

// GET /books/:uuid - Retrieve a single book
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

  // GET /books/id - Retrieve a single book
  // router.get('/books/:id', async (req, res) => {
  //   try {
  //     const id = parseInt(req.params.id);
      
  //     if (isNaN(id)) {
  //       return res.status(400).json({ error: 'Invalid book ID' });
  //     }
  
  //     const bookid = await Book.getBookByID(id);
  //     if (!bookid) {
  //       return res.status(404).json({ error: 'Book not found' });
  //     }
  //     res.json(book);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
  
  
  // POST /books - Add a new book
  router.post('/book/add', authorize, async (req, res) => {
    try {
        const newBook = await Book.addBook(req.body);
        console.log(newBook + " is added");
        res.status(201).json(newBook);
    } catch (error) {
        console.log("Error: " + error.message);
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