var User = require('../models/user');
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

  // router.put('/admin/api/addinsight', function (req, res) {
  //   User.findOne({ 'local.username': req.body.username }, function (err, user) {
  //     if (err) { res.send(err); }
  //
  //     user.insights.push({
  //       message: req.body.message,
  //       liked: false,
  //     });
  //
  //     user.save(function (err) {
  //       if (err) { res.send(err); }
  //
  //       res.json({ message: 'user updated with new insight' });
  //     });
  //   });
  // });

  // {'local.username': 'Watts42', 'insights._id': ObjectId("575d152831ea218e0882bc73")}, {'insights.$': 1})

  router.put('/api/starinsight', function (req, res) {
    // console.log('routes starinsight', req.body);
    // var objectId = mongoose.Types.ObjectId(req.body.insightId);
    //
    // // db.foo.update({"array.value" : 22}, {"$set" : {"array.$.text" : "blah"}})
    // User.update({
    //   'local.username': req.body.username, 'insights._id': objectId, },
    //   { '$set': { insights.$.liked: true }
    // });

    // { username: 'Watts42', insightId: '575d136331ea218e0882bc58' }
    // User.findOne({ 'local.username': req.body.username, 'insights._id': objectId },
    //   { 'insights.$': 1 },
    //   function (err, user) {
    //     if (err) { console.log(err); }
    //
    //     user.insights[0].liked = !user.insights[0].liked;
    //
    //     user.update(function (err) {
    //       if (err) {console.log(err); }
    //     });
    //
    //     console.log(user);
    //   });
  });

  router.get('/api/signout', function (req, res) {
    req.logout();
    res.json({ message: 'sign out success' });
  });

  router.get('/api/session', function (req, res) {
    res.json(req.user);
  });

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
