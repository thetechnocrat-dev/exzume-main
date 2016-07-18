var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

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

          newUser.save(function (err) {
            if (err) {
              console.log('error in saving user: ' + err);
              throw err; // should we do something better here? probably -_-
            }

            console.log('local-signup - user registration successful');
            return done(null, newUser);
          });
        });
      });
    })
  );
};
