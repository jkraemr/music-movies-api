const express = require('express'),
  app = express(),
  morgan = require('morgan'),
  {
    check,
    validationResult
  } = require('express-validator'),
  uuid = require('uuid'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  Movies = Models.Movie,
  Users = Models.User;

// Add Environment Variable (Config Var) to connect Heroku application to MongoDB Atlas database
mongoose.connect(process.env.CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose.connect('mongodb://localhost:27017/myMusicMoviesDB', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });

app.use(express.static('public'));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Specify that the app uses CORS (Cross-Origin Resource Sharing)
const cors = require('cors');
app.use(cors());

// By default, CORS will set the application to allow requests from all origins; however, if only certain origins shall be given access, "app.use(cors());" needs to be replaced with the following:
// let allowedOrigins = ['http://localhost:8080', 'http://localhost:1234', 'http://testsite.com'];

// app.use(cors({
//   origin: (origin, callback) => {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.indexOf(origin) === -1) { // If a specific origin isn’t found on the list of allowed origins
//       let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
//       return callback(new Error(message), false);
//     }
//     return callback(null, true);
//   }
// }));

// Import auth.js file to ensure the application can make use of it, and that the “auth.js” file can use Express.
let auth = require('./auth')(app); // (app) argument ensures that Express is available in “auth.js” file and auth.js can use Express

// Require Passport module and import passport.js file
const passport = require('passport');
require('./passport');


// MOVIES

/**
 * @description Endpoint to return a list of ALL movies to the user (READ).<br>
 * Requires authorization JWT.
 * @method GETAllMovies
 * @param {string} endpoint /movies
 * @param {req.headers} object Headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} A JSON object holding data about all movies. <br><br>Example:<br>
 *   Genre: { Name: <string>, Description: <string> },<br>
 *   Director: { Name: <string>, Bio: <string>, Birth: <string>, Death: <string> },
 *   _id: <string>,
 *   Title: <string>,
 *   Description: <string>,
 *   Featured: <boolean>,
 *   ImagePath: <string> (Example: "pink-floyd-live-at-pmpeii.jpg"),
 * ]}
 */
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

/**
 * @description Endpoint to return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user (READ).<br>
 * Requires authorization JWT.
 * @method GETOneMovie
 * @param {string} endpoint /movies/:Title
 * @param {req.headers} object Headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} A JSON object holding data about a single movie, containing an ID, title, description, image URL, featured
          (boolean), genre (name, description), director (name, bio).<br><br>Example:<br>{<blockquote cite="#">"Genre": {
            <blockquote cite="#">"Name":"Biography",<br>"Description": "A biographical film, or biopic, is a film that
              dramatizes the life of a non-fictional or historically-based person or people."</blockquote>
            },<br>"Director": {<blockquote cite="#">"Name": "Anton
              Corbijn",<br>"Bio": "Born in 1955 in Stijen, the Netherlands as Anton Johannes Gerrit Corbijn van
              Willenswaard. Anton Corbijn is a Dutch photographer, music video director, and film director. He is the
              creative director behind the
              visual
              output of Depeche Mode and U2, having handled the principal promotion and sleeve photography for both
              bands over three decades.",<br>"Birth": "1955"</blockquote>},<br>

            "Actors": [],<br>"_id": "61e34033816003b43cf7b40a",<br>"Title":
            "Control",<br>"Description": "Control is a 2007 British biographical film about the life of Ian Curtis,
            singer of the late-1970s English post-punk band Joy Division. It is the first feature film directed by Anton
            Corbijn, who had worked
            with Joy Division as a photographer.",<br>"ImagePath": "control.png",<br>"Featured": false
          </blockquote>}
 */
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

/**
 * @description Endpoint to return data about a genre (description) by name/title (e.g., “Concert”) (READ).<br>
 * Requires authorization JWT.
 * @method GETOneGenre
 * @param {string} endpoint /movies/genres/:genreName
 * @param {req.headers} object Headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} A JSON object holding data about a specific genre.<br><br>Example:<br>{<blockquote cite="#">"Name":
            "Comedy",<br>"Description": "Comedy films are funny and entertaining. The films in this genre center around
            a comedic premise—usually putting
            someone in a challenging, amusing, or humorous situation they’re not prepared to handle. Good comedy movies
            are less about making constant jokes, and more about presenting a universally relatable, real-life story
            with complex characters
            who learn an important lesson.(Masterclass.com)"</blockquote>}<br>
 */
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

/**
 * @description Endpoint to return data about a director (bio, birth year) by name (READ).<br>
 * Requires authorization JWT.
 * @method GETOneDirector
 * @param {string} endpoint /movies/directors/:directorName
 * @param {req.headers} object Headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} A JSON object holding data about a director.<br><br>Example:<br>{<blockquote cite="#">"Name": "Anton
            Corbijn",<br>
            "Bio": "Born in 1955 in Stijen, the Netherlands as Anton Johannes Gerrit Corbijn van Willenswaard. Anton
            Corbijn is a Dutch photographer, music video director, and film director. He is the creative director behind
            the visual output of
            Depeche Mode and U2, having handled the principal promotion and sleeve photography for both bands over three
            decades.",<br>
            "Birth": "1955"
          </blockquote>}<br>
 */
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

/**
 * @description Endpoint to allow new users to register (CREATE).<br>
 * Does not require authorization JWT.
 * @method POSTRegisterUser
 * @param {string} endpoint /register
 * @param {req.body} object The HTTP body must be a JSON object formatted as below (Birthday is optional):<br>
 * {<br>
 * "Username" : "test-user-030",<br>
 * "Password" : "test-pw-030",<br>
 * "Email" : "test@user-030.com",<br>
 * "Birthday" : "1968-03-02"<br>
 * }
 * @returns {object} A JSON object containing data for the new user. <br><br>Example:<br>
 * { _id: <string>,  
 *   Username: <string>,  
 *   Password: <string> (hashed),  
 *   Email: <string>, 
 *   Birthday: <string>  
 *   FavoriteMovies: []  
 * }
 */

// JSON Test user data:
// {
//     "Username" : "test-user-030",
//     "Password" : "test-pw-030",
//     "Email" : "test@user-030.com",
//     "Birthday" : "1968-03-02"
// }
app.post('/register',
  [
    check('Username', 'Please enter a username with at least 5 alphanumeric characters.').isLength({
      min: 5
    }),
    check('Username', 'Please enter a username containing at least 5 alphanumeric characters.').isAlphanumeric(),
    check('Password', 'Please enter a password.').not().isEmpty(),
    check('Email', 'Please enter a valid email address.').isEmail()
  ], (req, res) => {
    // check validation object for errors
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array()
      });
    }
    let hashedPassword = Users.hashPassword(req.body.Password); // Hash any password entered by the user when registering before storing it in database
    Users.findOne({
      Username: req.body.Username
    }) // Check if a user with the requested username already exists
      .then((user) => {
        if (user) {
          return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users
            .create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) => {
              res.status(201).json(user)
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send('Error: ' + error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      });
  });

/**
* @description Endpoint to get data for a single user.<br>
* Requires authorization JWT.
* @method GETOneUser
* @param {string} endpoint /users/:username
* @param {req.headers} object Headers object containing the JWT formatted as below:<br>
* { "Authorization" : "Bearer <jwt>"}
* @returns {object} A JSON object containing data for the user.<br><br>Example:<br>
* { _id: <string>,   
*   Username: <string>,   
*   Password: <string> (hashed),   
*   Email: <string>,  
*   Birthday: <string>  
*   FavoriteMovies: [<string>]  
* }
*/
app.get('/users/:username', passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Users.findOne({ Username: req.params.username })
      .populate("FavoriteMovies")
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("Error: " + err);
      });
  }
);

/**
 * Version 1 with PATCH method and ES6’s .then and .catch functions
 * @description Endpoint to allow users to update their user info (UPDATE).<br>
 * Requires authorization JWT.
 * @method PATCHUpdateUser
 * @param {string} endpoint /users/:Username
 * @param {req.headers} object Headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @param {req.body} object The HTTP body must be a JSON object formatted as below (Email, Birthday optional):<br>
 * {<br>
 * "Username": "johndoe",<br>
 * "Password": "aStrongPasWwOOrd",<br>
 * "Email" : "johndo@gmail.com",<br>
 * "Birthday" : "1995-08-24"<br>
 * }
 * @returns {object} A JSON object containing updated user data.<br><br>Example:<br>
 * { _id: <string>,   
 *   Username: <string>,   
 *   Password: <string> (hashed),   
 *   Email: <string>,  
 *   Birthday: <string>  
 *   FavoriteMovies: [<string>]  
 * }
 */
app.patch('/users/:Username', passport.authenticate('jwt', {
  session: false
}),
  [
    check('Username', 'Please enter a username with at least 5 alphanumeric characters.').isLength({
      min: 5
    }),
    check('Username', 'Please enter a username containing at least 5 alphanumeric characters.').isAlphanumeric(),
    check('Password', 'Please enter a password.').not().isEmpty(),
    check('Email', 'Please enter a valid email address.').isEmail()
  ],
  (req, res) => {
    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate({
      Username: req.params.Username
    }, {
      $set: {
        Username: req.body.Username,
        Password: hashedPassword,
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

// // Allow users to update their user info (username) UPDATE<br>
// // Alternative Version 2 with PUT method and combining the callback and the error-handling into a single callback (opposed to the PATCH request above)
// app.put('/users/:Username', passport.authenticate('jwt', {
//     session: false
//   }),
//   [
//     check('Username', 'Please enter a username with at least 5 alphanumeric characters.').isLength({
//       min: 5
//     }),
//     check('Username', 'Please enter a username containing at least 5 alphanumeric characters.').isAlphanumeric(),
//     check('Password', 'Please enter a password.').not().isEmpty(),
//     check('Email', 'Please enter a valid email address.').isEmail()
//   ],
//   (req, res) => {
//     Users.findOneAndUpdate({
//         Username: req.params.Username
//       }, {
//         $set: {
//           Username: req.body.Username,
//           Password: req.body.Password,
//           Email: req.body.Email,
//           Birthday: req.body.Birthday
//         }
//       }, {
//         new: true
//       }, // making sure the updated document is returned
//       (err, updatedUser) => {
//         if (err) {
//           console.error(err);
//           res.status(500).send('Error: ' + err);
//         } else {
//           res.status(201).json(updatedUser);
//         }
//       });
//   });

/**
 * @description Endpoint to allow users to add a movie to their list of favorites (CREATE).<br>
 * Requires authorization JWT.
 * @method POSTAddFavoriteMovie
 * @param {string} endpoint /users/:Username/movies/:MovieID
 * @param {req.headers} object Headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} A JSON object containing updated user data.<br><br>Example:<br>
 * A JSON object holding the updated user info:<br>{<blockquote cite="#">"_id":
            "61e6da92331a989a513439d9",<br>"Username": "hanspeter",<br>"Password": "hp-pw-122",<br>"Email":
            "hans@peter.de",<br>"FavoriteMovies": [<blockquote cite="#">
              "61e354f9816003b43cf7b411",<br>"61e34ac3816003b43cf7b410"</blockquote>],<br>"__v": 0,<br>"Birthday":
            "1986-01-22T00:00:00.000Z"</blockquote>}
 */
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

/**
 * @description Endpoint to allow users to remove a movie from their list of favorites (DELETE).<br>
 * Requires authorization JWT.
 * @method DELETEFavoriteMovie
 * @param {string} endpoint /users/:Username/movies/:MovieID
 * @param {req.headers} object Headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {object} A JSON object containing updated user data. <br><br>Example:<br>
 * A JSON object holding the updated user info:<br>{<blockquote cite="#">"_id":
            "61e6da92331a989a513439d9",<br>"Username": "hanspeter",<br>"Password": "hp-pw-122",<br>"Email":
            "hans@peter.de",<br>"FavoriteMovies": [<blockquote cite="#">
              "61e354f9816003b43cf7b411"</blockquote>],<br>"__v": 0,<br>"Birthday": "1986-01-22T00:00:00.000Z"
          </blockquote>}
 */
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

/**
 * @description Endpoint to allow existing users to deregister (showing only a text that a user email has been removed) (DELETE).<br>
 * Requires authorization JWT.
 * @method DELETEUserAccount
 * @param {string} endpoint - /users/:Username
 * @param {req.headers} object Headers object containing the JWT formatted as below:<br>
 * { "Authorization" : "Bearer <jwt>"}
 * @returns {string} A text message indicating whether the user has been successfully deleted.<br><br>Example:<br>" User XY was deleted."
 */
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


// MISC

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// app.get('/documentation', (req, res) => {
//   res.sendFile('public/documentation.html', { root: __dirname });
// });

app.use(express.static('public'))

// app.listen(8080, () => {
//   console.log('jkraemr\'s music-movie-app is listening on port 8080.');
// });

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('jkraemr\'s music-movie-app is listening on Port ' + port);
});
