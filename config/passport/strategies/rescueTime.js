var RescueTimeStrategy = require('passport-rescuetime').Strategy;
var config = require('../../config');

module.exports = function (passport) {
  console.log('RescueTime Constructor');
  passport.use(new RescueTimeStrategy({
    clientID: config.rescueTime.clientID,
    clientSecret: config.rescueTime.clientSecret,
    callbackURL: config.rescueTime.callbackURL,
  },

  function (accessToken, refreshToken, profile, done) {
    console.log('rescuetime strat callback---------');
    console.log(accessToken);
    console.log(refreshToken);
    console.log(done);
    done(err, { user: 'howdy' });
  }));

};
