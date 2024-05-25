function booksData() {
    return {
        books: [],
        loading: false,
        searchTerm: '',
        searchedBooks: [],
        book: { title: '', author: '', genre: '', cover: null, coverPath: ''},
        newBook: { title: '', author: '', genre: '', cover: null },
        showAddBookForm: false,
        showManageBooks: false,
        showSearchBooks: true,
        page: 1,
        totalPages: null,
        isScrolledDown: false,
        lastScrollPosition: 0,
        hasMoreBooks: true,
        isFetching: false,

        async initializeScrollHandlers() {
            window.addEventListener('scroll', () => {
                const isScrollingDown = window.scrollY > this.lastScrollPosition;
                this.lastScrollPosition = window.scrollY;
        
                // Delay toggling the hidden class by a small amount
                setTimeout(() => {
                    this.isScrolledDown = isScrollingDown;
                },  300); // Adjust the delay time as needed
            });
        },        

        // Method to add the fade-in class
        async addFadeInClass() {
            // Wait for the DOM to be updated
            this.$nextTick(() => {
                // Select all book containers
                const bookContainers = this.$refs.booksContainer.querySelectorAll('.bookContainer');
                // Add the fade-in class to each book container with a staggered effect
                bookContainers.forEach((bookContainer, index) => {
                    setTimeout(() => {
                        bookContainer.classList.add('fade-in');
                    }, index * 50); // Add a slight delay for a staggered effect
                });
            });
        },        
        
        async fetchBooks() {
            if (!this.hasMoreBooks) {
                return;
            }

            this.loading = true;
            try {
                const response = await fetch(`/api/books?limit=10&offset=${(this.page - 1) * 10}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();

                const existingBookUUIDs = this.books.map(book => book.uuid);
                const filteredBooks = data.books.filter(book => !existingBookUUIDs.includes(book.uuid));

                this.books.push(...filteredBooks);
                this.totalPages = data.totalPages;

                // Update has moreBooks flag
                if (data.books.length < 10 || this.page >= this.totalPages) {
                    this.hasMoreBooks = false;
                }

                this.page++;
                console.log('Books loaded:', data.books);

                // Add fade-in class to newly added books
                this.$nextTick(() => {
                    this.addFadeInClass();
                });
 
                // Initialize the isEditing property for each book
                // this.books = this.books.map(book => ({ ...book, isEditing: false }));
            } catch (error) {
                console.error('Error fetching books:', error);
                alert('Failed to fetch books');
                this.hasMoreBooks = false;
            } finally {
                this.loading = false;
                this.isFetching = false;
            }
        },

        async fetchInitialBooks() {
            this.page = 1;
            this.books = [];
            this.hasMoreBooks = true;
            await this.fetchBooks();
        },
          
        async toggleAddBookForm() {
            this.showAddBookForm = !this.showAddBookForm;
            this.showSearchBooks = !this.showSearchBooks;
        },

        async toggleManageBooks() {
            this.showManageBooks = !this.showManageBooks;
        },

        async handleFileChange(event) {
            this.newBook.cover = event.target.files[0]; // Add the cover image file
        },

        async handleFileChangeEdit(event) {
            this.book.coverPath = event.target.files[0]; // Edit the cover image file
            this.book.cover = await this.getCoverPath(URL.createObjectURL(this.book.coverPath));
        },        
                         
        async getCoverPath(path) {
            // console.log('Path:', path);
            // Check if path is null, undefined, or not a string
            if (!path || typeof path !== 'string') {
                // console.log('Returning empty string');
                return '';
            }
            // Remove the 'public' prefix from the file path
            // console.log('Returning processed path:', path.replace('public', ''));
            return path.replace('public', '');
        },        
           
        async addBook() {
            const token = localStorage.getItem('token');
        
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }
        
            // Create FormData object to send form data including files
            const formData = new FormData();
            formData.append('title', this.newBook.title);
            formData.append('author', this.newBook.author);
            formData.append('genre', this.newBook.genre);
            formData.append('cover', this.newBook.cover); // Add cover image file
        
            try {
                const response = await fetch('/api/book/add', {
                    method: 'POST',
                    headers: {
                        'Application': 'application/json',
                        'Authorization': token,
                    },
                    body: formData, // Use FormData object as body
                });
        
                if (!response.ok) {
                    throw new Error('Failed to add book');
                }
        
                const addedBook = await response.json();
        
                // Add the new book to the books array
                this.books.unshift(addedBook); // Add the new book to the beginning of the array
        
                alert(`${this.newBook.title} is added successfully!`);
        
                // Clear the new book form fields and cover image
                this.newBook = { title: '', author: '', genre: '', cover: null };
                // Reset file input element to display "No file chosen"
                const fileInput = this.$refs.fileInput;
                if (fileInput) {
                    fileInput.value = '';
                }
        
                // Add fade-in class to the newly added book
                this.$nextTick(() => {
                    const bookContainers = this.$refs.booksContainer.querySelectorAll('.bookContainer');
                    const newlyAddedBookContainer = bookContainers[0]; // Assuming the new book is at the beginning
                    newlyAddedBookContainer.classList.add('fade-in');
                });
        
            } catch (error) {
                console.error('Error adding book:', error);
                alert('Failed to add book');
            }
        },        

        cancelAddBook() {
            // Clear the new book form fields and cover image
            this.newBook = { title: '', author: '', genre: '', cover: null };
            const fileInput = this.$refs.fileInput;
                if (fileInput) {
                    fileInput.value = '';
                } 
            this.toggleAddBookForm();
        },

        async updateBook(book) {

            const token = localStorage.getItem('token');
        
            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }

            try {
                const formData = new FormData();
                formData.append('title', book.title);
                formData.append('author', book.author);
                formData.append('genre', book.genre);
                formData.append('cover', book.coverPath);
                
                const response = await fetch(`/api/book/update/${book.uuid}`, {
                    method: 'PATCH',
                    headers: {
                        'Application': 'application/json',
                        'Authorization': token,
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Failed to update book');
                }
                // Update the local books array with the updated book
                const updatedBook = await response.json();
                const index = this.books.findIndex(b => b.uuid === book.uuid);
                if (index !== -1) {
                    this.books[index] = updatedBook;
                    await this.fetchBooks();
                }

                alert('Book updated successfully!');

                // Hide the edit form
                this.toggleEditForm(book);
                } catch (error) {
                    console.error('Error updating book:', error);
                    alert('Failed to update book');
            }
        },

        async toggleEditForm(book) {
            book.isEditing = !book.isEditing;
        },
        
        async cancelEdit(book) {
            // Reset the book properties to their original values
            const originalBook = await this.fetchOriginalBook(book.uuid);
            // Restore original book data from the books array
            Object.assign(book, originalBook);
            // Reset the cover path
            // this.books.cover = originalBook.cover;
            book.coverPath = '';
            // Hide the edit form
            this.toggleEditForm(book);
        },

        async fetchOriginalBook(uuid) {
            try {
                const response = await fetch(`/api/book/${uuid}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch original book data');
                }
                return await response.json();
            } catch (error) {
                console.error('Error fetching original book data:', error);
                alert('Failed to fetch original book data');
                return null;
            }
        },
        
        async deleteBook(book) {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('JWT token not found in local storage');
                return;
            }
            
            // Prompt the user for confirmation
            const isConfirmed = window.confirm(`Are you sure you want to delete ${book.title}?`);
        
            // If the user confirms the deletion, proceed with the deletion process
            if (isConfirmed) {
                try {
                    const response = await fetch(`/api/book/delete/${book.uuid}`, {
                        method: 'DELETE',
                        headers: {
                            'Application': 'application/json',
                            'Authorization': token,
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete book');
                    }
                    // Filter out the deleted book from the list of books
                    this.books = this.books.filter(b => b.uuid !== book.uuid);
                    this.searchBooks();
                    alert(`${this.book.title} is deleted successfully!`);
                } catch (error) {
                    console.error('Error deleting book:', error);
                    alert('Failed to delete book');
                }
            }
        },

        async searchBooks() {
            if (!this.searchTerm.trim()) {
                this.searchedBooks = []; // Clear the books array if search term is empty
                return;
            }
        
            try {
                const response = await fetch(`/api/books/search?term=${encodeURIComponent(this.searchTerm)}`);
                if (response.ok) {
                    this.searchedBooks = await response.json(); // Update books with fetched data
                } else {
                    throw new Error('Failed to fetch books');
                }
            } catch (error) {
                console.error('Error searching books:', error);
                alert('Failed to search for books');
            }
        },

        async clearSearch() {
            this.searchTerm = ''
        }
    };
}