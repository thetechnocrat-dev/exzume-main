var User = require('../models/user');
var Insight = require('../models/insight');
var Fitbit = require('../models/dataStreams/fitbit');
var Survey = require('../models/dataStreams/survey.js');
var Feature = require('../models/feature.js');
var mongoose = require('mongoose');

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

  router.get('/insights', function (req, res) {
    Insight.find({ ownerId: req.user._id }, function (err, insights) {
      if (err) res.send(err);
      res.json(insights);
    });
  });

  router.route('/insights/:insightId')
    .get(function (req, res) {
      Insight.findOne({ _id: req.params.insightId }, function (err, insight) {
        if (err) res.send(err);
        if (insight) res.json(insight);
      });
    })
    .put(function (req, res) {
      Insight.findOne({ _id: req.params.insightId }, function (err, insight) {
        if (insight) {
          insight.message = req.body.message;
          insight.liked = req.body.liked;
          insight.save(function (err, insight) {
            if (err) res.send(err);
            if (insight) res.json(insight);
          });
        }
      });
    })
    .post(function (req, res) {
      var newInsight = new Insight();
      newInsight.message = req.body.message;
      newInsight.ownerId = mongoose.Types.ObjectId(req.body.ownerId);
      newInsight.save(function (err, newInsight) {
        if (err) res.send(err);
        res.json(newInsight);
      });
    })
    .delete(function (req, res) {
      Insight.remove({ _id: req.params.insightId }, function (err, insight) {
        if (err) res.send(err);
        if (insight) res.json(insight);
      });
    });

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

  router.get('/datastreams/:datastream', function (req) {
      var options = {};
      if (req.params.datastream == 'fitbit') {
        options = { scope: ['activity', 'heartrate', 'location',
                            'nutrition', 'profile', 'settings',
                            'sleep', 'social', 'weight'], };
      }

      passport.authenticate(req.params.datastream, options)(req);
    }
  );

  router.get('/datastreams/:datastream/callback', function (req) {
      passport.authenticate(req.params.datastream, {
        successRedirect: '/#/dashboard?=',
        failureRedirect: '/',
      })(req);
    }
  );

  router.get('/signout', function (req, res) {
    req.logout();
    res.json({ message: 'sign out success' });
  });

  router.put('/selectseries', function (req, res) {
    var lineData;
    var dateArr1 = [];
    var dataArr1 = [];
    // var dateArr2 = [];
    // var dataArr2 = [];
    var createValArray = function (arr1, arr2) {
      var valArray = [];
      var kvPair = {};
      for (var i = 0; i < arr1.length; i++) {
        kvPair = {};
        kvPair.x = arr1[i];
        kvPair.y = arr2[i];
        valArray.push(kvPair);
      }

      return valArray;
    };

    Survey.findOne({ owner: req.user.local.username, }, function (err, survey) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (survey == null) {
        res.status(401).send('survey responses for user not found');
      } else if (survey) {
        var features = survey.features;
        for (var i = 0; i < features.length; i++) {
          var f = features[i];
          if (f._id.toString() === req.body.id) {
            dateArr1 = f.data.map(function (el) {return parseInt(el); });
            dataArr1 = f.data.map(function (el) {return parseInt(el); });
            console.log(dataArr1);
          }

          // else if (features[f].name == req.body.f2) {
          //   console.log(features[f].name);
          //   dateArr2 = features[f].dates;
          //   dataArr2 = features[f].data;
          // }
        }

        var lineData = {
            name: 'series1',
            values: createValArray(dateArr1, dataArr1),
            strokeWidth: 3,
            strokeDashArray: '5,5',
          };

          console.log(lineData.values);

        res.json({ data: lineData });

        // var lineData = [
        //   {
        //     name: 'series1',
        //     values: createValArray(dateArr1, dataArr1),
        //     strokeWidth: 3,
        //     strokeDashArray: '5,5',
        //   },
        //   {
        //     name: 'series2',
        //     values: createValArray(dateArr2, dataArr2),
        //   },
        // ];
      }
    });
  });

  router.put('/addsurveyquestion', function (req, res) {
    Survey.findOne({ owner: req.body.owner }, function (err, survey) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (survey == null) {
        res.status(401).send('survey responses for user not found');
      } else if (survey) {
        var newFeature = {
          prompt: req.body.prompt,
          format: req.body.format,
          dates: [],
          data: [],
        };

        survey.features.push(newFeature);

        survey.save(function (err) {
          if (err) {res.send(err); }

          res.json({ feature: newFeature });
        });
      }
    });
  });

  router.get('/surveyquestions', function (req, res) {
    var owner = req.user.local.username;

    Survey.findOne({ owner: owner }, function (err, survey) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (survey == null) {
        res.status(401).send('survey responses for user not found');
      } else if (survey) {
        var surveyQuestions = survey.features.map(function (element) {
          var currentObj = {};
          currentObj.id = element._id;
          currentObj.prompt = element.prompt;
          currentObj.format = element.format;
          return currentObj;
        });

        res.json({ surveyQuestions: surveyQuestions });
      }
    });
  });

  router.put('/submitsurveyanswer', function (req, res) {
    console.log(req.body);
    var objectId = mongoose.Types.ObjectId(req.body.objectId);
    console.log('onjid', objectId);
    console.log('user', req.user.local.username);

    var conditions = { owner: req.user.local.username, 'features._id': objectId };
    var update = { $push:
      { 'features.$.data': req.body.answer, 'features.$.dates': req.body.date, },
    };
    var options = { multi: true };

    Survey.update(conditions, update, options,
      function (err, numAffected) {
        if (err) {
          res.status(500).json({ message: 'internal server error - try refreshing the page' });
        }

        console.log('numAff', numAffected);

        res.json({ message: 'survey feature push success' });
      });
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
