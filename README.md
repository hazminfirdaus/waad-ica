# <picture> <img alt="logo" src="/public/img/logo/logo.svg"> </picture> [Bookpedia](http://www.bookpedia.xyz/)

A repository for ICA of Web Application Architecture and Development.

<p align="center"> 
  <img width="650" height="350" alt="homepage" src="/public/img/screenshot/homepage.png">
</p>

Live demo: [Bookpedia](http://www.bookpedia.xyz/)


## 1. Application Architecture and Development

### 1.1 Application Architecture
Bookpedia book library catalogue web application is developed using a modern architecture that separates concerns between the front-end and back-end, ensuring scalability, maintainability, and seurity.
The detailed explaination of the architecture is as follows:
  - **Front-end:** User interface and client side logic.
  - **Back-end:** Server-side logic, REST API and authentication.
  - **Database:** Persistent storage of book and user data.

#### Front-end Architecture
  - **Technologies Used:** HMTL5, CSS3, JavaScript, Alpine.js.
  - **Structure:** The front-end consists of multiple components created using Alpine.js for reactivity:
      + **Components:** These include the book list, book details, search bar, pagination, infinite scroll, add form, toggle manage books, and edit/update form including delete button.
      + **State Management:** Managed locally using Alpine.js, ensuring a smooth interactions and reactive user experience.
      + **API Integration:** Use fetch API to interact with the back-end, sending requests for data and receiving responses.
        
#### Back-end Architecture
  - **Technologies Used:** Node.js Express.js
  - **Structure:** The back-end is structured using Model-View-Controller (MVC) pattern.
      + **Models:** Define the data structure and interact with PostgreSQL database using `pg`. There are db and book models.
      + **Controller:** Handle the logic for each endpoints, processing requests, interacting with models, and sending responses.
      + **Routes:** API endpoints including `api.js` and `user.js`.
      + **Middleware:** Includes `authorize.js` middleware to handle JSON Web Token (JWT) authentication of librarian as admin and `multer.js` middleware to deal with file handling.
   
#### Database
  - **Technology Used:** PostgreSQL
  - **Schema:** The database schema includes tables for books, users, admins.
      + **Books Table:** Contains fields of `id`, `title`, `author`, `genre`, `uuid`, and `cover`.
      + **Users Table:** Stores user credentials, including `username` and hashed `password`.
      + **Admins Table:** Stores information of librarian as admin with `id`, `user_id`, and `lib_id`.
        
#### Authentication
  - **JWT:** Secure authenticationn using JWT.
      + **Login:** On successful login, a JWT token is generated and returned to the client. 
      + **Protected Routes:** Certain routes for managing books require a valid JWT token verified by the back-end middleware. Authentication middleware verifyToken and isAdmin for librarian as admin.
   
#### API Endpoints
  - **Public Endpoints for Readers:**
      + `GET /api/books`: Retrieve a list of books as arrays to be displayed on the front-end.
      + 

### 1.2 Development
#### Back-end Development
  - **Endpoints**
    
  - **Authentication: Implement JWT for Secure Authentication**
    + aaa
    + ssss
    + sasasas
   

  - **Database Connection**
  - **CRUDs REST API Communication**
  - 
  - **Logic Handling**
  - **Responsive HTML5/CSS3 front-end interface utilising Alpine.js framework and fetch API**

#### Deployment 

### 1.4 Components
Authentication, CRUDs, Initialization, handling file change, search and pagination, admin control, data binding, infinite scrolling for all books

## 2. Evaluation of the Project
The Bookpedia web application has provided a great lesson value throughout the project development. It is considered to be a success, provided the fully-functioning prototype satisfied the initial project requirements.

Some of the biggest challenges encountered include:
  - i. Deployment
  - ii. File Handling
  - iii. styling and Responsiveness

