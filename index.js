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

// let movies = [{
//   id: 01,
//   artist: 'Pink Floyd',
//   title: 'Pulse',
//   descr: 'Lorem description',
//   genre: {
//     name: 'ProgRock',
//     description: 'Genre Description goes here.'
//   },
//   director: {
//     name: 'David Mallet',
//     bio: 'Lorem bio.',
//     birthyear: 1945,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=HriYRoxWo1I',
//   featured: true
// }, {
//   id: 02,
//   artist: 'Yello featuring Fifi Rong',
//   title: 'Kiss the Cloud @Berlin @Kraftwerk 28-10-2016',
//   descr: 'Lorem description',
//   genre: {
//     name: 'ElectroPop',
//     description: 'Genre Description goes here.'
//   },
//   director: {
//     name: null,
//     bio: null,
//     birthyear: null,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=Xv1cztJnOwk',
//   featured: false
// }, {
//   id: 03,
//   artist: 'Gardenstate',
//   title: 'INSPIRATIONS',
//   descr: 'Lorem description',
//   genre: {
//     name: 'MelodicTechno',
//     description: 'Straight beats with lots of melodies.'
//   },
//   director: {
//     name: null,
//     bio: null,
//     birthyear: null,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=VIgxb5Dbnmg',
//   featured: true
// }, {
//   id: 04,
//   artist: 'Franky Wah',
//   title: 'Anjunadeep Open Air: London at The Drumsheds (Official 4K Set)',
//   descr: 'Lorem description',
//   genre: {
//     name: 'TechHouse',
//     description: 'Genre Description goes here.'
//   },
//   director: {
//     name: null,
//     bio: null,
//     birthyear: null,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=J9LR2TQe9tg',
//   featured: false
// }, {
//   id: 05,
//   artist: 'Nastia',
//   title: 'HOER Berlin September 28 2021',
//   descr: 'Lorem description',
//   genre: {
//     name: 'Techno',
//     description: 'Genre Description goes here.'
//   },
//   director: {
//     name: null,
//     bio: null,
//     birthyear: null,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=vMmnm636T7s',
//   featured: true
// }, {
//   id: 06,
//   artist: 'Above & Beyond',
//   title: 'Deep Warm Up Set, London',
//   descr: 'Lorem description',
//   ggenre: {
//     name: 'Melodic Techno',
//     description: 'Straight beats with lots of melodies.'
//   },
//   director: {
//     name: null,
//     bio: null,
//     birthyear: null,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=IrzO9GqS8BY',
//   featured: false
// }, {
//   id: 07,
//   artist: 'Pink Floyd',
//   title: 'Live at Pompeji',
//   descr: 'Lorem description',
//   genre: {
//     name: 'ProgRock',
//     description: 'Genre Description goes here.'
//   },
//   director: {
//     name: 'Adrian Maben',
//     bio: 'Adrian Maben is a director and writer, known for Pink Floyd at Pompeii (1972)',
//     birthyear: 1942,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=fhDfmUnN1vY',
//   featured: true
// }, {
//   id: 08,
//   artist: 'Marsh',
//   title: 'DJ Set (Live from Natural Bridge State Park, Kentucky)',
//   descr: 'Lorem description',
//   genre: {
//     name: 'Melodic Techno',
//     description: 'Genre Description goes here.'
//   },
//   director: {
//     name: null,
//     bio: null,
//     birthyear: null,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=1TLJiuHp88s',
//   featured: false
// }, {
//   id: 09,
//   artist: 'Marsh & Tony McGuinness',
//   title: 'Anjunadeep Open Air: London at The Drumsheds (Official 4K Set)',
//   descr: 'Lorem description',
//   genre: {
//     name: 'Tech House',
//     description: 'Genre Description goes here.'
//   },
//   director: {
//     name: null,
//     bio: null,
//     birthyear: null,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=KXhp4NKVYa0',
//   featured: false
// }, {
//   id: 10,
//   artist: 'Steven Wilson',
//   title: 'Home Invasion /Regret #9',
//   descr: 'Lorem description',
//   genre: {
//     name: 'ProgRock',
//     description: 'Genre Description goes here.'
//   },
//   director: {
//     name: null,
//     bio: null,
//     birthyear: null,
//     deathyear: null
//   },
//   image_url: null,
//   yt_url: 'https://www.youtube.com/watch?v=-tajHRP9Cm8',
//   featured: false
// }];
//
// let users = [{
//     id: 1,
//     name: 'Helga Musterfrau',
//     favoriteMovies: []
//   },
//   {
//     id: 2,
//     name: 'Hans-Peter Mustermann',
//     favoriteMovies: ["FavMov"]
//   }
// ]

// MOVIES

// Return a list of all movies / READ
app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title / READ
app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a genre (description) by name/title (e.g., “Concert”) / READ
app.get('/movies/genres/:genreName', (req, res) => {
  Movies.findOne({ 'Genre.Name': req.params.genreName })
    .then((movie) => {
      res.json(movie.Genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

// Return data about a director (bio, birth year, death year) by name / READ
app.get('/movies/directors/:directorName', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.directorName })
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
// JSON test object:
// {
//     "Username" : "justincase",
//     "Password" : "justincase-pw123",
//     "Email" : "justin@case.com"
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
// V1 with PATCH method and ES6’s .then and .catch functions
// JSON test object
// {
//   "Username" : "Edepetete",
//   "Password" : "edepetete-pw-456",
//   "Email" : "ede@petete.de"
// }
app.patch('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }) // making sure the updated document is returned
  .then((user) => {
    res.status(201).json(user);
  })
  .catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  })
});
// Allow users to update their user info (username) UPDATE
// V2 with PUT method and combining the callback and the error-handling into a single callback
// JSON test object:
// {
//   "Username" : "jimpandzko",
//   "Password" : "jp-pw-123",
//   "Email" : "jim@pandzko.de",
//   "Birthday" : "1986-01-22"
// }
app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set:
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  },
  { new: true }, // making sure the updated document is returned
  (err, updatedUser) => {
    if(err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added) / CREATE
app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $addToSet: { FavoriteMovies: req.params.MovieID }
   },
   { new: true },
  (err, updatedUser) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error: ' + err);
    } else {
      res.json(updatedUser);
    }
  });
});

// Allow users to remove a movie from their list of favorites / DELETE
app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
     $pull: { FavoriteMovies: req.params.MovieID }
   },
   { new: true },
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
app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
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
