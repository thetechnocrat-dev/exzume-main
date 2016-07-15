var User = require('../models/user');
var Fitbit = require('../models/dataStreams/fitbit');
var Survey = require('../models/dataStreams/survey');

var axios = require('axios');
var moment = require('moment');
var child_process = require('child_process');

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

};
