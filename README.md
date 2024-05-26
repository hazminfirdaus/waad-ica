# <picture> <img alt="logo" src="/public/img/logo/logo.svg"> </picture> [Bookpedia](http://www.bookpedia.xyz/)

[A repository for ICA of Web Application Architecture and Development.](https://github.com/hazminfirdaus/waad-ica)

<p> Figure 1 below represents the reader interface of Bookpedia. </p>

***<p align="center"> Figure 1: Reader Interface</p>***
<p align="center"> 
  <img alt="homepage" src="/public/img/screenshot/homepage.png">
</p>

<p> Figure 2 below shows the Librarian interface of Bookpedia.  </p>

***<p align="center"> **Figure 2: Librarian Interface** </p>***
<p align="center"> 
  <img alt="admin" src="/public/img/screenshot/admin.png">
</p>

Live demo: [Bookpedia](http://www.bookpedia.xyz/)

Login page: [Bookpedia Login](http://www.bookpedia.xyz/login.html)

Librarian user authentication: preset as per requested in the ICA brief.

## 1. Application Architecture and Development

### 1.1 Application Architecture
Bookpedia book library catalogue web application is developed using a modern architecture that separates concerns between the front-end and back-end, ensuring scalability, maintainability, and seurity.
The detailed explaination of the architecture is as follows:
  - **Front-end:** User interface and client side logic.
  - **Back-end:** Server-side logic, REST API and authentication.
  - **Database:** Persistent storage of book and user data.

### 1.2 Application Development
#### Front-end Development
  - **Technologies Used:** HMTL5, CSS3, JavaScript, Alpine.js framework.
  - **Structure:** The front-end consists of multiple components created using Alpine.js for reactivity.
      + **Components:** These include the book list, book details, search bar, pagination, infinite scroll, add form, toggle manage books, and edit/update form including delete button.
      + **State Management:** Managed locally using Alpine.js, ensuring a smooth interactions and reactive user experience. 
      + **API Integration:** Use fetch API to interact with the back-end, sending requests for data and receiving responses.
          - **Fetching Data:** Implement functions to fetch data from the back-end.
          - **Authentication:** `app.js` handles user authentication by storing JWT tokens in local storage and attaching them to API requests.
          - **CRUD Operations:** Implemented functions to fetch data, `manageBooks.js` deals with book management logics by makign API calls.
            
      + **Design:** A responsive and reactive design
          - **Layout:** HMTL5 semantic structure and CSS3 styling.
          - **Responsiveness:** Implement rsponsive design to ensure application works well within different screen sizes.
          - **User Experience:** An intuitive, reactive, and seamless user experience, utilising Alpine.js as well as transitions and animations where appropriate.
        
        
#### Back-end Development
  - **Technologies Used:** Node.js Express.js.
  - **Server:** An Express.js server is initialiased.
  - **Structure:** The back-end is structured using Model-View-Controller (MVC) pattern.
      + **Models:** Define the data structure and interact with PostgreSQL database using `pg`. There are db and book models.
      + **Controller:** Handle the logic for each endpoints, processing requests, interacting with models, and sending responses.
      + **Routes:** API endpoints including `api.js` and `user.js`.
      + **Middleware:** Includes `authorize.js` middleware to handle JSON Web Token (JWT) authentication of librarian as admin and `multer.js` middleware to deal with file handling.
      + **Error Handling:** Implementation of error handling to manage errors gracefully.
   
#### Database
  - **Technology Used:** PostgreSQL to store data.
  - **Schema:** The database schema includes tables for books, users, admins.
      + **Books Table:** Contains fields of `id`, `title`, `author`, `genre`, `uuid`, and `cover`.
      + **Users Table:** Stores user credentials, including `username` and hashed `password`.
      + **Admins Table:** Stores information of librarian as admin with `id`, `user_id`, and `lib_id`.
  - **Connection:** Usage of `pg` to connect to the PostgreSQL database.
        
#### Authentication
  - **JWT:** Secure authentication implemented using JWT.
      + **JWT Setup:** Install necessary packages (`jsonwebtoken`, `bcrypt` for hashing passwords).
      + **Login Route:**  Create and endppint to authenticate librarians. On successful login, a JWT token is generated and returned to the client. 
      + **Protected Routes:** Certain routes for managing books require a valid JWT token verified by the back-end middleware. Authentication middleware `verifyToken` and `isAdmin` for librarian as admin.
   
#### API Endpoints
  - **Public Endpoints for Readers:**
      + `GET /api/books`: Retrieve a list of books as arrays to be displayed on the front-end.
      + `GET /api/books/search`: Retrieve books based on user input of either title, author or genre.
      + `GET /api/book/:uuid`: Retrieve a particular book.

  - **Protected Endpopints for Librarian to Manage Books:**
      + `POST /api/book/add`: Add a new book, requires JWT authentication.
      + `PATCH /api/book/update/uuid`: Update details of an existing book, requires JWT authentication.
      + `DELETE /api/book/delete/uuid`: Remove a book from the catalogue, requires JWT authentication.
        
#### Deployement
  - **Technology Used:** DigitalOcean Droplet, Apache2, FileZilla, Domain.
  - **Hosting:** The web application's front-end and back-end are deployed on DigitalOcean.
      + **Droplet:** Droplet creation, server setup.
      + **Apache2 Configuration:** Apache2 configuration for Bookpedia virtual host including reverse proxy settings.
      + **File Transfer:** Transfer of local files to Droplet using FileZilla SFTP Port 22.
      + **Install Dependencies:** Installation of necessary dependencies using npm install including Node.js, PM2, and PostgreSQL.
      + **Set Environment Variables:** Managed with `.env` file, for secure database connection, JWT secrets.
      + **Database Migration:** Migration of Bookpedia database is handled as well.
   
### Installation Instructions
Bookpedia can be set up to run locally as follows:
  1. Clone the repository: `git clone https://github.com/hazminfirdaus/waad-ica.git`
  2. Navigate to the project directory: `cd waad-ica`.
  3. Install necessary dependencies: `npm install`
  4. Set up environment variables: Create a `.env` file and add the necessary variables (e.g., database connection string, JWT secret).
  5. Run database migrations: Migrate the `bookpedia.sql` into your database.
  6. Start the server: `npm start server.js` or alternatively `nodemon server.js`
  7. Open the frontend: Navigate to `http://localhost:yourportnumber` in your browser.
      
## 2. Evaluation of the Project
The Bookpedia web application has provided a great lesson value throughout the project development. It is considered to be a success, provided the fully-functioning prototype satisfied the initial project requirements.

### Successes are as follows:
  - Built the web app utilising the technologies per mentioned in the ICA brief including Alpine.js, Express.js, PostgreSQL, and deployed on DigitalOcean.
  - Implemented secured authentication using JWT.
  - Designed a user-friendly interface for both public users and librarians.
  - Ensured a reactive and responsive design for accesibility on various devices.

### Some of the biggest challenges encountered include:
  - Deployment was one of the toughest challenge faced on this project, especially the issues with Apache2.
  - File Handling to allow user to add a new book cover or edit an existing book cover. The struggle was to make it as responsive and seamless as the user select a cover or cancel it that it would be as reactive as possible.
  - Storing book cover in the database.
  - Styling and responsiveness were quite time consuming to ensure the web application appears as best as possible.
  - Handling asynchronous data fetching and state management in Alpine.js.
  - Ensuring data consistency and avoiding duplicate entries when managing books particularly as trying to figure out how implement infinite scrolling at the same time.

### Solutions:
  - Carried out research on how to configure the Apache2 on Droplet by referring to online forums such as Stack Overflow, reading DigitalOCean documentation as well as utilising chatGPT for assistance.
  - Intensive testing and debugging to ensure each component works as intended.
  - Implemented logics of event target files of file input in the front-end and updated endpoints logic.
  -  `multer.js` middleware is implemented in the backed-end to handle file upload including file path, storage settings as well as unique file naming.
  - Used Alpine.js reactivity and lifecycle hooks to manage state and DOM updates.
  - Added filtering logic to prevent duplicate entries when fetching books.
    The books are being fetched in arrays with initial fetch of 10 books and the next array is appended to the existing list by comparing uuids to avoid duplicates.
    As users scroll down the arrays being fetched continuouly until there are no more books to be display. Infinite scroll would prevent users from experiencing any sigificant delays from fetching the entire book list at once.
  - Implemented middleware and structured error handling in Express.js.
