var util = require('./util');
var axios = require('axios');
var async = require('async');

// checks to see if user needs added to feature and if user feature array is initialized
// returns date that sync should start from or 'max' if first time syncing
var preSync = function (user, featureName, streamName, startSync) {
  // if userFeature array doesn't it exist it will init it and return max,
  // else it returns the date to sync from
  var prepUserFeatureArr = function (user, featureName, streamName, startSync) {
    var currentStream = user.datastreams[streamName];

    // check if user already has initialized userFeature
    var featureExists = false;
    var timeSeries;
    for (var i = 0; i < currentStream.features.length; i++) {
      if (currentStream.features[i].name == featureName) {
        featureExists = true;
        timeSeries = currentStream.features[i].data;
      }
    }

    if (featureExists) {
      // returns start date for API's to sync from
      if (timeSeries.length === 0) {
        startSync(null, '1m');
        return;
      }

      // find the latest non-blank entry
      var revTimeSeries = timeSeries.slice(0).reverse();
      for (var i = 0; i < timeSeries.length; i++) {
        var dateTime = revTimeSeries[i].dateTime;
        var value = revTimeSeries[i].value;
        if (value != '0') {
          startSync(null, dateTime);
          return;
        }
      };

      // handles case of all blank flags (all '0's)
      startSync(null, timeSeries[0].dateTime);
    } else {
      currentStream.features.push({ name: featureName });
      user.save(function (err, user) {
        if (err) {
          startSync(err, null);
        } else if (user) {
          startSync(null, '1m');
        }
      });
    }
  };

  prepUserFeatureArr(user, featureName, streamName, startSync);
};

var fitbitAPI = {
  connect: function (passport) {
    return passport.authenticate('fitbit', {
      scope: [
        'activity', 'heartrate', 'location', 'nutrition',
        'profile', 'settings', 'sleep', 'social', 'weight',
      ],
    });
  },

  sync: function (user, endSync) {
    // startSync helper function:
    // a user can have a bunch of leading zeros in data if they made a fitbit account before
    // getting a tracking device, this removes those zeros
    var processStepsData = function (newData, isFirstInit) {
      if (isFirstInit) {
        var i = 0;
        var shouldContinue = true;
        while (shouldContinue && i < newData.length) {
          if (newData[i].value !== '0') {
            shouldContinue = false;
          } else {
            i++;
          }
        }

        return newData.slice(i);
      } else {
        return newData;
      }
    };

    // START HERE***************8========D
    var processHeartRateData = function () {};

    async.series({
      // preSync calls back to startSync
      steps: function (nextSync) {
        preSync(user, 'Steps', 'fitbit', function (err, startDate) {
            if (err) {
              nextSync(err, null);
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
                console.log(streamRes);
                var newData = processStepsData(streamRes.data['activities-steps'], isFirstSync);
                util.addDataToUser(user, 'Steps', 'fitbit', newData, nextSync);
              }).catch(function (err) {
                if (err.status == 401) {
                  console.log('access token expired, redirecting to OAuth...');
                  nextSync('redirect', null);
                } else {
                  nextSync(err.data.errors, null);
                }
              });
            }
          }
        );
      },

      heartRate: function (nextSync) {
        preSync(user, 'Heart Rate', 'fitbit', function (err, startDate) {
            if (err) {
              nextSync(err, null);
            } else if (startDate) {
              var baseUrl = 'https://api.fitbit.com/1/user/-/activities/heart/date/';
              var isFirstSync = false;
              if (startDate === '1m') {
                url = baseUrl + 'today' + '/1m.json';
                isFirstSync = true;
              } else {
                url = baseUrl + startDate + '/today.json';
              }

              console.log(url);
              axios({
                method: 'GET',
                url: url,
                headers: { Authorization: 'Bearer ' + user.datastreams.fitbit.accessToken },
              }).then(function (streamRes) {
                console.log(streamRes);
                var newData = processHeartRateData(streamRes.data['activities-heart'], isFirstSync);
                util.addDataToUser(user, 'Heart Rate', 'fitbit', newData, nextSync);
              }).catch(function (err) {
                if (err.status == 401) {
                  console.log('access token expired, redirecting to OAuth...');
                  nextSync('redirect', null);
                } else {
                  console.log('1 axios error')
                  nextSync(err.data.errors, null);
                }
              });
            }
          }
        );
      },

    }, function (err, results) {
      if (err === 'redirect') {
        console.log('redirect')
        endSync(null, null, true);
      } else if (err) {
        console.log('2 axios error')
        endSync(err, null, null);
      } else {
        // second argument is last results.lastSeriesCallName is the user object
        console.log(results);
        endSync(null, results.heartRate, null);
      }
    });
  },

};

module.exports = fitbitAPI;
