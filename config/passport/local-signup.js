var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var crypto = require('crypto');
var email = require('../../util/email');

module.exports = function (passport) {
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true,
  },
    function (req, username, password, done) {
      process.nextTick(function () {
        User.findOne({ 'local.username': username }, function (err, user, message) {
          if (err) {
            console.log('local-signup error in sign up: ' + err);
            return done(err);
          }

          // already exists
          if (user) {
            console.log('user already exists with username: ' + username);
            return done(null, false, { errorMessage: 'username already exists' });
          }

          var newUser = new User();
          newUser.local.username = username;
          newUser.local.password = newUser.generateHash(password);
          newUser.local.email = req.body.email;
          newUser.local.confirmEmail.token = crypto.randomBytes(64).toString('hex');
          var EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 3; // 3 days
          newUser.local.confirmEmail.expires = new Date(Date.now() + EXPIRATION_TIME);

          newUser.save(function (err) {
            if (err) {
              console.log('error in saving user: ' + err);
              throw err; // should we do something better here? probably -_-
            }

            var subject = 'Welcome to Exzume!';

            email.send(req.body.email, subject, email.welcomeMessage);
            console.log('local-signup - user registration successful');
            return done(null, newUser);
          });
        });
      });
    })
  );
};
