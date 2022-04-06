# Music Movies API

RESTful API as complete server-side component for the myMusicMovies web applications built using the MERN or MEAN stack.

The **Music Movies API** is the complete server-side component of the **myMusicMovies** web application providing users with access to information about different music movies including details about genres, actors, directors, artists, and more. Users will be able to sign up, update their personal information, and create a list of their favorite music movies.

The **Music Movies API** consists of a RESTful API and non-relational database built using Node.js, Express, and MongoDB and will be accessed via commonly used HTTP methods like GET and POST. Similar methods (CRUD) are used to retrieve data from the database and store that data in a non-relational way. Whenever users are interacting with the **MyMusicMovies** web application, the **Music Movies API** including the server, business logic, and respective business layers, will process their requests and performing operations against the data in the database.

## Key Features

* Return a list of ALL movies to the user
* Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
* Return data about a genre (description) by name/title (e.g., “Comedy”)
* Return data about a director (bio, birth year, death year) by name
* Allow new users to register
* Allow users to update their user info (username, password, email, date of birth)
* Allow users to add a movie to their list of favorites
* Allow users to remove a movie from their list of favorites
* Allow existing users to deregister

## Who is the Music Movies API for?
* Frontend developers who will work on the client-side component of the **MyMusicMovies** web application using React or Angular.
* Movie enthusiasts who enjoy gaining further insights into a variety different music movies

## Built with
The **MyMusicMovies** web application is built using the MERN or MEAN stack:
* MongoDB
* Express.js
* React.js (MERN) or Angular.js (MEAN)
* Node.js

### Technical Specifications
* **Mongoose** ODM library for business logic modeling
* **Morgan** HTTP request logger middleware
* **body-parser** middleware for reading data from requests
* **uuid** package to generate RFC-compliant UUIDs

### Security Specifications
Implemented middleware/libraries/strategies to meet data security regulations:
* **Passport** authentication middleware for Node.js (local, jwt)
* **Node.bcrypt.js** library for password hashing to ensure a secure authentication process for login and registration
* **Express.js validator** middleware for server-side input data validation for all data-receiving endpoints
* **CORS** (Cross-Origin Resource Sharing) to extend HTTP requests (currently allowing requests from all origins)
* **Environment / Config variables** to hide the online database's connection URI

Database deployed on **MongoDB Atlas**

API hosted on **Heroku**:
[mymusicmovies.herokuapp.com](https://mymusicmovies.herokuapp.com/)

## Documentation
See JSDoc or refer to: 
[mymusicmovies.herokuapp.com/documentation](https://mymusicmovies.herokuapp.com/documentation.html)

## Acknowledgements

This project was built as part of the mentored CareerFoundry Full-Stack Web Development Program / Achievement 2/6 / Server-Side Programming & Node js: https://careerfoundry.com/en/courses/become-a-web-developer/

