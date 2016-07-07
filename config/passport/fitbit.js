var passport = require('passport');
var FitbitStrategy = require('passport-fitbit-oauth2').FitbitOAuth2Strategy;
var User = require('../../models/user');

module.exports = function (passport) {
  passport.use(new FitbitStrategy({
      clientID:     '227TQM',
      clientSecret: 'd44c4411eec72933ccd86d7efe8ea12d',
      callbackURL: '/auth/fitbit/callback/',
      passReqToCallback : true
    },
    function (req, accessToken, refreshToken, profile, done) {
      // process.nextTick(function () {
        console.log('hi josh');
        console.log(req.user);
        console.log(accessToken);
        done(err, req.user);
        //   User.findOne({ fitbitId: profile.id }, function (err, req, user) {
        //     console.log('hi alan');
        //       console.log('error', err);
        //       console.log('user', req.user);
        //       // console.log(req.user);
        //
        //     // if (err) console.log(err);
        //     // if (user) console.log('this is user object ' + user );
        //     return done(err, user);
        //   });
      // })
    }
  ));
};
