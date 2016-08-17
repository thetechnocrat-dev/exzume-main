var RescueTimeStrategy = require('passport-rescuetime').Strategy;
var config = require('../../config');

module.exports = function (passport) {
  passport.use(new RescueTimeStrategy({
    clientID: config.rescueTime.clientID,
    clientSecret: config.rescueTime.clientSecret,
    callbackURL: config.rescueTime.callbackURL,
    scope: ['time_data', 'category_data', 'productivity_data'],
    passReqToCallback: true,
  },
  function (req, accessToken, refreshToken, profile, done) {
    console.log('rescuetime strat callback');
    console.log(accessToken);
    console.log(refreshToken);
    console.log(done);
    var user = req.user;
    user.datastreams.rescueTime.accessToken = accessToken;
    user.datastreams.rescueTime.refreshToken = refreshToken;
    user.datastreams.rescueTime.isConnected = true;
    user.save(function (err) {
      console.log('rescuetime user save callback');
      console.log(err);
      done(err, user);
    });
  }));

};
