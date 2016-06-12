var User = require('../models/user');

module.exports = function (router, passport) {

  router.get('/', function (req, res) {
    res.render('main', { title: 'Exzume' });
  });

  router.post('/api/signin',
    passport.authenticate('local-login'),
    function (req, res) {
      res.json({ message: 'sign in success' });
    }
  );

  router.post('/api/signup',
    passport.authenticate('local-signup'),
    function (req, res) {
      res.json({ message: 'sign up success' });
    }
  );

  router.get('/api/signout', function (req, res) {
    req.logout();
    res.json({ message: 'sign out success' });
  });

  router.get('/api/session', function (req, res) {
    res.json({ username: req.user.local.username });
  });

  router.put('/api/:username', function (req, res) {
    console.log('api put request');
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      console.log('find one', user);
      if (err) { res.send(err); }

      user.formURL = req.body.link;

      user.save(function (err) {
        if (err) { res.send(err); }

        res.json({ message: 'user updated' });
      });
    });
  });
};
