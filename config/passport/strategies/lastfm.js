var LastFMStrategy = require('passport-lastfm');
var LastFM = require('../../../models/dataStreams/lastfm');
var config = require('../../config');

module.exports = function (passport) {
  passport.use(new LastFMStrategy({
    clientID: config.lastfm.clientID,
    clientSecret: config.lastfm.clientSecret,
    callbackURL: config.lastfm.callbackURL,
  }, function (req, sessionKey, done) {
    // Find/Update user's lastfm session
    var user = req.user;
    var lastfm = new LastFM();
    lastfm.ownerId = user._id;
    lastfm.username = sessionKey.username;
    lastfm.key = sessionKey.key;
    lastfm.save(function (err) {
      if (err) {
        done(err, user);
      } else {
        user.lastfm = lastfm;
        user.save(function (err) {
          console.log('user saved with lastfm stream');
          done(err, user);
        });
      };
    });
  }));

  // add disconnect lastfm stream
};
