const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  Models = require('./models.js'),
  passportJWT = require('passport-jwt');

let Users = Models.User,
  JWTStrategy = passportJWT.Strategy,
  ExtractJWT = passportJWT.ExtractJwt;

/**
 * @description Define passport strategy for basic HTTP authentication for login requests. Middleware logic for checking login credentials for a user.<br>
 * This is called when a user logs in.<br>
 * First ensures the user exists, then checks that the password is correct.
 * @method loginStrategy
 * @returns {boolean} Returns true if credentials are valid, false otherwise
 */
passport.use(new LocalStrategy({
  usernameField: 'Username',
  passwordField: 'Password'
}, (username, password, callback) => {
  console.log(username + '  ' + password);
  Users.findOne({
    Username: username
  }, (error, user) => {
    if (error) {
      console.log(error);
      return callback(error);
    }
    if (!user) {
      console.log('incorrect username');
      return callback(null, false, {
        message: 'Incorrect username.'
      });
    }
    // Hash any password entered by the user when logging in before comparing it to the password stored in the database
    if (!user.validatePassword(password)) {
      console.log('incorrect password');
      return callback(null, false, {
        message: 'Incorrect password.'
      });
    }
    console.log('finished');
    return callback(null, user);
  });
}));

/**
 * @description Define passport strategy to authenticate users based on the JWT submitted alongside their requests. Middleware logic for checking JWT for a user.<br>
 * This is called when a accesses any protected endpoints.<br>
 * Decodes the JWT and then checks to see if the encoded username exists on the server
 * @method jwtStrategy
 * @returns {boolean} Returns true if JWT is valid, false otherwise
 */
// 
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jks_jwt_super_secret'
}, (jwtPayload, callback) => {
  return Users.findById(jwtPayload._id)
    .then((user) => {
      return callback(null, user);
    })
    .catch((error) => {
      return callback(error)
    });
}));
