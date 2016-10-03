var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = function (passport) {
  passport.use('local-login', new LocalStrategy(
    function (username, password, done) {
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

        // always poll for user timezone
        if (user.timezoneOffset != (new Date()).getTimezoneOffset() * 3600) {
          user.timezoneOffset = (new Date()).getTimezoneOffset() * 3600;
          user.save(function (err) {
            if (err) {
              console.log('error in saving user: ' + err);
              throw err;
            } else {
              return done(null, user);
            }
          });
        }

        return done(null, user);
      });
    }
  ));
};
