var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
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
      user.datastreams.fitbit.ownerId = user._id;
      user.datastreams.fitbit.profileId = profile.id;
      user.datastreams.fitbit.accessToken = accessToken;
      user.datastreams.fitbit.refreshToken = refreshToken;
      user.save(function (err) {
        console.log('user saved with fit stream');
        done(err, user);
      });
    }));

    // add disconnect fitbit stream
};
