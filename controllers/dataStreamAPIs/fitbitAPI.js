var util = require('./util');
var axios = require('axios');
var fitbitHelper = require('./fitbitHelper');

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

  sync: function (user, done) {
    var initSyncDone = function (error, startDate) {
      if (error) {
        done(error, null, null);
      } else if (startDate) {
        var baseUrl = 'https://api.fitbit.com/1/user/-/activities/steps/date/';
        var isFirstSync = false;
        if (startDate === 'max') {
          url = baseUrl + 'today' + '/max.json';
          isFirstSync = true;
        } else {
          url = baseUrl + startDate + '/today.json';
        }

        axios({
          method: 'GET',
          url: url,
          headers: { Authorization: 'Bearer ' + user.datastreams.fitbit.accessToken },
        }).then(function (streamRes) {
          var newData = fitbitHelper.processData(streamRes.data['activities-steps'], isFirstSync);
          util.addDataToUser(user, 'Steps', 'fitbit', newData, done);
        }).catch(function (error) {
          if (error.status == 401) {
            console.log('access token expired, redirecting to OAuth...');
            done(null, null, true);
          } else {
            done(error.data.errors, null, null);
          }
        });
      }
    };

    util.initSync(user, 'Steps', 'fitbit', initSyncDone);
  },

};

module.exports = fitbitAPI;

