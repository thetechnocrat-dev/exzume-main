var LastFMStrategy = require('passport-lastfm');
// var Fitbit = require('../../../models/dataStreams/lastfm');

module.exports = function (passport) {
  // passport.use(new LastFMStrategy({
  //   'api_key': process.env.LASTFM_KEY,
  //   'secret': process.env.LASTFM_SECRET,
  //   'callbackURL': cb_url + '/auth/lastfm/callback'
  // }, function(req, sessionKey, done) {
  //   // Find/Update user's lastfm session
  //
  //   // If user logged in
  //   if (req.user) {
  //     User.findById(req.user.id, (err, user) => {
  //       if (err) return done(err);
  //
  //       var creds = _.find(req.user.tokens, {type:'lastfm'});
  //       // if creds already present
  //       if (user.lastfm && creds){
  //         req.flash('info', {msg:'Account already linked'});
  //         return done(err, user, {msg:'Account already linked'})
  //       }
  //
  //       else {
  //         user.tokens.push({type:'lastfm', username:sessionKey.username, key:sessionKey.key });
  //         user.lastfm = sessionKey.key;
  //
  //         user.save(function(err){
  //           if (err) return done(err);
  //           req.flash('success', {msg:"Last.fm authentication success"});
  //           return done(err, user, sessionKey);
  //         });
  //       }
  //     });
  //   }
  //   else{
  //     return done(null, false, {message:'Must be logged in'});
  //   }
  // }));


  // passport.use(new FitbitStrategy({
  //     clientID:     '227TQM',
  //     clientSecret: 'd44c4411eec72933ccd86d7efe8ea12d',
  //     callbackURL: '/auth/fitbit/callback/',
  //     passReqToCallback: true,
  //   },
  //   function (req, accessToken, refreshToken, profile, done) {
  //     var user = req.user;
  //     var fitbit = new Fitbit();
  //     fitbit.owner = user.local.username;
  //     fitbit.profileId = profile.id;
  //     fitbit.accessToken = accessToken;
  //     fitbit.refreshToken = refreshToken;
  //     fitbit.save(function (err) {
  //       if (err) {
  //         done(err, user);
  //       } else {
  //         user.dataStreams.push(fitbit.id);
  //         user.save(function (err) {
  //           console.log('here');
  //           done(err, user);
  //         });
  //       };
  //     });
  //   }));
};
