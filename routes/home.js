module.exports = function (router, passport, db) {
  router.get('/', function (req, res) {
    res.render('home', { title: 'Exzume' });
  });

  router.get('/signin', function (req, res) {
    res.render('signin', { message: req.flash(signinMessage), user: req.user });
    console.log(req.flash('signinMessage'));
  });

  router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
  }));

  router.get('/register', function (req, res) {
    res.render('register', { message: req.flash('signupMessage'), user: req.user });
    console.log(req.flash('signupMessage'));
  });

  router.post('/register', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash: true,
  }));

  router.get('/signout', function (req, res) {
    req.signout();
    res.redirect('/');
  });
};
