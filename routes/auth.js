var User = require('../models/user');
var Feature = require('../models/feature');
var mongoose = require('mongoose');
var dataStreamAPIs = require('../controllers/dataStreamAPIs/dataStreamAPIs');
var moment = require('moment');
var async = require('async');
var axios = require('axios');

module.exports = function (router, passport) {
  // makes sure a user is logged in
  router.use(function (req, res, next) {
      // if user is authenticated in the session, call the next() to call the
      // next request handler; Passport adds this method to request object.
      if (req.isAuthenticated()) {
        return next();
      } else {
        res.redirect('/');
      }
    }
  );

  router.get('/session', function (req, res) {
    res.json(req.user);
  });

  router.route('/zumes/:zumeId')
    .post(function (req, res) {
      req.user.zumes.push(req.body);
      req.user.save(function (err, user) {
        if (err) {
          res.send(err);
        } else if (user) {
          res.json(user);
        }
      });
    });

  // only used for survey dataStream
  router.route('/userfeatures/:datastream/:feature')
    .post(function (req, res) {
      // prevents double adding of user survey feature
      var userSurveyFeatures = req.user.datastreams.survey.features;
      for (var i = 0; i < userSurveyFeatures.length; i++) {
        if (userSurveyFeatures[i].name == req.params.feature) {
          res.status(409).send('user already has ' +  req.params.feature + ' survey feature');
          return;
        }
      }

      Feature.findOne({ name: req.params.feature }, function (err, feature) {
        if (err) {
          res.send(err);
        } else if (feature) {
          var userFeature = {
            name: feature.name,
            prompt: feature.options.prompt,
            format: feature.options.format,
          };
          req.user.datastreams.survey.features.push(userFeature);
          req.user.save(function (err, user) {
            if (err) {
              res.send(err);
            } else if (user) {
              feature.users.push(req.user._id);
              feature.save();
              res.json(user);
            }
          });
        }
      });
    })
    .put(function (req, res) {
      var userFeatures = req.user.datastreams[req.params.datastream].features;
      var userFeature;
      for (var i = 0; i < userFeatures.length; i++) {
        if (userFeatures[i].name == req.params.feature) {
          userFeature = userFeatures[i];
        }
      }

      userFeature.data.push({
        dateTime: moment().format('YYYY-MM-DD'),
        value: parseInt(req.body.data),
      });

      req.user.save(function (err, user) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.json(user);
        }
      });
    });

  router.route('/features/:featureId')
    .put(function (req, res) {
      Feature.findOne({ _id: req.params.featureId }, function (err, feature) {
        if (feature) {
          feature.users.push(req.user._id);
          feature.save(function (err, feature) {
            if (err) res.send(err);
            if (feature) res.json(feature);
          });
        }
      });
    });

  router.get('/datastreams/:datastream', function (req, res, next) {
      console.log('auth connect ' + req.params.datastream);
      dataStreamAPIs[req.params.datastream].connect(passport)(req, res, next);
    }
  );

  router.get('/datastreams/rescuetime/callback', function (req, res, next) {
    console.log(req.query);
    axios({
      method: 'POST',
      url: 'https://www.rescuetime.com/oauth/token',
      data: {
        client_id: '2900e583f575ac611f1ffd83827ee0995f5b462f159fe42288f12e847e6b430a',
        client_secret: '6a6eb52e35380c8af6e658f54496a8d6f4c769e0b0e58cebb0556942f9d6ec60',
        grant_type: 'authorization_code',
        code: req.query.code,
        redirect_uri: 'https://www.exzume.com/auth/datastreams/rescuetime/callback',
      },
    }).then(function (authRes) {
      console.log('made it to rescueTime auth res');
      console.log(authRes);
      console.log(authRes.data.accessToken);
      req.user.datastreams.rescueTime.isConnected = true;
      req.user.datastreams.rescueTime.accessToken = authRes.data.accessToken;
      req.user.save(function (err) {
        if (err) {
          res.send(err);
        } else {
          res.redirect('/auth/datastreams/rescuetime/grab');
        }
      });
    }).catch(function (err) {
      res.send(err);
    });
  });

  router.get('/datastreams/:datastream/callback', function (req, res, next) {
      console.log(req.params);
      console.log(next);
      console.log(req.params.datastream + ' callback route');
      passport.authenticate(req.params.datastream, {
        successRedirect: '/auth/datastreams/' + req.params.datastream + '/grab?isInitialSync=true',
        failureRedirect: '/',
      })(req, res, next);
    }
  );

  router.get('/datastreams/:datastream/grab', function (req, res) {
      var user = req.user;
      var isInitialSync = req.query.isInitialSync;
      var endSync = function (error, updatedUser, shouldRedirect) {
        console.log('sync is done');
        if (error) {
          res.send(error);
        } else if (updatedUser) {
          if (isInitialSync) {
            res.redirect('/#/dashboard?=');
          } else {
            res.json(updatedUser);
          }
        } else if (shouldRedirect) {
          res.redirect('/auth/datastreams/' + req.params.datastream);
        }
      };

      dataStreamAPIs[req.params.datastream].sync(user, endSync);
    }
  );

  router.get('/signout', function (req, res) {
    req.logout();
    res.json({ message: 'sign out success' });
  });

  router.get('/*', function (req, res) {
    res.redirect('/');
  });
};
