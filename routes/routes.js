var User = require('../models/user');
var Fitbit = require('../models/dataStreams/fitbit');
var mongoose = require('mongoose');

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

  router.put('/api/starinsight', function (req, res) {
    var objectId = mongoose.Types.ObjectId(req.body.insightId);
    var conditions = { 'local.username': req.body.username, 'insights._id': objectId };
    var update = { $set: { 'insights.$.liked': req.body.isLiked } };
    var options = { multi: false };

    // db.foo.update({"array.value" : 22}, {"$set" : {"array.$.text" : "blah"}})
    User.update(conditions, update, options,
      function (err, numAffected) {
        if (err) {
          res.status(500).json({ message: 'internal server error - try refreshing the page' });
        }

        res.json({ message: 'insight star success' });
      }
    );
  });

  router.get('/api/signout', function (req, res) {
    req.logout();
    res.json({ message: 'sign out success' });
  });

  router.get('/api/session', function (req, res) {
    res.json(req.user);
  });

  router.post('/api/datastream/fitbit', function (req, res) {
    var fitbit = new Fitbit();
    fitbit.owner = req.body.username;
    fitbit.icon = 'circle thin';

    fitbit.save(function (err) {
      if (err, fitbit) {
        res.send(err);
      } else {
        var fitbitId = fitbit.id;
        console.log('fitbit data stream created');
      };
    });

    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user === null) {
        res.status(401).send('user not found');
      } else if (user) {
        user.dataStreams.push(res.fitbitId);

        user.save(function (err) {
          if (err) { res.send(err); }
          console.log('here');
          res.json({ message: 'user updated with new insight' });
        });
      }
    });
  });

  router.get('/api/fitbit', function (req, res) {
    var accessToken = req.query.code;

    // #/?= handles any extras things fitbit leaves on query string
    res.redirect('/#/?=' + accessToken);
  });

  router.put('/admin/api/addform', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user == null) {
        res.status(401).send('user not found');
      } else if (user) {
        user.formURL = req.body.link;

        user.save(function (err) {
          if (err) { res.send(err); }

          res.json({ message: 'user updated with new form url' });
        });
      }
    });
  });

  router.put('/admin/api/addinsight', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user === null) {
        res.status(401).send('user not found');
      } else if (user) {
        user.insights.push({
          message: req.body.message,
          liked: false,
        });

        user.save(function (err) {
          if (err) { res.send(err); }

          res.json({ message: 'user updated with new insight' });
        });
      }
    });
  });

  router.put('/admin/api/addvis', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user == null) {
        res.status(401).send('user not found');
      } else if (user) {
        user.vis.push({ url: req.body.link });

        user.save(function (err) {
          if (err) { res.send(err); }

          res.json({ message: 'user updated with new vis' });
        });
      }
    });
  });
};
