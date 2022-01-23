# *Music Movies API*

The *Music Movies API* is the complete server-side component of the *My Music Movies* web application that will provide users with access to information about different music movies including details about genres, actors, directors, artists, and more. Users will be able to sign up, update their personal information, and create a list of their favorite music movies.

The *Music Movies API* consists of a RESTful API and non-relational database built using Node.js, Express, and MongoDB and will be accessed via commonly used HTTP methods like GET and POST. Similar methods (CRUD) are used to retrieve data from the database and store that data in a non-relational way. Whenever users are interacting with the *My Music Movies* web application, the *Music Movies API* including the server, business logic, and respective business layers, will process their requests and performing operations against the data in the database.

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

## Who is the *Music Movies API* for?
* Frontend developers who will work on the client-side component of the *My Music Movies* web application using REACT.
* Movie enthusiasts who enjoy gaining further insights into a variety different music movies.

## Built with
The *My Music Movies* web application is built using the MERN stack:
* MongoDB
* Express.js
* React.js
* Node.js

Database deployed on MongoDB Atlas

API hosted on Heroku:
[mymusicmovies.herokuapp.com](https://mymusicmovies.herokuapp.com/")

## Documentation
Full documentation available at:
[mymusicmovies.herokuapp.com/documentation](https://mymusicmovies.herokuapp.com/documentation")
