var OAuth2Strategy = require('passport-oauth2');
var config = require('../../config');

module.exports = function (passport) {
  passport.use(new OAuth2Strategy({
    authorizationURL: 'https://www.rescuetime.com/oauth/authorize?client_id=2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a&redirect_uri=YOUR_CALLBACK_URL&response_type=code&scope=YOUR_SCOPES',
    clientID: config.rescueTime.clientID,
    clientSecret: config.rescueTime.clientSecret,
    callbackURL: config.rescueTime.callbackURL,
    tokenURL: 'https://www.rescuetime.com/oauth/authorize?client_id=2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a&redirect_uri=YOUR_CALLBACK_URL&response_type=code&scope=YOUR_SCOPES',
    scope: 'time_data',
  },

  function (accessToken, refreshToken, profile, done) {
    console.log('rescuetime strat callback---------');
    console.log(accessToken);
    console.log(refreshToken);
    console.log(done);
    done(err, { user: 'howdy' });
  }));

};
