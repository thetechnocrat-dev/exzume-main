var util = require('./util');
var axios = require('axios');
var async = require('async');

var fitbitAPI = {
  connect: function (passport) {
    var options = {
      scope: [
        'activity', 'heartrate', 'location', 'nutrition', 'profile', 'settings', 'sleep',
        'social', 'weight',
      ],
    };

    return passport.authenticate('fitbit', options);
  },

  sync: function (res, user) {
    var currentStream = user.datastreams.fitbit;

    // hardcoded because only one feaute per API stream currently
    var startDate = util.findStartDate(currentStream.features[0].data);
    axios({
      method: 'GET',
      url: 'https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json',
      headers: { Authorization: 'Bearer ' + currentStream.accessToken },
    }).then(function (response) {

      async.series({
        one: function (callback) {
          util.addUserToFeature(user.local.username, 'Steps', callback);
        },

        two: function (callback) {
          util.initUserFeatureArr(user, 'Steps', 'fitbit', callback);
        },

        three: function (callback) {
          util.addDataToUser(user, 'Steps', 'fitbit',  response.data['activities-steps'], callback);
        },
      }, function (err, results) {
        if (err) res.send(err);
        else {
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
  },

};

module.exports = fitbitAPI;

