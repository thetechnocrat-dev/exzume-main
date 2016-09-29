var util = require('./util');
var axios = require('axios');
var async = require('async');
var config = require('../../config/config');

var preSync = function (user, featureNameArray, streamName, startSync) {
  console.log('inside rescue time presync');

  // if user stream doesn't contain feature array doesn't exist it will init it
  var prepUserFeatureArr = function (user, featureNameArray, streamName, startSync) {
    console.log('inside prepUserFeatureArr');
    var shouldSaveUser = false;
    var currentStream = user.datastreams[streamName];

    for (idx in featureNameArray) {
      var featureName = featureNameArray[idx];

      // check if user already has initialized userFeature
      var featureExists = false;
      for (var i = 0; i < currentStream.features.length; i++) {
        if (currentStream.features[i].name == featureName) {
          featureExists = true;
        }
      }

      if (!featureExists) {
        currentStream.features.push({ name: featureName });
        shouldSaveUser = true;
      }
    }

    if (shouldSaveUser) {
      startSync(null);
    } else {
      user.save(function (err, user) {
        if (err) {
          startSync(err);
        } else if (user) {
          startSync(null);
        }
      });
    }
  };

  prepUserFeatureArr(user, featureNameArray, streamName, startSync);
};

var rescueTimeAPI = {
  connect: function () {
    return function (req, res, next) {
      console.log('rescue time redirect');
      res.redirect('https://www.rescuetime.com/oauth/authorize/?response_type=code&' +
          'redirect_uri=' + encodeURIComponent(config.rescueTime.callbackURL) +
          '&scope=time_data%20category_data%20productivity_data&' +
          'client_id=' + config.rescueTime.clientID);
    };
  },

  sync: function (user, endSync) {
    console.log('in rescue time sync');
    var processData = function (newData) {
      var productiveHours = [];
      var neutralHours = [];
      var distractingHours = [];

      // data is pulled reverse chronologically, so start from end of array and sync backwards
      for (var i = newData.length - 1; i > 0; i--) {
        productiveHours.push({
          dateTime: newData[i].date,
          value: newData[i].all_productive_hours,
        });
        neutralHours.push({
          dateTime: newData[i].date,
          value: newData[i].neutral_hours,
        });
        distractingHours.push({
          dateTime: newData[i].date,
          value: newData[i].all_distracting_hours,
        });
      }

      return [productiveHours, neutralHours, distractingHours];
    };

    async.series([
      function (nextSync) {
        console.log('inside rescuetime async series function');
        var featureNameArray = [
          'Computer Productivity (Hours)',
          'Computer Neutral (Hours)',
          'Computer Distractivity (Hours)',
        ];
        preSync(user, featureNameArray, 'rescuetime', function (err) {
          console.log('inside rescuetime startSync');
          if (err) {
            nextSync(err, null);
          } else {
            console.log('about to axios call');
            console.log(user.datastreams.rescuetime);
            axios.get('https://www.rescuetime.com/api/oauth/productivity_data', {
              params: {
                access_token: user.datastreams.rescuetime.accessToken,
                format: 'json',
                resolution_time: 'day',
              },
            }).then(function (streamRes) {
              console.log('made it to axios rescuetime axios then call');
              console.log(streamRes.data);
              var processedDataArray = processData(streamRes.data);
              var featureNameArray = [
                'Computer Productivity (Hours)',
                'Computer Neutral (Hours)',
                'Computer Distractivity (Hours)',
              ];
              util.addMuchDataToUser(
                user, featureNameArray, 'rescuetime', processedDataArray, nextSync
              );
            }).catch(function (err) {
              console.log('axios error');
              if (err) {
                nextSync(err, null);
              }
            });
          }
        });
      },
      ], function (err, results) {
        console.log('async callback');
        console.log(results[0].toString());
        if (err) {
          endSync(err, null, null);
        } else {
          endSync(null, results[results.length - 1], null);
        }
      });
  },

};

module.exports = rescueTimeAPI;
