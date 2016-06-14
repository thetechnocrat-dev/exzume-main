var User = require('../models/user');

module.exports = function (router, passport) {

  router.get('/', function (req, res) {
    res.render('main', { title: 'Exzume' });
  });

  router.post('/api/signin', function (req, res) {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) {
        res.status(500).json({ message: 'internal server error - try refreshing the page' });
      } else if (user) {
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
        });

        res.json({ message: 'sign in success' });
      } else {
        res.status(401).send(info.signinMessage);
      };
    })(req, res);
  }),

  router.post('/api/signup', function (req, res) {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) {
        console.log('route - sign up error');
        res.status(500).json({ message: 'internal server error - try refreshing the page' });
      } else if (user) {
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
        });

        res.json({ message: 'sign up success' });
      } else {
        res.status(401).send(info.errorMessage);
      }
    })(req, res);
  });

  // router.post('/api/signup',
  //   passport.authenticate('local-signup'),
  //   function (req, res) {
  //     res.json({ message: 'sign up success' });
  //   }
  // );

  router.get('/api/signout', function (req, res) {
    req.logout();
    res.json({ message: 'sign out success' });
  });

  router.get('/api/session', function (req, res) {
    res.json(req.user);
  });

  // router.get('/api/session/insights', function (req, res) {
  //   if (typeof req.users.insights === 'undefined') {
  //     res.send({ error: 'no user in session' });
  //   }
  //
  //   res.json({ user: req.user.insights });
  // });

  router.put('/admin/api/addform', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) { res.send(err); }

      user.formURL = req.body.link;

      user.save(function (err) {
        if (err) { res.send(err); }

        res.json({ message: 'user updated with new formURL' });
      });
    });
  });

  router.put('/admin/api/addinsight', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) { res.send(err); }

      user.insights.push({
        message: req.body.message,
        liked: false,
      });

      user.save(function (err) {
        if (err) { res.send(err); }

        res.json({ message: 'user updated with new insight' });
      });
    });
  });
};
