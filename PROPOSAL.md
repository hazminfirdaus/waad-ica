# Project Proposal: Bookpedia Book Catalogue

## 1 Description
<!-- A brief description of the web application concept that includes REST API endpoint design -->
<picture>
  <img align="right" width="400" height="500" alt="sketch" src="/public/img/screenshot/bookpedia-sketch.png">
</picture>

The web application Bookpedia serves as a book library catalogue. It consists of responsive and reactive front-end interface as well as REST API backend to handle the application logic.
Bookpedia offers distinct access and capabilities for two types of users-- Readers and Librarians.

The figure shows the initial sketch of Bookpedia with all the features. The idea is that the web application keeps the same front-end appearance for both types of users, only that the additional features to
manage the book catalogue only accessible and applied to the librarian with admin privilege. For instance, the add new book form and the update form would only visible to the librarian.

### i. Reader (Publiv Access)
Public users as readers would not have to register or login to use the web application.

  - ***Browse Books (GET):*** Readers would be able to explore the library's collection by browsing books based on title, genre, or author.

### ii. Librarian (Authenticated Access)
Librarian acts as admin has the dedicated ability to perform standard book management operations such as adding a new book, updating existing books, and deleting books. 
Authentication is required for librarian to has the access to do so. 

Once logged in, a librarian can manage the book catalogue through the following operations:

  - ***Add New Books (POST):*** Introduce new books to the catalogue. A particular book consists of title, author, genre, and book cover.
  - ***Update Existing Books (PATCH):*** Modify and update information of books already in the catalogue.
  - ***Delete Books (DELETE):*** Remove books from the catalogue.
    
## 2 REST API Endpoint Design
### i. Public Endpoints (Reader)
  - ***`GET /api/books`:*** Retrieve a list of books with title, author, genre, cover
  - ***`GET /api/books/:uuid`:*** Retrieve a particular book by UUID.

### ii. Protected Endpoints (Librarian)
  - ***`POST  /api/books/add`:*** Add a new book to the catalogue. Requires authentication.
  - ***`PATCH /api/books/update`:*** Updates details of existing books. Requires authentication.
  - ***`DELETE /api/books/delete`:*** Remove a book from the catalogue. Requires authentication.

### iii. Login (Librarian)
  - ***POST `/user/login`:*** An endpoint to handle user login for librarian.

## 3 Project Plan
<!-- A preliminary project plan outlining major milestones and timelines -->
### Gantt Chart

The Gantt chart below outlines major milestones and timelines for Bookpedia web app development starting with the project initiation until the end of the project. 

The project plan take into account of unexpected delays since there is another major ongoing project by leveraging a few extra days into several critical milestones.
A week of break for a family holiday is also noted as the grey section in the chart.


<p align="center">
  <img width="990" height="450" src="/public/img/screenshot/bookpedia-gantt.png">
</p>

### Preliminary Project Plan
**i. Week 1: Project Setup and Initial Planning**
  - Set up Github repositories, perform version controlling.
  - Create `PROPOSAL.md` ad outline the project.
  - Set up the development environment and initialise the project structure.

**ii. Week 2: Back-end Development**
  - Develop REST API with Express.js, including all public endpoints.
  - Set up PostgreSQL database and schema for books.
  - Implement JSON Web Token authentication for protected endpoints.
  - Test API endpoints using Thunder Client.

**iii. Week 3: Front-end Development**
  - Create a responsive HTML5/CSS3 layout.
  - Implement the public book reactive browsing interface using Alpine.js.
  - Integrate front-end with back-end API using fecth API.
  - Develop authentication flow for librarians.

**iv. Week 4: Librarian Functionality**
  - Implement add, update, and delete book functionalities on the front-end.
  - Ensure all protected routes are functional and secured.
  - Perform end-to-end testing of librarian operations.
    
**v. Week 5: Final Tocuhes and Deployment**
  - Prepare the web application for deployment. Test, debug, and ensure it performs well.
  - Deploy on DigitalOcean.
  - Ensure the application is live and functioning.

**vi. Week 6: Documentation**
  - Prepare `README.md` documentation.
  - Provide details of the application architecture, development process, and critical evaluation of the project.

**vii. Week 7: Submission**
  - Package the project components into a single ZIP archive, submit to SYLO.
  - Submit the URLs of Github repository and the deployed web application.
