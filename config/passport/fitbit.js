var passport = require('passport');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;

module.exports = function (passport) {
  passport.use(new FitbitStrategy({
      clientID:     '227TQM',
      clientSecret: 'd44c4411eec72933ccd86d7efe8ea12d',
      callbackURL: 'http://exzume.com/auth/fitbit/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('hi josh');
      User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));
};
