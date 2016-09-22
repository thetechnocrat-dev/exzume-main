var StravaStrategy = require('passport-strava').Strategy;
var config = require('../../config');

module.exports = function (passport) {
  passport.use(new StravaStrategy({
      clientID: config.strava.clientID,
      clientSecret: config.strava.clientSecret,
      callbackURL: config.strava.callbackURL,
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      var user = req.user;
      user.datastreams.strava.profileId = profile.id;
      user.datastreams.strava.accessToken = accessToken;
      user.datastreams.strava.isConnected = true;
      console.log(profile);
      console.log(accessToken);
      user.save(function (err) {
        console.log('user saved with strava stream');
        done(err, user);
      });
    }
  ));

};
