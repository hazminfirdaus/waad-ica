# Project Proposal

## Description
<!-- A brief description of the web application concept that includes REST API endpoint design -->
<img align="right" width="400" height="500" alt="sketch" src="/public/img/screenshot/bookpedia-sketch.png"> 
The web application Bookpedia serves as a book library catalogue. It consists of responsive and reactive front-end interface as well as REST API backend to handle the application logic.
Bookpedia offers different access and capabilities for two types of users-- reader and librarian.

### 1. Reader (No authentication required)
Public users as readers would not have to register or login to use the web application.

  - ***Browse (GET):*** Readers would be able to explore the library's collection by browsing books based on title, genre, or author.

### 2. Librarian (Authentication required)
Librarian acts as admin has the ability to perform standard book management operations such as adding a new book, updating existing books, and deleting books. 

Authentication is required for librarian to has the access to do so. 
  - ***Login (POST):*** Login to the web app.

Once logged in, a librarian can:

  - ***Add New Books (POST):*** Adding new books to the catalogue. A particular book consists of title, author, genre, and book cover.
  - ***Update Existing Books (PATCH):*** Modify and update information of books already in the catalogue.
  - ***Delete Books (DELETE):*** Remove books from the catalogue.

## Project Plan
A preliminary project plan outlining major milestones and timelines
