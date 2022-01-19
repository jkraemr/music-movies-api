const express = require('express'),
  app = express(),
  // morgan = require('morgan'),
  uuid = require('uuid'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  Movies = Models.Movie,
  Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myMusicMoviesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.static('public'));
// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Import auth.js file to ensure the application can make use of it, and that the “auth.js” file can use Express.
let auth = require('./auth')(app); // (app) argument ensures that Express is available in “auth.js” file and auth.js can use Express

// Require Passport module and import passport.js file
const passport = require('passport');
require('./passport');


// MOVIES

// Return a list of all movies / READ
app.get('/movies', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Movies.find()
    .then((movies) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title / READ
app.get('/movies/:Title', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Movies.findOne({
      Title: req.params.Title
    })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a genre (description) by name/title (e.g., “Concert”) / READ
app.get('/movies/genres/:genreName', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Movies.findOne({
      'Genre.Name': req.params.genreName
    })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a director (bio, birth year, death year) by name / READ
app.get('/movies/directors/:directorName', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Movies.findOne({
      'Director.Name': req.params.directorName
    })
    .then((movie) => {
      res.json(movie.Director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});


// USERS

// Allow new users to register / CREATE
// JSON Test user data:
// {
//     "Username" : "test-user-030",
//     "Password" : "test-pw-030",
//     "Email" : "test@user-030.com",
//     "Birthday" : "1968-03-02"
// }
app.post('/users', (req, res) => {
  Users.findOne({
      Username: req.body.Username
    })
    .then((user) => {
      if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => {
            res.status(201).json(user)
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Allow users to update their user info (username) UPDATE
// Version 1 with PATCH method and ES6’s .then and .catch functions
app.patch('/users/:Username', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $set: {
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      }
    }, {
      new: true
    }) // making sure the updated document is returned
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    })
});

// // Allow users to update their user info (username) UPDATE
// // Version 2 with PUT method and combining the callback and the error-handling into a single callback (opposed to the PATCH request above)
// app.put('/users/:Username', passport.authenticate('jwt', {
//   session: false
// }), (req, res) => {
//   Users.findOneAndUpdate({
//       Username: req.params.Username
//     }, {
//       $set: {
//         Username: req.body.Username,
//         Password: req.body.Password,
//         Email: req.body.Email,
//         Birthday: req.body.Birthday
//       }
//     }, {
//       new: true
//     }, // making sure the updated document is returned
//     (err, updatedUser) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//       } else {
//         res.status(201).json(updatedUser);
//       }
//     });
// });

// Allow users to add a movie to their list of favorites / CREATE
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $addToSet: {
        FavoriteMovies: req.params.MovieID
      }
    }, {
      new: true
    },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.status(201).json(updatedUser);
      }
    });
});

// Allow users to remove a movie from their list of favorites / DELETE
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $pull: {
        FavoriteMovies: req.params.MovieID
      }
    }, {
      new: true
    },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Allow existing users to deregister (showing only a text that a user email has been removed) / DELETE
app.delete('/users/:Username', passport.authenticate('jwt', {
  session: false
}), (req, res) => {
  Users.findOneAndRemove({
      Username: req.params.Username
    })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

app.listen(8080, () => {
  console.log('jkraemr\'s music-movie-app is listening on port 8080.');
});
