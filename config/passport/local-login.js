var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = function (passport) {
  passport.use('local-login', new LocalStrategy(
  function (username, password, done) {
    User.findOne({ 'local.username': username }, function (err, user, message) {
      if (err) {
        console.log('local login err', err);
        return done(err);
      }

      if (!user) {
        console.log('local login !user');
        return done(null, false, { signinMessage: 'username does not exist' });
      }

      if (!user.validPassword(password)) {
        console.log('local login not valid PW');
        return done(null, false, { signinMessage: 'invalid password' });
      }

      console.log('local login success');
      return done(null, user);
    });
  }
));
};
