var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');
var crypto = require('crypto');
var email = require('../../util/email');
var validator = require('validator');
var moment = require('moment');

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
          newUser.local.username = validator.rtrim(username);
          if (validator.isLength(password, { min: 6, max: undefined })) {
            newUser.local.password = newUser.generateHash(password);
          } else {
            return done(null, false, { errorMessage: 'password must be at least 6 characters' });
          }

          newUser.local.email = req.body.email;
          newUser.local.confirmEmail.token = crypto.randomBytes(64).toString('hex');
          newUser.local.passwordResetToken = crypto.randomBytes(64).toString('hex');
          newUser.timezoneOffset = moment().utcOffset() * 60000;

          newUser.save(function (err) {
            if (err) {
              console.log('error in saving user: ' + err);
              throw err; // should we do something better here? probably -_-
            }

            var subject = 'Welcome to Exzume!';

            email.send(
              req.body.email,
              subject,
              email.welcomeMessage(newUser.local.username, newUser.local.confirmEmail.token
            ));
            console.log('local-signup - user registration successful');
            return done(null, newUser);
          });
        });
      });
    })
  );
};
