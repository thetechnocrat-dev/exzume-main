var passport = require('passport');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;

module.exports = function (passport) {
  passport.use(new FitbitStrategy({
      clientID:     '227TQM',
      clientSecret: 'd44c4411eec72933ccd86d7efe8ea12d',
      callbackURL: '/auth/fitbit/callback/',
      authorizationURL: 'https://www.fitbit.com/oauth2/authorize?response_type=code'
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('hi josh');
      User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));
};
