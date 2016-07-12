var User = require('../models/user');
var Fitbit = require('../models/dataStreams/fitbit');
var mongoose = require('mongoose');
var passport = require('passport');
var Survey = require('../models/dataStreams/survey');

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

  router.put('/starinsight', function (req, res) {
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

  router.get('/session', function (req, res) {
    res.json(req.user);
  });

  router.get('/fitbit',
    passport.authenticate('fitbit', { scope: ['activity', 'heartrate', 'location',
                                              'nutrition', 'profile', 'settings',
                                              'sleep', 'social', 'weight'] })
  );

  router.get('/fitbit/callback', passport.authenticate('fitbit', {
        successRedirect: '/#/dashboard?=',
        failureRedirect: '/',
  }));

  router.get('/signout', function (req, res) {
    req.logout();
    res.json({ message: 'sign out success' });
  });

  router.get('/selectseries', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user, survey) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user == null) {
        res.status(401).send('user not found');
      } else if (user) {
        var dateArr1 = [];
        var dataArr1 = [];
        var dateArr2 = []
        var dataArr2 = [];

          Survey.findOne({ owner: req.body.username, }, 'features', function (err, survey) {
            if (err) {
              res.status(500).send('internal server error - try refreshing the page');
            } else if (survey == null) {
              res.status(401).send('survey responses for user not found');
            } else if (survey) {
              for (f in features) {
                if (features[f].name == req.body.f1) {
                  console.log(features[f].name);
                  dateArr1 = features[f].dates;
                  dataArr1 = features[f].data;
                } else if (features[f].name == req.body.f2) {
                  console.log(features[f].name);
                  dateArr2 = features[f].dates;
                  dataArr2 = features[f].data;
                }
              }
            }
          });

          var createValArray = function(arr1, arr2) {
            var valArray = [];
            var kvPair = {};
            for (var i = 0; i < arr1.length; i++) {
                kvPair = {};
                kvPair.x = arr1[i];
                kvPair.y = arr2[i];
                valArray.push(kvPair);
            }
            return valArray;
          }

          var lineData = [
            {
              name: 'series1',
              values: createValueArray(dateArr1, dataArr1),
              strokeWidth: 3,
              strokeDashArray: '5,5',
            },
            {
              name: 'series2',
              values : createValueArray(dateArr2, dataArr2),
            }
          ];

          res.json({ lineData: lineData });
      }
    });
  });

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


  router.put('/addsurveyquestion', function (req, res) {
    console.log(req.body);
    Survey.findOne({ 'owner': req.body.owner }, function (err, survey) {
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
          currentObj.prompt = element.prompt;
          currentObj.format = element.format;
          return currentObj;
        });

        res.json({ surveyQuestions: surveyQuestions });
      }
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
