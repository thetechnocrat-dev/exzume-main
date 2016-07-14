var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var Fitbit = require('../../../models/dataStreams/fitbit');
var config = require('../../config');

module.exports = function (passport) {
  passport.use(new FitbitStrategy({
      clientID: config.fitbit.clientID,
      clientSecret: config.fitbit.clientSecret,
      callbackURL: config.fitbit.callbackURL,
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      var user = req.user;
      var fitbit = new Fitbit();
      fitbit.ownerId = user._id;
      fitbit.profileId = profile.id;
      fitbit.accessToken = accessToken;
      fitbit.refreshToken = refreshToken;
      fitbit.save(function (err) {
        if (err) {
          done(err, user);
        } else {
          user.fitbit = fitbit;
          user.save(function (err) {
            console.log('user saved with fitbit stream');
            done(err, user);
          });
        };
      });
    }));

    // add disconnect fitbit stream
};
