var passport = require('passport');
var mongoose = require('mongoose');
var localSignup = require('./local-signup');
var localSignin = require('./local-signin');

module.exports = function () {
  var User = mongoose.model('User');

  // serialize so that passwords are not stored in database
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  localSignup(passport);
  localSignin(passport);
};
