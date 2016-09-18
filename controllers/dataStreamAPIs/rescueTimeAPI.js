var axios = require('axios');
var async = require('async');

var preSync = function (user, featureNameArray, streamName, startSync) {
  console.log('inside rescue time presync');

  // if user stream doesn't contain feature array doesn't exist it will init it
  var prepUserFeatureArr = function (user, featureNameArray, streamName, startSync) {
    console.log('inside prepUserFeatureArr');
    var shouldSaveUser = false;
    var currentStream = user.datastreams[streamName];

    for (featureName in featureNameArray) {
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
      res.redirect('https://www.rescuetime.com/oauth/authorize/?response_type=code&redirect_uri' +
          '=https%3A%2F%2Fwww.exzume.com%2Fauth%2Fdatastreams%2Frescuetime%2Fcallback&scope=' +
          'time_data%20category_data%20productivity_data&client_id=2900e583f575ac611f1ffd838' +
          '27ee0995f5b462f159fe42288f12e847e6b430a');
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
          value: newData[i].all_productive_hours.toString(),
        });
        neutralHours.push({
          dateTime: newData[i].date,
          value: newData[i].neutral_hours.toString(),
        });
        distractingHours.push({
          dateTime: newData[i].date,
          value: newData[i].all_distracting_hours.toString(),
        });
      }

      return [productiveHours, neutralHours, distractingHours];
    };

    async.series([
      function (nextSync) {
        console.log('inside rescuetime async series function');
        var featureNameArray = [
          'Computer Productivity (Hours)',
          'Compuer Neutral (Hours)',
          'Computer Distraction (Hours)',
        ];
        preSync(user, featureNameArray, 'rescuetime', function (err) {
          console.log('inside rescuetime startSync');
          if (err) {
            nextSync(err, null);
          } else {
            console.log('about to axios call');
            console.log(user.datastreams.rescuetime);
            axios.get('https://www.rescuetime.com/api/oauth/daily_summary_feed', {
              params: {
                access_token: user.datastreams.rescuetime.accessToken,
                format: 'json',
              },
            }).then(function (streamRes) {
              console.log('made it to axios rescuetime axios then call');
              var processedDataArray = processData(streamRes.data);
              var featureNameArray = [
                'Computer Productivity (Hours)',
                'Compuer Neutral (Hours)',
                'Computer Distraction (Hours)',
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

