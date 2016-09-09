var util = require('./util');
var axios = require('axios');
var async = require('async');

// checks to see if user needs added to feature and if user feature array is initialized
// returns date that sync should start from or '1m' if first time syncing
var preSync = function (user, featureName, streamName, startSync) {
  // if userFeature array doesn't it exist it will init it and return 1m,
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
      } else {
        startSync(null, timeSeries[timeSeries.length - 1].dateTime);
      }
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
    // startSync helper functions:
    var processActivityData = function (newData) {
      var processedData = [];
      for (var i = 0; i < newData.length; i++) {
        if (newData[i].value != '0') {
          processedData.push({
            dateTime: newData[i].dateTime,
            value: newData[i].value,
          });
        }
      }

      return processedData;
    };

    var processHeartRateData = function (heartRateArray) {
      var processedData = [];
      for (var i = 0; i < heartRateArray.length; i++) {
        if (heartRateArray[i].value.restingHeartRate != undefined) {
          processedData.push({
            dateTime: heartRateArray[i].dateTime,
            value: heartRateArray[i].value.restingHeartRate,
          });
        }
      }

      return processedData;
    };

    var resources = [
      {
        featureName: 'Steps',
        baseUrl: 'https://api.fitbit.com/1/user/-/activities/steps/date/',
        featureRef: 'activities-steps',
        processDataFunc: processActivityData,
      },
      {
        featureName: 'Heart Rate',
        baseUrl: 'https://api.fitbit.com/1/user/-/activities/heart/date/',
        featureRef: 'activities-heart',
        processDataFunc: processHeartRateData,
      },
      {
        featureName: 'Floors',
        baseUrl: 'https://api.fitbit.com/1/user/-/activities/floors/date/',
        featureRef: 'activities-floors',
        processDataFunc: processActivityData,
      },
    ];

    var series = resources.map(function (resource) {
      return (
        function (nextSync) {
          // preSync calls startSync as callback
          preSync(user, resource.featureName, 'fitbit', function (err, startDate) {
            if (err) {
              nextSync(err, null);
            } else if (startDate) {
              var baseUrl = resource.baseUrl;
              if (startDate === '1m') {
                url = baseUrl + 'today' + '/1m.json';
              } else {
                url = baseUrl + startDate + '/today.json';
              }

              axios({
                method: 'GET',
                url: url,
                headers: { Authorization: 'Bearer ' + user.datastreams.fitbit.accessToken },
              }).then(function (streamRes) {
                var processedData = resource.processDataFunc(streamRes.data[resource.featureRef]);
                util.addDataToUser(
                  user, resource.featureName, 'fitbit', processedData, nextSync
                );
              }).catch(function (err) {
                if (err.status == 401) {
                  nextSync('redirect', null);
                } else {
                  nextSync(err.data.errors, null);
                }
              });
            }
          });
        }
      );
    });

    async.series(series, function (err, results) {
      if (err === 'redirect') {
        endSync(null, null, true);
      } else if (err) {
        endSync(err, null, null);
      } else {
        // second argument is last results.lastSeriesCallName is the user object
        endSync(null, results[results.length - 1], null);
      }
    });
  },

};

module.exports = fitbitAPI;

