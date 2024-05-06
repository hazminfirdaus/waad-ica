new Vue({
    el: '#app',
    data: {
      books: [],
      newBook: { title: '', author: '', genre: '' }
    },
    mounted() {
      this.fetchBooks();
    },
    methods: {
      async fetchBooks() {
        try {
          const response = await fetch('/books');
          if (!response.ok) {
            throw new Error('Failed to fetch books');
          }
          this.books = await response.json();
        } catch (error) {
          console.error('Error fetching books:', error);
        }
      },
      async addBook() {
        try {
          const response = await fetch('/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.newBook)
          });
          if (!response.ok) {
            throw new Error('Failed to add book');
          }
          this.fetchBooks();
          this.newBook = { title: '', author: '', genre: '' }; // Reset form fields
        } catch (error) {
          console.error('Error adding book:', error);
        }
      },
      async editBook(book) {
        // Implement edit functionality here
      },
      async deleteBook(bookId) {
        try {
          const response = await fetch(`/books/${bookId}`, {
            method: 'DELETE'
          });
          if (!response.ok) {
            throw new Error('Failed to delete book');
          }
          this.fetchBooks();
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      }
    }
  });