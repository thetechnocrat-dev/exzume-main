var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = function (passport) {
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true,
  },
  function (req, username, password, done) {
    User.findOne({ 'local.username': username }, function (err, user, message) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, { signinMessage: 'username does not exist' });
      }

      if (!user.validPassword(password)) {
        return done(null, false, { signinMessage: 'invalid password' });
      }

      return done(null, user);
    });
  }
));
};
