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
    var user = req.user;
    user.datastreams.rescueTime.isConnected = true;
    user.save(function (err) {
      done(err, user);
    });
  }));

};

