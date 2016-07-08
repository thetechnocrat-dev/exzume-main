var User = require('../models/user');
var Fitbit = require('../models/dataStreams/fitbit');
var axios = require('axios');
var moment = require('moment');
var mongoose = require('mongoose');
var child_process = require('child_process');
var Survey = require('../models/dataStreams/survey');

module.exports = function (router, passport) {

  router.put('/addform', function (req, res) {
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

  router.put('/addinsight', function (req, res) {
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

  router.put('/addvis', function (req, res) {
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

  router.put('/addfitbitdata', function (req, res) {
    console.log('made it too addfitbitdata');
    console.log(req.body);
    Fitbit.findOne({ 'owner': req.body.username }, function (err, fitbit) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (fitbit == null) {
        res.status(401).send('fitbit datastream not found');
      } else if (fitbit) {
        var date = moment().format('YYYY-MM-DD');
        console.log(date);
        console.log(fitbit.profileId);
        console.log(fitbit);
        axios.get('https://api.fitbit.com/1/user/' + fitbit.profileId + '/activities/date/' + date + '.json').then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

      }
    });

  });

  router.put('/addcorr', function (req, res) {
    User.findOne({ 'local.username': req.body.username }, function (err, user, survey) {
      if (err) {
        res.status(500).send('internal server error - try refreshing the page');
      } else if (user == null) {
        res.status(401).send('user not found');
      } else if (user) {
        // user.vis.push({ url: req.body.link });
        // seed database
          var survey = new Survey({
            "owner": "a",
            "icon": "",
            "features": [
              { "name": "Sleep Hours",
                "dates": ["2016-06-16 21:58:31.843Z",
                          "2016-06-17 21:58:31.843Z",
                          "2016-06-18 21:58:31.843Z",
                          "2016-06-19 21:58:31.843Z",
                          "2016-06-20 21:58:31.843Z",
                          "2016-06-21 21:58:31.843Z",
                         ],
                "data": [6, 7, 8, 7, 7.5, 9],
              },
              { "name": "Productivity",
                "dates": ["2016-06-16 21:58:31.843Z",
                          "2016-06-17 21:58:31.843Z",
                          "2016-06-18 21:58:31.843Z",
                          "2016-06-19 21:58:31.843Z",
                          "2016-06-20 21:58:31.843Z",
                          "2016-06-21 21:58:31.843Z",
                         ],
                "data": [3, 3, 4, 5, 7, 5],
              }
            ]
          });

          survey.save(function(err) {
            if (err) throw err;

            console.log('survey successfully saved');
          });

          Survey.findOne({ owner: req.body.username }, function(err, survey) {
            if (err) {
              res.status(500).send('internal server error - try refreshing the page');
            } else if (survey == null) {
              res.status(401).send('survey responses for user not found');
            } else if (survey) {
              if (survey.features[0].name === req.body.xVar &&
                  survey.features[1].name === req.body.yVar) {
                    // spawn data analysis child process if import succeeds
                var spawn = child_process.spawn;
                var py = spawn('python', ['./crunch.py']);
                dataString = '';
                data = survey.features[0].data;
                // data2 = survey.features[1].data;
                console.log(JSON.stringify(data));
                // console.log(JSON.stringify(data2));
                py.stdin.write(JSON.stringify(data));
                // py.stdin.write(JSON.stringify(data2));
                py.stdin.end();
                py.stdout.on('data', function(data){
                  dataString += data.toString();
                });
                py.stdout.on('end', function(){
                  console.log('Sum of numbers = ', dataString);
                });


                //
                // user.vis.push?(function (err) {
                //   if (err) { res.send(err); }
                //
                  // res.json({ message: 'correlation successfully made' });
                // });
              }
            }
          });
      }
    });
  });

};
