// Create the actual logic / new endpoint that will authenticate login requests of registered users when they log in using their username and password (basic HTTP authentication), as well as generating a JWT that will authenticate their future requests.

const jwtSecret = 'jks_jwt_super_secret';

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport'); // local passport file

/**
 * @description Generates a JWT for a user and returns the token as a string.
 * @method generateJWTToken
 * @param {object} user Object containing all of the user's data.
 * @returns {string} JWT for the logged in user.
 */
let generateJWTToken = (user) => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, // Username to encode in the JWT
    expiresIn: '5d',
    algorithm: 'HS256' // Algorithm to 'sign' or encode the values of the JWT
  });
}

// POST login

// Define  LocalStrategy to check whether the username and the password in the body of the request exist in the database. If they do, the generateJWTToken(); function creates a JWT based on the username and password, which is then sent back as a response to the client.

/**
 * @description Endpoint to login user
 * @method POSTLoginUser
 * @param {string} endpoint /login?Username=[Username]&Password=[Password]
 * @returns {object} JSON object containing data for the user and a new JWT.
 * { user: {
 *   _id: <string>,
 *   Username: <string>,
 *   Password: <string> (hashed),
 *   Email: <string>,
 *   Birthday: <string>,
 *   FavoriteMovies: [<string>]
 *   },
 *   token: <string>
 * }
 */
module.exports = (router) => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', {
      session: false
    }, (error, user, info) => {
      if (error || !user) {
        return res.status(400).json({
          message: 'Something is wrong',
          user: user
        });
      }
      req.login(user, {
        session: false
      }, (error) => {
        if (error) {
          res.send(error);
        }
        let token = generateJWTToken(user.toJSON());
        return res.json({
          user,
          token
        }); // ES6 shorthand for res.json({ user: user, token: token }). With ES6, if keys are the same as values, this shorthand may be used.
      });
    })(req, res);
  });
}
