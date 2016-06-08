var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/user');

module.exports = function (passport) {
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true,
  },
    function (req, username, password, done) {
      process.nextTick(function () {
        User.findOne({ 'local.username': username }, function (err, user) {
          if (err) {
            return done(err);
          }

          // already exists
          if (user) {
            return done(null, false, req.flash('signupMessage', 'Username is already take'));
          }

          // not already signed in
          if (!req.user) {
            var newUser = new User();

            newUser.local.username = username;
            newUser.local.password = newUser.generateHash(password);
            newUser.local.email = req.body.email;

            newUser.save(function (err) {
              if (err) {
                console.log('error in saving user: ' + err);
                throw err;
              }

              console.log('user registration successful');
              return done(null, newUSer);
            });
          }
        });
      });
    })
  );
};
