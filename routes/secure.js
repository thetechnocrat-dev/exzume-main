var User = require('../models/user');
var config = require('../config/config');

module.exports = function (router, passport) {
  // make sure user is signed in
  router.use(function (req, res, next) {
    // call next request handler if signed in - passport adds this method to req
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  });

  // all param callbacks are called before any handler of any route in which the
  // param occurs, and they will be called only once in a req-resp cycle
  router.param('username', function (req, res, next, username) {
    User.findOne({ 'local.username': username }, function (err, user) {
      if (err) {
        return next(err);
      } else if (user) {
        req.user = user;
        return next(err);
      } else {
        console.log('failed to load user');
        res.end();
      }
    });
  });

  router.get('/', function (req, res) {
    res.render('secure', { title: 'Exzume - secure', user: req.user });
  });

  // redirects all invalid paths to the profile
  router.get('/*', function (req, res) {
    console.log('redirect by secure router');
    res.redirect('/secure');
  });
};
