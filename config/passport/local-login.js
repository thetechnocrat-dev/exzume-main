var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = function (passport) {
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true,
  },
  function (req, username, password, done) {
    User.findOne({ 'local.username': username }, function (err, user) {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false, req.flash('signinMessage', 'Username does not exist.'));
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('signinMessage', 'Invalid Password'));
      }

      return done(null, user);
    });
  }
));
};
