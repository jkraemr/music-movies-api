// Import Express module and Morgan middleware library locally
const express = require('express'),
  morgan = require('morgan');
// Define instance of Express that encapsulates Express’s functionality to configure the web server. Will be used to route  HTTP requests and responses
const app = express();

// Pass Morgan into app.use() function to log all requests to the terminal
app.use(morgan('combined'));

// Put user authentication here at a later stage?

// Create function that automatically routes all requests for static files to their corresponding files within a certain folder on the server (in this case, the “public” folder)
app.use(express.static('public'));

// Define JSON object containing data about jkraemr's current top ten music movies
let myTopTenMusicMovies = [{
  artist: 'Pink Floyd',
  title: 'Pulse',
  url: 'https://www.youtube.com/watch?v=HriYRoxWo1I'
}, {
  artist: 'Pink Floyd',
  title: 'Live at Pompeji',
  url: 'https://www.youtube.com/watch?v=fhDfmUnN1vY'
}, {
  artist: 'Yello featuring Fifi Rong',
  title: 'Kiss the Cloud @Berlin @Kraftwerk 28-10-2016',
  url: 'https://www.youtube.com/watch?v=Xv1cztJnOwk'
}, {
  artist: 'Gardenstate',
  title: 'INSPIRATIONS (Live from Fagradalsfjall Volcano, Iceland)',
  url: 'https://www.youtube.com/watch?v=VIgxb5Dbnmg'
}, {
  artist: 'Franky Wah',
  title: 'Anjunadeep Open Air: London at The Drumsheds (Official 4K Set)',
  url: 'https://www.youtube.com/watch?v=J9LR2TQe9tg'
}, {
  artist: 'Nastia',
  title: 'HOER Berlin September 28 2021',
  url: 'https://www.youtube.com/watch?v=vMmnm636T7s'
}, {
  artist: 'Above & Beyond',
  title: 'Above & Beyond: Group Therapy 450 Deep Warm Up Set, London (Full 4K Live Set)',
  url: 'https://www.youtube.com/watch?v=IrzO9GqS8BY'
}, {
  artist: 'Marsh',
  title: 'DJ Set (Live from Natural Bridge State Park, Kentucky)',
  url: 'https://www.youtube.com/watch?v=1TLJiuHp88s'
}, {
  artist: 'Marsh & Tony McGuinness',
  title: 'Anjunadeep Open Air: London at The Drumsheds (Official 4K Set)',
  url: 'https://www.youtube.com/watch?v=KXhp4NKVYa0'
}, {
  artist: 'Franky Wah',
  title: 'Live From Ibiza | Ministry of Sound',
  url: 'https://www.youtube.com/watch?v=CTMoaotVtZw'
}];

// GET requests / App routing

// Create Express GET route located at the endpoint "/movies" that returns a JSON object containing data about jkraemr's current top ten music movies
app.get('/movies', (req, res) => {
  res.json(myTopTenMusicMovies);
});

// Create Express GET route located at the endpoint “/” that returns a default textual response
app.get('/', (req, res) => {
  res.send('<h1>Music Movie API</h1><a href="./documentation.html">View documentation</a><br><br><a href="./movies">View a list of jkraemr\'s current top ten music movies (JSON)</a><br><br><a href="https://github.com/jkraemr/music-movies-api" target="_blank">Visit GitHub repository (jkraemr/music-movies-api).</a>')
});

// Create Express GET route located at not further defined endpoints returning a default textual response
app.get('*', (req, res) => {
  res.send('<p>Nothing here yet.</p><a href="./">Go Back</a>');
});

// Create error-handling middleware function that will log all application-level errors to the terminal.
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Oh No! There is an application-level error!');
});

// Listen for requests
app.listen(8080, () => {
  console.log('jkraemr\'s music-movie-app is listening on port 8080.');
});
