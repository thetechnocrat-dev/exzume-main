var User = require('../models/user');
var Feature = require('../models/feature');
var config = require('../config/config');
var mongoose = require('mongoose');
var axios = require('axios');
var moment = require('moment');
var async = require('async');
var apiURLs = require('./resources/apiURLs');

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

  // router.get('/insights', function (req, res) {
  //   Insight.find({ ownerId: req.user._id }, function (err, insights) {
  //     if (err) res.send(err);
  //     res.json(insights);
  //   });
  // });
  //
  // router.route('/insights/:insightId')
  //   .get(function (req, res) {
  //     Insight.findOne({ _id: req.params.insightId }, function (err, insight) {
  //       if (err) res.send(err);
  //       if (insight) res.json(insight);
  //     });
  //   })
  //   .put(function (req, res) {
  //     Insight.findOne({ _id: req.params.insightId }, function (err, insight) {
  //       if (insight) {
  //         insight.message = req.body.message;
  //         insight.liked = req.body.liked;
  //         insight.save(function (err, insight) {
  //           if (err) res.send(err);
  //           if (insight) res.json(insight);
  //         });
  //       }
  //     });
  //   })
  //   .post(function (req, res) {
  //     var newInsight = new Insight();
  //     newInsight.message = req.body.message;
  //     newInsight.ownerId = mongoose.Types.ObjectId(req.body.ownerId);
  //     newInsight.save(function (err, newInsight) {
  //       if (err) res.send(err);
  //       res.json(newInsight);
  //     });
  //   })
  //   .delete(function (req, res) {
  //     Insight.remove({ _id: req.params.insightId }, function (err, insight) {
  //       if (err) res.send(err);
  //       if (insight) res.json(insight);
  //     });
  //   });

  router.route('/zumes/:zumeId')
    .post(function (req, res) {
      req.user.zumes.push(req.body);
      req.user.save(function (err, user) {
        if (err) {
          res.send(err);
        } else if (user) {
          res.json(user);
        }
      }
    );
  });

  router.route('/userfeatures/:datastream/:feature')
    .post(function (req, res) {
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

      userFeature.data.push(parseInt(req.body.data));
      userFeature.dates.push((new Date()).toJSON());
      req.user.save(function (err, user) {
        if (err) {
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

  router.get('/datastreams/:datastream', function (req, res) {
      var options = {};
      if (req.params.datastream == 'fitbit') {
        options = { scope: ['activity', 'heartrate', 'location',
                            'nutrition', 'profile', 'settings',
                            'sleep', 'social', 'weight'], };
      }

      passport.authenticate(req.params.datastream, options)(req, res);
    }
  );

  router.get('/datastreams/:datastream/callback', function (req, res) {
      passport.authenticate(req.params.datastream, {
        successRedirect: '/#/dashboard?=', // redirect to grab from API and redirect
        failureRedirect: '/',
      })(req, res);
    }
  );

  router.get('/datastreams/:datastream/grab', function (req, res) {
      var user = req.user;
      var currentStreamName = req.params.datastream;
      var currentStream = user.datastreams[currentStreamName];

      // function to add user to feature users array
      var addUserToFeature = function (featureName, callback) {
        Feature.findOne({ name: featureName }, function (err, feature) {
          if (err) res.send(err);
          if (feature) {
            if (feature.users.includes(user.local.username)) {
              console.log('user already included in feature users array');
              callback(null, feature);
            } else {
              feature.users.push(user.local.username);
              feature.save(function (err, feature) {
                if (err) console.log('problem saving feature: ', err);
                if (feature) console.log('this feature was saved: ', feature);
                callback(null, feature);
              });
            }
          };
        });
      };

      // function to initialize user features array with given feature name
      var initUserFeatureArr = function (featureName, callback) {
        // flag to check if user features array already has name with featureName
        var featureExists = false;
        for (feature in currentStream.features) {
          if (currentStream.features[feature].name == featureName) featureExists = true;
        }

        if (featureExists) {
          console.log('user datastreams feature array already contains feature');
          callback(null, user);
        } else {
          currentStream.features.push({ name: featureName });
          user.save(function (err, user) {
            if (err) console.log('problem saving user: ', err);
            if (user) console.log('user was saved: ', user);
            callback(null, user);
          });
        }
      };

      // function to add current data as object to user.datastream.features array
      var addDataToUser = function (featureName, newData, callback) {
        // find proper feature index within users datastream object
        var thisFeatureIndex;
        for (var i = 0; i < currentStream.features.length; i++) {
          if (currentStream.features[i].name == featureName) {
            thisFeatureIndex = i;
          }
        };

        var thisFeature = currentStream.features[thisFeatureIndex];
        console.log(JSON.stringify(newData));
        for (var i = 0; i < newData.length; i++) {
          thisFeature.data.push(newData[i]);
        };

        user.save(function (err, user) {
          if (err) console.log('problem saving user: ', err);
          if (user) console.log('user was saved: ', user);
          callback(null, user);
        });
      };

      // get fitbit data
      if (currentStreamName == 'fitbit') {
        // var date = moment().format('YYYY-MM-DD');
        var fitbit = currentStream;

        axios({
          method: 'GET',
          url: 'https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json',
          headers: { 'Authorization': 'Bearer ' + fitbit.accessToken },
        }).then(function (response) {
          console.log('made it to response');

          // res.json(response.data['activities-steps']);
          // console.log(response.data.summary.steps);
          async.series({
            one: function (callback) {
              addUserToFeature('steps', callback);
            },

            two: function (callback) {
              initUserFeatureArr('steps', callback);
            },

            three: function (callback) {
              addDataToUser('steps', response.data['activities-steps'], callback);
            },
          }, function (err, results) {
            if (err) res.send(err);
            else {
              console.log(results);
              res.redirect('/#/dashboard?=');
            }
          });
        }).catch(function (error) {
          if (error.status == 401) {
            console.log('access token expired, refresh that shit');
            console.log('redirecting user to the authentication flow...');
            res.redirect('/auth/datastreams/fitbit');
          }

          console.log(error.data.errors);
        });
      }
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
