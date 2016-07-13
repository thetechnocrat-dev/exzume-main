var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var Fitbit = require('../../../models/dataStreams/fitbit');

module.exports = function (passport) {
  passport.use(new FitbitStrategy({
      clientID:     '227TQM',
      clientSecret: 'd44c4411eec72933ccd86d7efe8ea12d',
      callbackURL: '/auth/fitbit/callback/',
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      var user = req.user;
      var fitbit = new Fitbit();
      fitbit.owner = user.local.username;
      fitbit.profileId = profile.id;
      fitbit.accessToken = accessToken;
      fitbit.refreshToken = refreshToken;
      fitbit.save(function (err) {
        if (err) {
          done(err, user);
        } else {
          user.fitbit = fitbit;
          user.save(function (err) {
            console.log('here');
            done(err, user);
          });
        };
      });
    }));
};
