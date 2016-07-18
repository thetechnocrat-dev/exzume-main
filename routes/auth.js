var User = require('../models/user');
var Feature = require('../models/feature');
var config = require('../config/config');
var mongoose = require('mongoose');
var axios = require('axios');
var moment = require('moment');

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

  router.get('/features', function (req, res) {
    Feature.find({ owner: req.user._id }, function (err, features) {
      if (err) res.send(err);
      res.json(features);
    });
  });

  router.route('/features/:featureId')
    .get(function (req, res) {
      Feature.findOne({ _id: req.params.featureId }, function (err, feature) {
        if (err) res.send(err);
        if (feature) res.json(feature);
      });
    })
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
      var date = moment().format('YYYY-MM-DD');
      var fitbit = req.user.datastreams.fitbit;
      var refreshToken = function (fitbit) {
        axios({
          method: 'POST',
          url: 'https://api.fitbit.com/oauth2/token',
          headers: {
            'Authorization': 'Basic ' + new Buffer(config.fitbit.clientID + ':' + config.fitbit.clientSecret).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          params: {
            'grant_type': 'refresh_token',
            'refresh_token': fitbit.refreshToken,
          },
        }).then(function (res) {
          console.log('redirecting user to the authentication flow...');
          res.redirect('/datastreams/:datastream');
        }).catch(function (error) {
          console.log(error);
          console.log(error.data.errors);
        });
      };

      axios({
        method: 'GET',
        url: 'https://api.fitbit.com/1/user/-/activities/date/' + date + '.json',
        headers: { 'Authorization': 'Bearer ' + fitbit.accessToken },
      }).then(function (response) {
          console.log('made it to response');
          res.json(response.data);
        }).catch(function (error) {
          if (error.status == 401) {
            console.log('access token expired, refresh that shit');
            refreshToken(fitbit);
          }

          console.log(error.data.errors);
        });
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

// user.vis.push({ url: req.body.link });
// seed database
// var survey = new Survey({
//   "owner": "a",
//   "icon": "",
//   "features": [
//     { "name": "Sleep Hours",
//       "dates": ["2016-06-16 21:58:31.843Z",
//                 "2016-06-17 21:58:31.843Z",
//                 "2016-06-18 21:58:31.843Z",
//                 "2016-06-19 21:58:31.843Z",
//                 "2016-06-20 21:58:31.843Z",
//                 "2016-06-21 21:58:31.843Z",
//                ],
//       "data": [6, 7, 8, 7, 7.5, 9],
//     },
//     { "name": "Productivity",
//       "dates": ["2016-06-16 21:58:31.843Z",
//                 "2016-06-17 21:58:31.843Z",
//                 "2016-06-18 21:58:31.843Z",
//                 "2016-06-19 21:58:31.843Z",
//                 "2016-06-20 21:58:31.843Z",
//                 "2016-06-21 21:58:31.843Z",
//                ],
//       "data": [3, 3, 4, 5, 7, 5],
//     }
//   ]
// });
//
// survey.save(function(err) {
//   if (err) throw err;
//   console.log('survey successfully saved');
// });

// if (survey.features[0].name === req.body.xVar &&
            //     survey.features[1].name === req.body.yVar) {
            //       // spawn data analysis child process if import succeeds
            //   var spawn = child_process.spawn;
            //   var py = spawn('python', ['./crunch.py']);
            //   dataString = '';
            //   data = survey.features[0].data;
            //   // data2 = survey.features[1].data;
            //   console.log(JSON.stringify(data));
            //   // console.log(JSON.stringify(data2));
            //   py.stdin.write(JSON.stringify(data));
            //   // py.stdin.write(JSON.stringify(data2));
            //   py.stdin.end();
            //   py.stdout.on('data', function(data){
            //     dataString += data.toString();
            //   });
            //   py.stdout.on('end', function(){
            //     console.log('Sum of numbers = ', dataString);
            //   });
              //
              // user.vis.push?(function (err) {
              //   if (err) { res.send(err); }
              //
                // res.json({ message: 'correlation successfully made' });
              // });
