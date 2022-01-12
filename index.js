const express = require('express'),
  app = express(),
  // morgan = require('morgan'),
  uuid = require('uuid'),
  bodyParser = require('body-parser');

app.use(express.static('public'));
// app.use(morgan('combined'));
app.use(bodyParser.json());

let movies = [{
  id: 01,
  artist: 'Pink Floyd',
  title: 'Pulse',
  descr: 'Lorem description',
  genre: {
    name: 'ProgRock',
    description: 'Genre Description goes here.'
  },
  director: {
    name: 'David Mallet',
    bio: 'Lorem bio.',
    birthyear: 1945,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=HriYRoxWo1I',
  featured: true
}, {
  id: 02,
  artist: 'Yello featuring Fifi Rong',
  title: 'Kiss the Cloud @Berlin @Kraftwerk 28-10-2016',
  descr: 'Lorem description',
  genre: {
    name: 'ElectroPop',
    description: 'Genre Description goes here.'
  },
  director: {
    name: null,
    bio: null,
    birthyear: null,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=Xv1cztJnOwk',
  featured: false
}, {
  id: 03,
  artist: 'Gardenstate',
  title: 'INSPIRATIONS',
  descr: 'Lorem description',
  genre: {
    name: 'MelodicTechno',
    description: 'Straight beats with lots of melodies.'
  },
  director: {
    name: null,
    bio: null,
    birthyear: null,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=VIgxb5Dbnmg',
  featured: true
}, {
  id: 04,
  artist: 'Franky Wah',
  title: 'Anjunadeep Open Air: London at The Drumsheds (Official 4K Set)',
  descr: 'Lorem description',
  genre: {
    name: 'TechHouse',
    description: 'Genre Description goes here.'
  },
  director: {
    name: null,
    bio: null,
    birthyear: null,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=J9LR2TQe9tg',
  featured: false
}, {
  id: 05,
  artist: 'Nastia',
  title: 'HOER Berlin September 28 2021',
  descr: 'Lorem description',
  genre: {
    name: 'Techno',
    description: 'Genre Description goes here.'
  },
  director: {
    name: null,
    bio: null,
    birthyear: null,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=vMmnm636T7s',
  featured: true
}, {
  id: 06,
  artist: 'Above & Beyond',
  title: 'Deep Warm Up Set, London',
  descr: 'Lorem description',
  ggenre: {
    name: 'Melodic Techno',
    description: 'Straight beats with lots of melodies.'
  },
  director: {
    name: null,
    bio: null,
    birthyear: null,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=IrzO9GqS8BY',
  featured: false
}, {
  id: 07,
  artist: 'Pink Floyd',
  title: 'Live at Pompeji',
  descr: 'Lorem description',
  genre: {
    name: 'ProgRock',
    description: 'Genre Description goes here.'
  },
  director: {
    name: 'Adrian Maben',
    bio: 'Adrian Maben is a director and writer, known for Pink Floyd at Pompeii (1972)',
    birthyear: 1942,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=fhDfmUnN1vY',
  featured: true
}, {
  id: 08,
  artist: 'Marsh',
  title: 'DJ Set (Live from Natural Bridge State Park, Kentucky)',
  descr: 'Lorem description',
  genre: {
    name: 'Melodic Techno',
    description: 'Genre Description goes here.'
  },
  director: {
    name: null,
    bio: null,
    birthyear: null,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=1TLJiuHp88s',
  featured: false
}, {
  id: 09,
  artist: 'Marsh & Tony McGuinness',
  title: 'Anjunadeep Open Air: London at The Drumsheds (Official 4K Set)',
  descr: 'Lorem description',
  genre: {
    name: 'Tech House',
    description: 'Genre Description goes here.'
  },
  director: {
    name: null,
    bio: null,
    birthyear: null,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=KXhp4NKVYa0',
  featured: false
}, {
  id: 10,
  artist: 'Steven Wilson',
  title: 'Home Invasion /Regret #9',
  descr: 'Lorem description',
  genre: {
    name: 'ProgRock',
    description: 'Genre Description goes here.'
  },
  director: {
    name: null,
    bio: null,
    birthyear: null,
    deathyear: null
  },
  image_url: null,
  yt_url: 'https://www.youtube.com/watch?v=-tajHRP9Cm8',
  featured: false
}];

let users = [{
    id: 1,
    name: 'Helga Musterfrau',
    favoriteMovies: []
  },
  {
    id: 2,
    name: 'Hans-Peter Mustermann',
    favoriteMovies: ["FavMov"]
  }
]

// READ
// Return a list of ALL movies
app.get('/movies', (req, res) => {
  res.status(200).json(movies);
});

// READ
// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title
app.get('/movies/:title', (req, res) => {
  const {
    title
  } = req.params; // Object destructuring
  const movie = movies.find(movie => movie.title === title);

  if (movie) {
    res.status(200).json(movie)
  } else {
    res.status(400).send(`No movie with the title \"${title}\" found`)
  }
});

// READ
// Return data about a genre (description) by name/title (e.g., “MelodicTechno”)
app.get('/movies/genres/:genreName', (req, res) => {
  const {
    genreName
  } = req.params; // Object destructuring
  const genre = movies.find(movie => movie.genre.name === genreName).genre;

  if (genre) {
    res.status(200).json(genre)
  } else {
    res.status(400).send('error')
  }
  // not working  why ?
});

// READ
// Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:directorName', (req, res) => {
  const {
    directorName
  } = req.params; // Object destructuring
  const director = movies.find(movie => movie.director.name === directorName).director;

  if (director) {
    res.status(200).json(director)
  } else {
    res.status(400).send('No such director')
  }
  // not working  why ?
});

// CREATE
// Allow new users to register
// Postman JSON dataset for testing: {"name":"Hans-Peter Mustermann","favoriteMovies":[]}
app.post('/users', (req, res) => {
  const newUser = req.body; // = body-parser middleware
  if (!newUser.name) {
    res.status(406).send('user name required')
  } else {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  }
});

// UPDATE !
// Allow users to update their user info (username)
// Postman JSON dataset for testing: {"name":"HP Mustermann"}
app.patch('/users/:id', (req, res) => {
  const {
    id
  } = req.params; // Object destructuring
  const updatedUser = req.body;

  let user = users.find(user => user.id == id); // 2 equal sings are used instead of 3 as both are numbers?
  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
    res.status(400).send('user not found')
  }
});

// CREATE
// Allow users to add a movie to their list of favorites (showing only a text that a movie has been added)
app.post('/users/:id/:newMovieTitle', (req, res) => {
  const {
    id,
    newMovieTitle
  } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies.push(newMovieTitle);
    res.status(200).send(`${newMovieTitle} has been successfully added to ${id}\'s list of favorites`);
  } else {
    res.status(400).send('no such user found')
  }
});

// DELETE
// Allow users to remove a movie from their list of favorites (showing only a text that a movie has been removed)
app.delete('/users/:id/:movieTitle', (req, res) => {
  const {
    id,
    movieTitle
  } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title != movieTitle);
    res.status(200).send(`${movieTitle} has been successfully removed from ${id}\'s list of favorites`);
  } else {
    res.status(400).send('no such user found')
  }
});

// DELETE
// Allow existing users to deregister (showing only a text that a user email has been removed)
app.delete('/users/:id', (req, res) => {
  const {
    id
  } = req.params;

  let user = users.find(user => user.id == id);

  if (user) {
    users = users.filter(user => user.id != id);
    // res.json(users) // to check whether it works
    res.status(200).send(`User with id ${id} has been successfully deleted.`);
  } else {
    res.status(400).send('no such user found')
  }
});

app.listen(8080, () => {
  console.log('jkraemr\'s music-movie-app is listening on port 8080.');
});
