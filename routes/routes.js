module.exports = function (router, passport) {

  router.get('/', function (req, res) {
    res.render('main', { title: 'Exzume' });
  });

  router.post('/api/signin',
    passport.authenticate('local-login'),
    function (req, res) {
      res.json({ message: 'kinda in business' });
    }
  );

  router.post('/api/signup',
    passport.authenticate('local-signup'),
    function (req, res) {
      res.json({ message: 'kinda in business' });
    }
  );

  router.get('/api/signout', function (req, res) {
    req.logout();
    res.json({ message: 'sign out success' });
  });

  router.get('/api/session', function (req, res) {
    res.json({ username: req.user.local.username });
  });
};
