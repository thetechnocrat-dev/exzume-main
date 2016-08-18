var RescueTimeStrategy = require('passport-rescuetime').Strategy;
var config = require('../../config');

module.exports = function (passport) {
  console.log('constructor rescuetime');
  console.log(RescueTimeStrategy);
  passport.use(new RescueTimeStrategy({
    clientID: config.rescueTime.clientID,
    clientSecret: config.rescueTime.clientSecret,
    callbackURL: config.rescueTime.callbackURL,
    scope: ['time_data', 'category_data', 'productivity_data'],
    passReqToCallback: true,
  },

  function (req, accessToken, refreshToken, profile, done) {
    console.log('rescue time strat verrify cb');
    console.log(accessToken);
    console.log(refreshToken);
    console.log(done);
    var user = req.user;
    user.datastreams.rescueTime.isConnected = true;
    user.save(function (err) {
      console.log('user saved with fitbit stream');
      done(err, user);
    });
  }));

};
