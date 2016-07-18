var LastFMStrategy = require('passport-lastfm');
var config = require('../../config');

module.exports = function (passport) {
  passport.use(new LastFMStrategy({
    clientID: config.lastfm.clientID,
    clientSecret: config.lastfm.clientSecret,
    callbackURL: config.lastfm.callbackURL,
  }, function (req, sessionKey, done) {
    // Find/Update user's lastfm session
    var user = req.user;
    user.datastreams.lastfm.ownerId = user._id;
    user.datastreams.lastfm.username = sessionKey.username;
    user.datastreams.lastfm.key = sessionKey.key;
    user.datastreams.lastfm.isConnected = true;
    user.save(function (err) {
      console.log('user saved with lastfm stream');
      done(err, user);
    });
  }));

  // add disconnect lastfm stream
};
