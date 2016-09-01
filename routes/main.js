var User = require('../models/user');
var Feature = require('../models/feature');
var App = require('../models/app');
var mongoose = require('mongoose');
var email = require('../util/email');
var crypto = require('crypto');

module.exports = function (router, passport) {

  router.get('/', function (req, res) {
    res.render('main', { title: 'Exzume' });
  });

  router.get('/features', function (req, res) {
    Feature.find({}, function (err, features) {
      if (err) res.send(err);
      if (features) res.json(features);
    });
  });

  router.get('/apps', function (req, res) {
    App.find({}, function (err, apps) {
      if (err) res.send(err);
      if (apps) res.json(apps);
    });
  });

  router.post('/signin', function (req, res) {
    passport.authenticate('local-login', function (err, user, info) {
      if (err) {
        res.status(500).json({ message: 'internal server error - try refreshing the page' });
      } else if (user) {
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
        });

        res.json(user);
      } else {
        res.status(401).send(info.signinMessage);
      };
    })(req, res);
  }),

  router.post('/signup', function (req, res) {
    passport.authenticate('local-signup', function (err, user, info) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user) {
        req.login(user, function (err) {
          if (err) {
            return next(err);
          }
        });

        res.json(user);
      } else {
        res.status(401).send(info.errorMessage);
      }
    })(req, res);
  });

  router.get('/confirm/:username/:token', function (req, res) {
    User.findOne({ 'local.username': req.params.username }, function (err, user) {
      if (err) {
        res.status(404).send(err);
      } else if (user) {
        if (!user.local.confirmEmail.isConfirmed) {
          if (user.local.confirmEmail.token == req.params.token) {
            user.local.confirmEmail.isConfirmed = true;
          }

          user.save(function (err) {
            if (err) {
              res.status(500).send('internal server error');
            } else {
              res.json({ message: 'user saved successfully' });
            }
          });
        } else {
          res.json({ message: 'account already confirmed' });
        }
      }
    });
  });

  router.post('/forgot', function (req, res) {
    User.findOne({ 'local.email': req.body.email }, function (err, user) {
      if (err) {
        res.status(500).send(err);
      } else if (user) {
        email.send(
          req.body.email,
          'Reset exzume password',
          email.forgotMessage(user.local.username, user.local.passwordResetToken)
        );
        res.json({ message: 'Reset password email sent' });
      } else {
        res.status(404).send('Email does not exist');
      }
    });
  });

  router.post('/reset-password', function (req, res) {
    console.log(req.body);
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send(err);
      } else if (user && user.local.passwordResetToken == req.body.token) {
        user.local.password = user.generateHash(req.body.password);
        user.local.passwordResetToken = crypto.randomBytes(64).toString('hex');
        user.save(function (err) {
          if (err) {
            res.status(500).send(err);
          } else {
            res.json({ responseText: 'Password succesfully reset' });
          }
        });
      } else {
        res.status(404).send('This link is no longer valid');
      }
    });
  });

};

