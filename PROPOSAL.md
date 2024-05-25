# Project Proposal

## Description
<!-- A brief description of the web application concept that includes REST API endpoint design -->
<picture>
  <img align="right" width="400" height="500" alt="sketch" src="/public/img/screenshot/bookpedia-sketch.png">
</picture>

The web application Bookpedia serves as a book library catalogue. It consists of responsive and reactive front-end interface as well as REST API backend to handle the application logic.
Bookpedia offers different access and capabilities for two types of users-- reader and librarian.

The figure shows the initial sketch of Bookpedia with all the features. The idea is that the web app keeps the same front-end appearance for both types of users, only that the additional features to
manage the book catalogue only accessible and applied to the librarian with admin privilege. For instance, the add new book form and the update form would only visible to the librarian.

### 1. Reader (No authentication required)
Public users as readers would not have to register or login to use the web application.

  - ***Browse (GET):*** Readers would be able to explore the library's collection by browsing books based on title, genre, or author.

### 2. Librarian (Authentication required)
Librarian acts as admin has the dedicated ability to perform standard book management operations such as adding a new book, updating existing books, and deleting books. 

Authentication is required for librarian to has the access to do so. 
  - ***Login (POST):*** Login to the web app.

Once logged in, a librarian can:

  - ***Add New Books (POST):*** Adding new books to the catalogue. A particular book consists of title, author, genre, and book cover.
  - ***Update Existing Books (PATCH):*** Modify and update information of books already in the catalogue.
  - ***Delete Books (DELETE):*** Remove books from the catalogue.

## Project Plan
<!-- A preliminary project plan outlining major milestones and timelines -->
The Gantt chart below outlines major milestones and timelines for Bookpedia web app development starting with the project initiation until the end of the project. 

The project plan take into account of unexpected delays since there is another major ongoing project by leveraging a few extra days into several critical milestones.
A week of break for a family holiday is also noted as the grey section in the chart.


<p align="center">
  <img width="990" height="450" src="/public/img/screenshot/bookpedia-gantt.png">
</p>
