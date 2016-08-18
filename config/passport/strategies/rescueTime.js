var RescueTimeStrategy = require('passport-rescuetime').Strategy;
var config = require('../../config');

module.exports = function (passport) {
  console.log('constructor rescuetime');
  console.log(RescueTimeStrategy);
  passport.use(new RescueTimeStrategy({
    authorizationURL: 'https://www.rescuetime.com/oauth/authorize?client_id=2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a',
    clientID: config.rescueTime.clientID,
    clientSecret: config.rescueTime.clientSecret,
    callbackURL: config.rescueTime.callbackURL,
    tokenURL: 'https://www.rescuetime.com/oauth/authorize?client_id=2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a&redirect_uri=YOUR_CALLBACK_URL&response_type=code&scope=YOUR_SCOPES',
    scope: 'time_data',
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
